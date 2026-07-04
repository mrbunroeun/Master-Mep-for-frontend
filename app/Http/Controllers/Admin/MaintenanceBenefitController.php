<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceBenefit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceBenefitController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/benefit/index', [
            'items' => MaintenanceBenefit::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/benefit/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'  => 'required|string|max:255',
            'image'  => 'nullable|image',
            'points' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-benefits', 'public');
        }

        MaintenanceBenefit::create($data);

        return redirect('/admin/maintenance-benefits')
            ->with('success', 'Created successfully');
    }

    public function edit(MaintenanceBenefit $maintenanceBenefit)
    {
        return Inertia::render('Admin/benefit/Edit', [
            'item' => $maintenanceBenefit,
        ]);
    }

    public function update(Request $request, MaintenanceBenefit $maintenanceBenefit)
    {
        $data = $request->validate([
            'title'  => 'required|string|max:255',
            'image'  => 'nullable|image',
            'points' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-benefits', 'public');
        }

        $maintenanceBenefit->update($data);

        return redirect('/admin/maintenance-benefits')
            ->with('success', 'Updated successfully');
    }

    public function destroy(MaintenanceBenefit $maintenanceBenefit)
    {
        $maintenanceBenefit->delete();

        return redirect('/admin/maintenance-benefits')
            ->with('success', 'Deleted successfully');
    }
}