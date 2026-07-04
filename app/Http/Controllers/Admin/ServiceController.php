<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Service/Index', [
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Service/Create');
    }

    private function baseValidation(Request $request): array
    {
        return $request->validate([
            'type'             => 'required|string|in:mechanical,electrical,plumbing',
            'tagline'          => 'nullable|string|max:255',
            'title'            => 'required|string|max:255',
            'description'      => 'nullable|string',
            'image'            => 'nullable|image|max:10240',
            'button_text'      => 'nullable|string|max:100',
            'benefits_title'   => 'nullable|string|max:255',
            'benefits_points'  => 'nullable|string',
            'order'            => 'nullable|integer',
            'is_active'        => 'sometimes|boolean',
            'items'            => 'nullable|array',
            'items.*.title'    => 'nullable|string|max:255',
            'items.*.points'   => 'nullable|string',
            'items.*.image'    => 'nullable|image|max:10240',
        ]);
    }

    private function processItems(Request $request, array $existingItems = []): array
    {
        $items = $request->input('items', []);

        foreach ($items as $i => $item) {
            if ($request->hasFile("items.$i.image")) {
                $items[$i]['image'] = $request->file("items.$i.image")->store('services/items', 'public');
            } elseif (isset($existingItems[$i]['image'])) {
                $items[$i]['image'] = $existingItems[$i]['image'];
            }
        }

        return $items;
    }

    public function store(Request $request)
    {
        $data = $this->baseValidation($request);
        $data['is_active']   = $request->boolean('is_active');
        $data['order']       = $data['order'] ?? 0;
        $data['button_link'] = "/services/{$data['type']}";

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('services', 'public');
        }

        $data['items'] = $this->processItems($request);

        Service::create($data);

        return redirect()->route('admin.service.index')->with('success', 'Service created.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Service/Edit', ['item' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $data = $this->baseValidation($request);
        $data['is_active']   = $request->boolean('is_active');
        $data['order']       = $data['order'] ?? 0;
        $data['button_link'] = "/services/{$data['type']}";

        if ($request->hasFile('image')) {
            if ($service->image) Storage::disk('public')->delete($service->image);
            $data['image'] = $request->file('image')->store('services', 'public');
        }

        $existingItems = is_array($service->items) ? $service->items : [];
        $data['items'] = $this->processItems($request, $existingItems);

        $service->update($data);

        return redirect()->route('admin.service.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        if ($service->image) Storage::disk('public')->delete($service->image);
        $service->delete();

        return redirect()->route('admin.service.index')->with('success', 'Service deleted.');
    }
}