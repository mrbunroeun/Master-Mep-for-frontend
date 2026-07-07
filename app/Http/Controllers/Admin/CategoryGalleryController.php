<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CategoryGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryGalleryController extends Controller
{
    private const CATEGORIES = [
        'Commercial Buildings',
        'Hospitals',
        'Banks',
        'Restaurants & Cafés',
        'Luxury Villas',
        'Fitness Centers',
        'Fuel & Industrial Projects',
    ];

    /**
     * Show all categories with their current 5 image slots, for the
     * admin "Category Galleries" page.
     */
    public function index()
    {
        $galleries = CategoryGallery::all()->keyBy('category');

        $data = collect(self::CATEGORIES)->map(function ($category) use ($galleries) {
            $gallery = $galleries->get($category);
            $slots = $gallery->images ?? [];
            $slots = array_pad(array_slice($slots, 0, 5), 5, null);

            return [
                'category' => $category,
                'images'   => array_map(
                    fn ($path) => $path ? '/storage/' . $path : null,
                    $slots
                ),
            ];
        });

        return Inertia::render('Admin/CategoryGallery/Index', [
            'galleries' => $data,
        ]);
    }

    /**
     * Update the 5 image slots for a single category. Each slot in the
     * `images` array from the form is one of:
     *  - an UploadedFile  -> store it, replacing whatever was in that slot
     *  - the string "REMOVE" -> clear that slot (delete the old file)
     *  - null/missing     -> leave that slot untouched
     *
     * Called from CategoryGalleryEditor.jsx, embedded inside the
     * Admin/Project Create and Edit pages — so this redirects back to
     * whichever page it was called from, not to a standalone gallery page.
     */
    public function update(Request $request, string $category)
    {
        abort_unless(in_array($category, self::CATEGORIES, true), 404);

        $request->validate([
            'images'   => 'nullable|array|max:5',
            'images.*' => 'nullable', // each slot validated individually below since it can be a file, "REMOVE", or absent
        ]);

        $gallery = CategoryGallery::firstOrCreate(
            ['category' => $category],
            ['images' => []]
        );

        $slots = $gallery->images ?? [];
        // Normalize to exactly 5 slots
        $slots = array_pad(array_slice($slots, 0, 5), 5, null);

        foreach (range(0, 4) as $i) {
            if ($request->hasFile("images.$i")) {
                $request->validate(["images.$i" => 'image|max:10240']);

                if (! empty($slots[$i])) {
                    Storage::disk('public')->delete($slots[$i]);
                }

                $slots[$i] = $request->file("images.$i")->store('category-galleries', 'public');
            } elseif ($request->input("images.$i") === 'REMOVE') {
                if (! empty($slots[$i])) {
                    Storage::disk('public')->delete($slots[$i]);
                }
                $slots[$i] = null;
            }
            // otherwise: leave slot untouched
        }

        $gallery->update(['images' => array_values(array_filter($slots))]);

        return back()->with('success', "\"$category\" gallery updated.");
    }
}