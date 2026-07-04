<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceFeature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceFeatureController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MaintenanceFeature/Index', [
            'items' => MaintenanceFeature::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MaintenanceFeature/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image',
            'scope' => 'nullable|string',
            'location' => 'nullable|string',
            'timeline' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance', 'public');
        }

        MaintenanceFeature::create($data);

        return redirect()->route('admin.maintenance.index')
            ->with('success', 'Created successfully');
    }

    public function edit(MaintenanceFeature $maintenance)
    {
        return Inertia::render('Admin/MaintenanceFeature/Edit', [
            'item' => $maintenance
        ]);
    }

    public function update(Request $request, MaintenanceFeature $maintenance)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image',
            'scope' => 'nullable|string',
            'location' => 'nullable|string',
            'timeline' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance', 'public');
        }

        $maintenance->update($data);

        return redirect()->route('admin.maintenance.index')
            ->with('success', 'Updated successfully');
    }

    public function destroy(MaintenanceFeature $maintenance)
    {
        $maintenance->delete();

        return back()->with('success', 'Deleted');
    }
}
