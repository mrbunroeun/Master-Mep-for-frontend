<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/About/Index', [
            'abouts' => About::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/About/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'video'       => 'nullable|mimes:mp4,mov,avi|max:51200',
        'is_active'   => 'boolean',
    ]);

    // Default to active unless explicitly turned off by the admin
    $validated['is_active'] = $request->boolean('is_active', true);

    if ($request->hasFile('video')) {
        $validated['video'] = $request->file('video')->store('about/videos', 'public');
    }
     About::create($validated);
    return redirect()->route('admin.about.index')->with('success', 'About created.');
}
    public function edit(About $about)
    {
        return Inertia::render('Admin/About/Edit', ['about' => $about]);
    }

    public function update(Request $request, About $about)
{
    $validated = $request->validate([
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'video'       => 'nullable|mimes:mp4,mov,avi|max:51200',
        'is_active'   => 'boolean',
    ]);

    // Default to active unless explicitly turned off by the admin
    $validated['is_active'] = $request->boolean('is_active', true);

    if ($request->hasFile('video')) {
        if ($about->video) Storage::disk('public')->delete($about->video);
        $validated['video'] = $request->file('video')->store('about/videos', 'public');
    } else {
        unset($validated['video']);
    }
    $about->update($validated);
    return redirect()->route('admin.about.index')->with('success', 'About updated.');
   }
}