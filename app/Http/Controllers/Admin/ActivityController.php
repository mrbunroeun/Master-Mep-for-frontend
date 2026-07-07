<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Activity/Index', [
            'activities' => Activity::orderByDesc('activity_date')->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Activity/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'category'      => 'required|string|max:100',
            'activity_date' => 'required|date',
            'excerpt'       => 'nullable|string',
            'image'         => 'nullable|image|max:51200',
            'is_active'     => 'boolean',
        ]);
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('activities', 'public');
        }
        Activity::create($validated);
        return redirect()->route('admin.activity.index')->with('success', 'Activity created.');
    }
    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activity/Edit', [
            'activity' => $activity,
        ]);
    }
    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'category'      => 'required|string|max:100',
            'activity_date' => 'required|date',
            'excerpt'       => 'nullable|string',
            'image'         => 'nullable|image|max:51200',
            'is_active'     => 'boolean',
        ]);
        if ($request->hasFile('image')) {
            if ($activity->image) {
                Storage::disk('public')->delete($activity->image);
            }
            $validated['image'] = $request->file('image')->store('activities', 'public');
        }
        $activity->update($validated);
        return redirect()->route('admin.activity.index')->with('success', 'Activity updated.');
    }
    public function destroy(Activity $activity)
    {
        if ($activity->image) {
            Storage::disk('public')->delete($activity->image);
        }
        $activity->delete();
        return redirect()->route('admin.activity.index')->with('success', 'Activity deleted.');
    }
}