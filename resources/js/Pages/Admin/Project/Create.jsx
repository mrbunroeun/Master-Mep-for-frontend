import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, Save, Play } from "lucide-react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title:       "",
        description: "",
        scope:       "",
        image:       null,
        category:    "Commercial Buildings",
        location:    "",
        timeline:    "",
        video_url:   "",
        order:       0,
        is_active:   true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.project.store"), { forceFormData: true });
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const match = url.match(
            /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    };

    const ytId = getYouTubeId(data.video_url);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add Project" />
            <div className="max-w-2xl mx-auto px-4 py-10">

                <div className="flex items-center gap-3 mb-8">
                    <Link href={route("admin.project.index")}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">Add Project</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl shadow p-8">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                            placeholder="e.g. ABA Bank SR Province" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] bg-white">
                            <option value="Commercial Buildings">Commercial Buildings</option>
                            <option value="Banks">Banks</option>
                            <option value="Restaurants & Cafés">Restaurants &amp; Cafés</option>
                            <option value="Hospitals">Hospitals</option>
                            <option value="Fuel & Industrial Projects">Fuel &amp; Industrial Projects</option>
                            <option value="Luxury Villas">Luxury Villas</option>
                            <option value="Fitness Centers">Fitness Centers</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    {/* Scope */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Scope of Work
                            <span className="text-gray-400 font-normal ml-1">(one item per line)</span>
                        </label>
                        <textarea rows={4} value={data.scope}
                            onChange={(e) => setData("scope", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
                            placeholder={"Electrical System\nPlumbing System\nAir Conditioning System"} />
                        {errors.scope && <p className="text-red-500 text-xs mt-1">{errors.scope}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows={3} value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
                            placeholder="Short project description (optional)" />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Location + Timeline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" value={data.location}
                                onChange={(e) => setData("location", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                                placeholder="Phnom Penh" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                            <input type="text" value={data.timeline}
                                onChange={(e) => setData("timeline", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                                placeholder="2025" />
                        </div>
                    </div>

                    {/* Video URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube Video URL
                            <span className="text-gray-400 font-normal ml-1">(optional)</span>
                        </label>
                        <input
                            type="text"
                            value={data.video_url}
                            onChange={(e) => setData("video_url", e.target.value.trim())}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                            placeholder="https://www.youtube.com/watch?v=xxxxxxxxxx" />

                        {ytId && (
                            <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                                        alt="YouTube thumbnail"
                                        className="w-28 h-16 object-cover rounded-md bg-gray-200" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                                            <Play size={12} fill="white" className="text-white ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-xs font-medium text-green-700">✓ Valid YouTube link detected</p>
                                    <p className="text-xs text-gray-500">Video preview will show on the projects page.</p>
                                    <a href={data.video_url} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
                                        <Play size={10} fill="currentColor" />
                                        Open on YouTube ↗
                                    </a>
                                </div>
                            </div>
                        )}

                        {data.video_url && !ytId && (
                            <p className="text-xs text-red-400 mt-1">
                                ✗ Could not detect YouTube video ID. Paste a full YouTube link.
                            </p>
                        )}
                        {errors.video_url && <p className="text-red-500 text-xs mt-1">{errors.video_url}</p>}
                    </div>

                    {/* Image + Order */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => setData("image", e.target.files[0])}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                            {progress && (
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#1A3A5C] h-1.5 rounded-full transition-all"
                                        style={{ width: `${progress.percentage}%` }} />
                                </div>
                            )}
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                            <input type="number" value={data.order}
                                onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                                min={0} />
                        </div>
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-2 pt-1">
                        <input type="checkbox" id="is_active" checked={data.is_active}
                            onChange={(e) => setData("is_active", e.target.checked)}
                            className="w-4 h-4 accent-[#1A3A5C]" />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Active (visible on website)</label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button type="submit" disabled={processing}
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60 transition">
                            <Save className="w-4 h-4" />
                            {processing ? "Saving..." : "Save Project"}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}