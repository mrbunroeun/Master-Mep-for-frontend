import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ activity }) {
    const { data, setData, post, processing, errors } = useForm({
        title: activity.title || "",
        category: activity.category || "",
        activity_date: activity.activity_date || "",
        excerpt: activity.excerpt || "",
        image: null,
        is_active: activity.is_active,
        _method: "put",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.activity.update", activity.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Activity" />

            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">Edit Activity</h1>

                <form onSubmit={submit} className="space-y-5 bg-white p-6 rounded-xl shadow-sm">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={data.activity_date}
                            onChange={(e) => setData("activity_date", e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                        {errors.activity_date && <p className="text-red-500 text-xs mt-1">{errors.activity_date}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Excerpt</label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData("excerpt", e.target.value)}
                            rows={4}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    {activity.image && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Current Image</label>
                            <img
                                src={`/storage/${activity.image}`}
                                alt={activity.title}
                                className="w-32 h-24 object-cover rounded"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Replace Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full border rounded-lg p-2"
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData("is_active", e.target.checked)}
                            id="is_active"
                        />
                        <label htmlFor="is_active" className="text-sm">Active (visible on public site)</label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#1A3A5C] text-white rounded-lg font-medium hover:bg-[#275587] disabled:opacity-50"
                    >
                        Update Activity
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}