import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, Save } from "lucide-react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: "", description: "", video: null, is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/about", { forceFormData: true });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add About" />
            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/admin/about"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">Add About Section</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                            placeholder="e.g. About Master MEP" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea rows={5} value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
                            placeholder="Company description..." />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                        <input type="file" accept="video/*"
                            onChange={(e) => setData("video", e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        <p className="text-xs text-gray-500 mt-1">MP4 recommended, up to 50MB.</p>
                        {errors.video && <p className="text-red-500 text-xs mt-1">{errors.video}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="is_active" checked={data.is_active}
                            onChange={(e) => setData("is_active", e.target.checked)}
                            className="w-4 h-4 accent-[#1A3A5C]" />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Active (visible on website)</label>
                    </div>

                    <div className="pt-2">
                        <button type="submit" disabled={processing}
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60 transition">
                            <Save className="w-4 h-4" />
                            {processing ? "Saving..." : "Save About"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}