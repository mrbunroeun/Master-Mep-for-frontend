<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Project;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function show(string $type)
    {
        $allowed = ['mechanical', 'electrical', 'plumbing'];

        if (!in_array($type, $allowed)) {
            abort(404);
        }

        $service = Service::where('type', $type)->where('is_active', true)->first();

        // Try to find projects matching this service's category first
        $projects = Project::where('is_active', true)
            ->where('category', 'like', '%' . ucfirst($type) . '%')
            ->latest()
            ->take(3)
            ->get();

      
        if ($projects->isEmpty()) {
            $projects = Project::where('is_active', true)
                ->latest()
                ->take(3)
                ->get();
        }

        $pageMap = [
            'mechanical' => 'Services/Mechanical',
            'electrical' => 'Services/Electrical',
            'plumbing'   => 'Services/Plumbing',
        ];

        return Inertia::render($pageMap[$type], [
            'service'      => $service,
            'serviceItems' => $service?->items ?? [],
            'projects'     => $projects,
            'heroImage'    => '/images/hero.jpg',
        ]);
    }
}