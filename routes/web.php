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
use App\Http\Controllers\Admin\WhyChooseUsController;
use App\Http\Controllers\Admin\MaintenanceCategoryController;
use App\Http\Controllers\Admin\MaintenanceBenefitController;
use App\Http\Controllers\Admin\MaintenanceContractController;
use App\Http\Controllers\Admin\MaintenanceFeatureController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use Inertia\Inertia;
use App\Models\Hero;
use App\Models\About;
use App\Models\Project;
use App\Models\Partner;
use App\Models\Faq;
use App\Models\KeyHighlight;
use App\Models\CtaBanner;
use App\Models\WhyChooseUs;
use App\Models\Service;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

/*
|--------------------------------------------------------------------------
| Public Routes — MEP Website
|--------------------------------------------------------------------------
*/

function heroImageFor(string $pagePath): ?string
{
    // link_url now identifies which page a hero is assigned to (not a link).
    $image = Hero::where('is_active', true)
        ->where('link_url', $pagePath)
        ->latest()
        ->first()?->image;

    if (! $image) {
        // No hero explicitly tagged for this page — fall back to the first active hero.
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
        'heroImage'     => heroImageFor('/'),
        'whyChooseUs'   => WhyChooseUs::where('is_active', true)->orderBy('order')->get(),
        'services'      => Service::where('is_active', true)->get(),
    ]);
})->name('home');

Route::get('/about', function () {
    $hero  = Hero::where('is_active', true)->where('link_url', '/about')->latest()->first()
        ?? Hero::where('is_active', true)->where('link_url', '/')->latest()->first();
    $about = About::where('is_active', true)->latest()->first();
    return Inertia::render('About', [
        'hero'       => $hero,
        'about'      => $about,
        'aboutVideo' => $about?->video ? '/storage/' . $about->video : null,
    ]);
})->name('about');


Route::get('/projects', [PublicProjectController::class, 'index'])->name('projects');

Route::get('/services/maintenance', function () {
    $maintenanceCategories = \App\Models\MaintenanceCategory::where('is_active', true)
        ->orderBy('sort_order')
        ->orderBy('id')
        ->get();

    $maintenanceBenefit = \App\Models\MaintenanceBenefit::where('is_active', true)
        ->latest()
        ->first();

    $maintenanceContract = \App\Models\MaintenanceContract::where('is_active', true)
        ->latest()
        ->first();

    return Inertia::render('Services/Maintenance', [
        'maintenanceFeatures'   => \App\Models\MaintenanceFeature::where('is_active', true)->latest()->get(),
        'heroImage'             => heroImageFor('/services/maintenance'),
        'maintenanceCategories' => $maintenanceCategories,
        'maintenanceBenefit'    => $maintenanceBenefit,
        'maintenanceContract'   => $maintenanceContract,
    ]);
})->name('maintenance');

Route::get('/services/solasystem', function () {
    return Inertia::render('Services/SolaSystem', [
        'service'       => null,
        'serviceItems'  => [],
        'projects'      => [],
        'heroImage'     => null,
        'keyHighlights' => [],
    ]);
})->name('solasystem');

Route::get('/services/{type}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/latestactivities', function () {
    return Inertia::render('LatestActivities', [
        'heroImage' => heroImageFor('/latestactivities'),
    ]);
})->name('latestactivities');

Route::get('/insights',        [InsightController::class, 'index'])->name('insights');
Route::get('/insights/{slug}', [InsightController::class, 'show'])->name('insights.show');

// Contact
Route::get('/contact', function () {
    return Inertia::render('Contact', [
        'heroImage' => heroImageFor('/contact'),
    ]);
})->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// SEO — Sitemap generator. Visit /generate-sitemap once after deploying to
// your real domain, then remove this route (or restrict it to admin-only).
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
        'isAdmin' => Auth::user()->role === 'admin',
        'auth'    => ['user' => Auth::user()],
        'counts'  => [
            'heroes'                => \App\Models\Hero::count(),
            'abouts'                => \App\Models\About::count(),
            'projects'              => \App\Models\Project::count(),
            'partners'              => \App\Models\Partner::count(),
            'faqs'                  => \App\Models\Faq::count(),
            'keyHighlights'         => \App\Models\KeyHighlight::count(),
            'whyChooseUs'           => \App\Models\WhyChooseUs::count(),
            'maintenanceBenefits'   => \App\Models\MaintenanceBenefit::count(),
            'maintenanceFeatures'   => \App\Models\MaintenanceFeature::count(),
            'maintenanceCategories' => \App\Models\MaintenanceCategory::count(),
            'maintenanceContracts'  => \App\Models\MaintenanceContract::count(),
            'insights'              => \App\Models\Insight::count(),
            'services'      => Service::where('is_active', true)->orderBy('order')->get(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile',    [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',  [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('hero',          HeroController::class);

    // CTA Banner — merged into HeroController (was Admin\CtaBannerController)
    // NOTE: rename these to match whatever method names you actually used
    // in HeroController (ctaIndex/ctaEdit/ctaUpdate/ctaDestroy, etc.)
    Route::get('cta-banner',                  [HeroController::class, 'ctaIndex'])->name('cta-banner.index');
    Route::get('cta-banner/{ctaBanner}/edit',  [HeroController::class, 'ctaEdit'])->name('cta-banner.edit');
    Route::put('cta-banner/{ctaBanner}',       [HeroController::class, 'ctaUpdate'])->name('cta-banner.update');
    Route::delete('cta-banner/{ctaBanner}',    [HeroController::class, 'ctaDestroy'])->name('cta-banner.destroy');

    Route::resource('about',         AboutController::class);
    // Route::resource('service', ...); — REMOVED, rebuilding fresh
    Route::resource('project',       ProjectController::class);
    Route::resource('partner',       PartnerController::class);
    Route::resource('faq',           FaqController::class);
    Route::resource('key-highlight', KeyHighlightController::class);
    Route::resource('why-choose-us', WhyChooseUsController::class);
    Route::resource('maintenance', MaintenanceFeatureController::class);
    Route::resource('maintenance-categories', MaintenanceCategoryController::class)
    ->names('admin.maintenance-categories');
    Route::resource('maintenance-benefits', MaintenanceBenefitController::class);
    Route::resource('maintenance-contracts', MaintenanceContractController::class);
    Route::resource('insights', AdminInsightController::class);
    Route::resource('service', AdminServiceController::class);
    Route::get('/services/{type}', [ServiceController::class, 'show']);
    Route::resource('key-highlight', KeyHighlightController::class)->names('admin.key-highlight');
});

require __DIR__.'/auth.php';