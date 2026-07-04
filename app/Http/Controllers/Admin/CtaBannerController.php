<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\CtaBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CtaBannerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/CtaBanner/Index', [
            'ctaBanners' => CtaBanner::latest()->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/CtaBanner/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
            'is_active'   => 'boolean',
        ]);
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('cta', 'public');
        }
        CtaBanner::create($validated);
        return redirect()->route('admin.cta-banner.index')->with('success', 'CTA Banner created.');
    }
    public function edit(CtaBanner $ctaBanner)
    {
        return Inertia::render('Admin/CtaBanner/Edit', ['ctaBanner' => $ctaBanner]);
    }
    public function update(Request $request, CtaBanner $ctaBanner)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
            'is_active'   => 'boolean',
        ]);
        if ($request->hasFile('image')) {
            if ($ctaBanner->image) Storage::disk('public')->delete($ctaBanner->image);
            $validated['image'] = $request->file('image')->store('cta', 'public');
        }
        $ctaBanner->update($validated);
        return redirect()->route('admin.cta-banner.index')->with('success', 'CTA Banner updated.');
    }
    public function destroy(CtaBanner $ctaBanner)
    {
        if ($ctaBanner->image) Storage::disk('public')->delete($ctaBanner->image);
        $ctaBanner->delete();
        return redirect()->route('admin.cta-banner.index')->with('success', 'CTA Banner deleted.');
    }
}