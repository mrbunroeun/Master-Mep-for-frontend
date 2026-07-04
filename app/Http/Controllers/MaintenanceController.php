<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\MaintenanceFeature;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index()
    {
        $service = Service::where('type', 'maintenance')
            ->where('is_active', true)
            ->first();

        $maintenanceFeatures = MaintenanceFeature::where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Maintenance', [
            'service'             => $service,
            'maintenanceFeatures' => $maintenanceFeatures,
        ]);
    }
}