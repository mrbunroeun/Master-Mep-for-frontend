<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InsightController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController as PublicProjectController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\InsightController as AdminInsightController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\KeyHighlightController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\CategoryGalleryController;
use App\Http\Controllers\ServiceController as PublicServiceController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\CertificationController;


use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Hero;
use App\Models\About;
use App\Models\Project;
use App\Models\Partner;
use App\Models\Faq;
use App\Models\KeyHighlight;
use App\Models\CtaBanner;
use App\Models\Service;
use App\Models\Activity;
use App\Models\TeamMember;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Certification;

/*
|--------------------------------------------------------------------------
| Public Routes — MEP Website
|--------------------------------------------------------------------------
*/

function heroImageFor(string $pagePath): ?string
{
    $image = Hero::where('is_active', true)
        ->where('link_url', $pagePath)
        ->latest()
        ->first()?->image;

    if (! $image) {
        $image = Hero::where('is_active', true)
            ->orderBy('order')
            ->first()?->image;
    }

    return $image ? '/storage/' . $image : null;
}

Route::get('/', function () {
    return Inertia::render('Home', [
        'heroes'        => Hero::where('is_active', true)->orderBy('order')->get(),
        'projects'      => Project::where('is_active', true)->latest()->take(6)->get(),
        'partners'      => Partner::where('is_active', true)->orderBy('order')->get(),
        'faqs'          => Faq::where('is_active', true)->orderBy('order')->get(),
        'keyHighlights' => KeyHighlight::where('is_active', true)->orderBy('order')->get(),
        'ctaBanner'     => CtaBanner::where('is_active', true)->latest()->first(),
        'services'      => Service::where('is_active', true)->get(),
        'heroImage'     => heroImageFor('/'),
    ]);
})->name('home');

Route::get('/about', function () {
    $hero  = Hero::where('is_active', true)->where('link_url', '/about')->latest()->first()
        ?? Hero::where('is_active', true)->where('link_url', '/')->latest()->first();
    $about = About::where('is_active', true)->latest()->first();
    return Inertia::render('About', [
        'hero'            => $hero,
        'about'           => $about,
        'aboutVideo'      => $about?->video ? '/storage/' . $about->video : null,
        'members'         => TeamMember::where('is_active', true)->orderBy('order')->get()
            ->map(fn ($m) => [
                'id'       => $m->id,
                'name'     => $m->name,
                'position' => $m->position,
                'image'    => $m->image,
            ]),
        'certifications'  => Certification::where('is_active', true)->orderBy('order')->get()
            ->map(fn ($c) => [
                'id'    => $c->id,
                'title' => $c->title,
                'image' => "/storage/{$c->image}",
            ]),
    ]);
})->name('about');

Route::get('/projects', [PublicProjectController::class, 'index'])->name('projects');

Route::get('/services/{type}', [PublicServiceController::class, 'show'])->name('services.show');

Route::get('/latestactivities', function () {
    return Inertia::render('LatestActivities', [
        'heroImage'  => heroImageFor('/latestactivities'),
        'activities' => Activity::where('is_active', true)
            ->orderByDesc('activity_date')
            ->get()
            ->map(fn ($a) => [
                'id'       => $a->id,
                'category' => $a->category,
                'date'     => $a->activity_date->format('F Y'),
                'title'    => $a->title,
                'excerpt'  => $a->excerpt,
                'image'    => $a->image ? "/storage/{$a->image}" : null,
            ]),
    ]);
})->name('latestactivities');

Route::get('/insights',        [InsightController::class, 'index'])->name('insights');
Route::get('/insights/{slug}', [InsightController::class, 'show'])->name('insights.show');

Route::get('/contact', function () {
    return Inertia::render('Contact', [
        'heroImage' => heroImageFor('/contact'),
    ]);
})->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/generate-sitemap', function () {
    $sitemap = Sitemap::create()
        ->add(Url::create('/')->setPriority(1.0))
        ->add(Url::create('/about')->setPriority(0.8))
        ->add(Url::create('/services/mechanical')->setPriority(0.9))
        ->add(Url::create('/services/electrical')->setPriority(0.9))
        ->add(Url::create('/services/plumbing')->setPriority(0.9))
        ->add(Url::create('/services/maintenance')->setPriority(0.7))
        ->add(Url::create('/services/solasystem')->setPriority(0.7))
        ->add(Url::create('/projects')->setPriority(0.7))
        ->add(Url::create('/insights')->setPriority(0.6))
        ->add(Url::create('/contact')->setPriority(0.8));

    foreach (\App\Models\Insight::all() as $insight) {
        $sitemap->add(Url::create("/insights/{$insight->slug}")->setPriority(0.5));
    }

    $sitemap->writeToFile(public_path('sitemap.xml'));

    return 'Sitemap generated successfully! View it at /sitemap.xml';
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'isAdmin' => in_array(Auth::user()->role, ['admin', 'super_admin']),
        'auth'    => ['user' => Auth::user()],
        'counts'  => [
            'heroes'          => Hero::count(),
            'abouts'          => About::count(),
            'projects'        => Project::count(),
            'partners'        => Partner::count(),
            'faqs'            => Faq::count(),
            'keyHighlights'   => KeyHighlight::count(),
            'insights'        => \App\Models\Insight::count(),
            'activities'      => Activity::count(),
            'teamMembers'     => TeamMember::count(),
            'certifications'  => Certification::count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile',    [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',  [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('hero', HeroController::class);

    Route::get('cta-banner',                   [HeroController::class, 'ctaIndex'])->name('cta-banner.index');
    Route::get('cta-banner/{ctaBanner}/edit',   [HeroController::class, 'ctaEdit'])->name('cta-banner.edit');
    Route::put('cta-banner/{ctaBanner}',        [HeroController::class, 'ctaUpdate'])->name('cta-banner.update');
    Route::delete('cta-banner/{ctaBanner}',     [HeroController::class, 'ctaDestroy'])->name('cta-banner.destroy');

    Route::resource('about',         AboutController::class);
    Route::resource('service',       ServiceController::class);
    Route::resource('project',       ProjectController::class);
    Route::resource('partner',       PartnerController::class);
    Route::resource('faq',           FaqController::class);
    Route::resource('key-highlight', KeyHighlightController::class);
    Route::resource('activity',      ActivityController::class);
    Route::resource('team-member',   TeamMemberController::class);
    Route::resource('certification', CertificationController::class);

    Route::get('category-gallery', [CategoryGalleryController::class, 'index'])
        ->name('category-gallery.index');

    Route::put('category-gallery/{category}', [CategoryGalleryController::class, 'update'])
        ->name('category-gallery.update')
        ->where('category', '.*');

    Route::resource('insights',      AdminInsightController::class);
    Route::resource('key-highlight', KeyHighlightController::class)->names('admin.key-highlight');
});

require __DIR__.'/auth.php';