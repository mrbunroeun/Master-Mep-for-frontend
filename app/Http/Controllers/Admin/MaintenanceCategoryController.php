<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MaintenanceCategory/Index', [
            'items' => MaintenanceCategory::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MaintenanceCategory/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:255',
            'image'      => 'nullable|image',
            'points'     => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-categories', 'public');
        }

        MaintenanceCategory::create($data);

        return redirect('/admin/maintenance-categories')
            ->with('success', 'Created successfully');
    }

    public function edit(MaintenanceCategory $maintenanceCategory)
    {
        return Inertia::render('Admin/MaintenanceCategory/Edit', [
            'item' => $maintenanceCategory,
        ]);
    }

    public function update(Request $request, MaintenanceCategory $maintenanceCategory)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:255',
            'image'      => 'nullable|image',
            'points'     => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-categories', 'public');
        }

        $maintenanceCategory->update($data);

        return redirect('/admin/maintenance-categories')
            ->with('success', 'Updated successfully');
    }

    public function destroy(MaintenanceCategory $maintenanceCategory)
    {
        $maintenanceCategory->delete();

        return redirect('/admin/maintenance-categories')
            ->with('success', 'Deleted successfully');
    }
}