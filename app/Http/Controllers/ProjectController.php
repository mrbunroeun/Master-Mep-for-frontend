<?php
namespace App\Http\Controllers;

use App\Models\Hero;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $hero = Hero::where('is_active', true)->latest()->first();

        return Inertia::render('Projects', [
            'heroImage' => $hero?->image ? '/storage/' . $hero->image : null,
            'projects'  => Project::where('is_active', true)
                ->orderBy('order')
                ->get()
                ->map(fn($p) => [
                    'id'        => $p->id,
                    'title'     => $p->title,
                    'category'  => $p->category,
                    'description' => $p->description,
                    'image'     => $p->image ? '/storage/' . $p->image : null,
                    'location'  => $p->location,
                    'timeline'  => $p->timeline ?? null,
                    'video_url' => $p->video_url,
                    'scope'     => $p->scope ?: $p->description,
                ]),
        ]);
    }
}