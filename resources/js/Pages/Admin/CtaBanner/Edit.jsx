import { Head, useForm } from "@inertiajs/react";
import MepLayout from "@/Layouts/MepLayout";

export default function Edit({ ctaBanner }) {
    const { data, setData, post, processing, errors } = useForm({
        title: ctaBanner.title, description: ctaBanner.description || "",
        button_text: ctaBanner.button_text || "", button_link: ctaBanner.button_link || "",
        image: null, is_active: ctaBanner.is_active, _method: "put",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/cta-banner/${ctaBanner.id}`, { forceFormData: true });
    };
    return (
        <MepLayout>
            <Head title="Edit CTA Banner" />
            <div className="max-w-2xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">Edit CTA Banner</h1>
                {ctaBanner.image && <img src={`/storage/${ctaBanner.image}`} alt={ctaBanner.title} className="w-60 h-36 object-cover rounded-lg mb-4" />}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={data.title} onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows={3} value={data.description} onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input type="text" value={data.button_text} onChange={(e) => setData("button_text", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                            <input type="text" value={data.button_link} onChange={(e) => setData("button_link", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Replace Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={(e) => setData("is_active", e.target.checked)} id="is_active" />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Active</label>
                    </div>
                    <button type="submit" disabled={processing}
                        className="px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60">
                        {processing ? "Saving..." : "Update CTA Banner"}
                    </button>
                </form>
            </div>
        </MepLayout>
    );
}