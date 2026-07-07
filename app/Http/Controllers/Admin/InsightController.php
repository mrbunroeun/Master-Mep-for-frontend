<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
class InsightController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/insight/index', [
            'items' => Insight::latest()->get(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/insight/create');
    }
    private function baseValidation(Request $request): array
    {
        return $request->validate([
            'title'             => 'required|string|max:255',
            'category'          => 'nullable|string|max:255',
            'published_date'    => 'nullable|date',
            'image' => 'nullable|image|max:51200',
            'introduction'      => 'nullable|string',
            'cta_text'          => 'nullable|string|max:255',
            'layout'            => 'nullable|in:default,dark',
            'highlight_title'   => 'nullable|string|max:255',
            'highlight_body'    => 'nullable|string',
            'sections_title'    => 'nullable|string|max:255',
            'sections'          => 'nullable|array',
            'sections.*.title'  => 'nullable|string|max:255',
            'sections.*.body'   => 'nullable|string',
            'sections.*.image' => 'nullable|image|max:51200',
        ]);
    }
    private function processSections(Request $request, array $existingSections = []): array
    {
        $sections = $request->input('sections', []);
        foreach ($sections as $i => $section) {
            if ($request->hasFile("sections.$i.image")) {
                $sections[$i]['image'] = $request->file("sections.$i.image")->store('insights/sections', 'public');
            } elseif (isset($existingSections[$i]['image'])) {
                $sections[$i]['image'] = $existingSections[$i]['image'];
            }
        }
        return $sections;
    }
    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;
        while (
            Insight::where('slug', $slug)
                ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }
        return $slug;
    }
    public function store(Request $request)
    {
        $data = $this->baseValidation($request);
        $data['layout'] = $data['layout'] ?? 'default';
        $data['is_active'] = true;
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('insights', 'public');
        }
        $data['sections'] = $this->processSections($request);
        Insight::create($data);
        return redirect('/admin/insights')->with('success', 'Insight created.');
    }
    public function edit(Insight $insight)
    {
        return Inertia::render('Admin/insight/Edit', ['item' => $insight]);
    }
    public function update(Request $request, Insight $insight)
    {
        $data = $this->baseValidation($request);
        $data['layout'] = $data['layout'] ?? 'default';
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('insights', 'public');
        }
        $data['sections'] = $this->processSections($request, $insight->sections ?? []);
        $insight->update($data);
        return redirect('/admin/insights')->with('success', 'Insight updated.');
    }
    public function destroy(Insight $insight)
    {
        $insight->delete();
        return redirect('/admin/insights')->with('success', 'Insight deleted.');
    }
}   