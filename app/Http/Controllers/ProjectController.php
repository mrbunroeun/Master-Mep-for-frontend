<?php
namespace App\Http\Controllers;

use App\Models\CategoryGallery;
use App\Models\Hero;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $hero = Hero::where('is_active', true)->latest()->first();

        $categoryGalleries = CategoryGallery::all()
            ->mapWithKeys(fn ($g) => [
                $g->category => collect($g->images ?? [])
                    ->map(fn ($path) => $path ? '/storage/' . $path : null)
                    ->filter()
                    ->values()
                    ->toArray(),
            ])
            ->toArray();

        return Inertia::render('Projects', [
            'heroImage' => $hero?->image ? '/storage/' . $hero->image : null,
            'projects'  => Project::where('is_active', true)
                ->orderBy('order')
                ->get()
                ->map(fn($p) => [
                    'id'          => $p->id,
                    'title'       => $p->title,
                    'category'    => $p->category,
                    'description' => $p->description,
                    'image'       => $p->image ? '/storage/' . $p->image : null,
                    'location'    => $p->location,
                    'timeline'    => $p->timeline ?? null,
                    'scope'       => $p->scope ?: $p->description,
                ]),
            'categoryGalleries' => $categoryGalleries,
        ]);
    }
}