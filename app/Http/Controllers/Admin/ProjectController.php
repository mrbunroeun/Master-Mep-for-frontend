<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * GET /admin/project
     * List all projects for the admin panel.
     */
    public function index()
    {
        $projects = Project::orderBy('order')->orderByDesc('created_at')->get();

        return Inertia::render('Admin/Project/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * GET /admin/project/create
     * Show the form to add a new project.
     */
    public function create()
    {
        return Inertia::render('Admin/Project/Create');
    }

    /**
     * POST /admin/project
     * Save a new project.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string',
            'description' => 'nullable|string',
            'scope'       => 'nullable|string',
            'location'    => 'nullable|string',
            'timeline'    => 'nullable|string',
            'order'       => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
            'image'       => 'nullable|image|max:5120',
            'gallery.*'   => 'nullable', // file OR the literal string "REMOVE"
        ]);

        $project = new Project($validated);

        if ($request->hasFile('image')) {
            $project->image = $request->file('image')->store('projects', 'public');
        }

        $project->gallery = $this->resolveGallery($request, []);
        $project->save();

        return redirect()->route('admin.project.index')->with('success', 'Project created.');
    }

    /**
     * GET /admin/project/{project}/edit
     * Show the form to edit an existing project.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Admin/Project/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * PUT /admin/project/{project}
     * Update an existing project.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string',
            'description' => 'nullable|string',
            'scope'       => 'nullable|string',
            'location'    => 'nullable|string',
            'timeline'    => 'nullable|string',
            'order'       => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
            'image'       => 'nullable|image|max:5120',
            'gallery.*'   => 'nullable',
        ]);

        $project->fill($validated);

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $project->image = $request->file('image')->store('projects', 'public');
        }

        $project->gallery = $this->resolveGallery($request, $project->gallery ?? []);
        $project->save();

        return redirect()->route('admin.project.index')->with('success', 'Project updated.');
    }

    /**
     * DELETE /admin/project/{project}
     * Remove a project and its files.
     */
    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        foreach (($project->gallery ?? []) as $path) {
            if ($path) {
                Storage::disk('public')->delete($path);
            }
        }

        $project->delete();

        return redirect()->route('admin.project.index')->with('success', 'Project deleted.');
    }

    /**
     * Merge incoming gallery[0..4] input (files, "REMOVE", or unchanged
     * existing path strings) with what's already stored, uploading new
     * files with a unique auto-generated name so browsers never cache
     * a stale image at the same URL.
     */
    private function resolveGallery(Request $request, array $existing): array
    {
        $gallery = array_pad($existing, 5, null);

        foreach (range(0, 4) as $i) {
            $file = $request->file("gallery.$i");
            $value = $request->input("gallery.$i");

            if ($file) {
                if (!empty($gallery[$i])) {
                    Storage::disk('public')->delete($gallery[$i]);
                }
                // store() auto-generates a unique filename — never storeAs()
                // with a fixed name, or every project's slot 0 would share
                // one URL and browsers would cache the first image forever.
                $gallery[$i] = $file->store('projects/gallery', 'public');
            } elseif ($value === 'REMOVE') {
                if (!empty($gallery[$i])) {
                    Storage::disk('public')->delete($gallery[$i]);
                }
                $gallery[$i] = null;
            }
            // else: no file and not "REMOVE" -> leave slot untouched
        }

        return $gallery;
    }
}