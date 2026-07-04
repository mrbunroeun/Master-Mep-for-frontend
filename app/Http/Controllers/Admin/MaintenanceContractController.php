<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceContract;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceContractController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/contract/index', [
            'items' => MaintenanceContract::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/contract/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'subtitle'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'points'      => 'nullable|string',
            'image'       => 'nullable|image|max:4096',
        ]);

        $data['is_active'] = true;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-contracts', 'public');
        }

        MaintenanceContract::create($data);

        return redirect('/admin/maintenance-contracts')
            ->with('success', 'Created successfully');
    }

    public function edit(MaintenanceContract $maintenanceContract)
    {
        return Inertia::render('Admin/contract/Edit', [
            'item' => $maintenanceContract,
        ]);
    }

    public function update(Request $request, MaintenanceContract $maintenanceContract)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'subtitle'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'points'      => 'nullable|string',
            'image'       => 'nullable|image|max:4096',
        ]);

        $data['is_active'] = true;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('maintenance-contracts', 'public');
        }

        $maintenanceContract->update($data);

        return redirect('/admin/maintenance-contracts')
            ->with('success', 'Updated successfully');
    }

    public function destroy(MaintenanceContract $maintenanceContract)
    {
        $maintenanceContract->delete();

        return redirect('/admin/maintenance-contracts')
            ->with('success', 'Deleted successfully');
    }
}