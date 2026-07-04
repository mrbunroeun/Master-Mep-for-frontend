<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WhyChooseUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WhyChooseUsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/WhyChooseUs/Index', [
            'items' => WhyChooseUs::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/WhyChooseUs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048',
            'main_description' => 'nullable|string|max:255',
            'section_label' => 'nullable|string|max:255',
            'section_title' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'sometimes|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');
        $validated['order'] = $validated['order'] ?? 0;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('why-choose-us', 'public');
        }

        WhyChooseUs::create($validated);

        return redirect()->route('admin.why-choose-us.index')->with('success', 'Item created successfully.');
    }

    public function edit(WhyChooseUs $whyChooseUs)
    {
        return Inertia::render('Admin/WhyChooseUs/Edit', [
            'item' => $whyChooseUs,
        ]);
    }

    public function update(Request $request, WhyChooseUs $whyChooseUs)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048',
            'main_description' => 'nullable|string|max:255',
            'section_label' => 'nullable|string|max:255',
            'section_title' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'sometimes|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');
        $validated['order'] = $validated['order'] ?? 0;

        if ($request->hasFile('image')) {
            if ($whyChooseUs->image) {
                Storage::disk('public')->delete($whyChooseUs->image);
            }
            $validated['image'] = $request->file('image')->store('why-choose-us', 'public');
        }

        $whyChooseUs->update($validated);

        return redirect()->route('admin.why-choose-us.index')->with('success', 'Item updated successfully.');
    }

    public function destroy(WhyChooseUs $whyChooseUs)
    {
        if ($whyChooseUs->image) {
            Storage::disk('public')->delete($whyChooseUs->image);
        }

        $whyChooseUs->delete();

        return redirect()->route('admin.why-choose-us.index')->with('success', 'Item deleted successfully.');
    }
}