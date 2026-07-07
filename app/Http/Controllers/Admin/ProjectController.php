<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Project/Index', [
            'projects' => Project::latest()->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Project/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'scope'       => 'nullable|string',
            'image'       => 'nullable|image|max:51200',
            'category'    => 'required|string',
            'location'    => 'nullable|string',
            'timeline'    => 'nullable|string',
            'is_active'   => 'nullable|boolean',
        ]);
        $validated['is_active'] = $request->boolean('is_active');
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }
        Project::create($validated);
        return redirect()->route('admin.project.index')->with('success', 'Project created.');
    }
    public function edit(Project $project)
    {
        return Inertia::render('Admin/Project/Edit', ['project' => $project]);
    }
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'scope'       => 'nullable|string',
            'image'       => 'nullable|image|max:51200',
            'category'    => 'required|string',
            'location'    => 'nullable|string',
            'timeline'    => 'nullable|string',
            'is_active'   => 'nullable|boolean',
        ]);
        $validated['is_active'] = $request->boolean('is_active');
        if ($request->hasFile('image')) {
            if ($project->image) Storage::disk('public')->delete($project->image);
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }
        $project->update($validated);
        return redirect()->route('admin.project.index')->with('success', 'Project updated.');
    }
    public function destroy(Project $project)
    {
        if ($project->image) Storage::disk('public')->delete($project->image);
        $project->delete();
        return redirect()->route('admin.project.index')->with('success', 'Project deleted.');
    }
}