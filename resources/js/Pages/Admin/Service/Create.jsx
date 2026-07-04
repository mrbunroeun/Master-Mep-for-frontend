import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

const TYPE_OPTIONS = [
    { value: "mechanical", label: "Mechanical / HVAC" },
    { value: "electrical", label: "Electrical & ELV" },
    { value: "plumbing",   label: "Plumbing" },
];

export default function Create() {
    const { data, setData, transform, post, processing, errors } = useForm({
        type: "mechanical",
        tagline: "",
        title: "",
        description: "",
        image: null,
        button_text: "",
        benefits_title: "",
        benefits_points: "",
        order: 0,
        is_active: true,
        items: [{ title: "", points: "", imageFile: null }],
    });

    const updateItem = (i, field, value) => {
        const updated = [...data.items];
        updated[i][field] = value;
        setData("items", updated);
    };
    const addItem = () => setData("items", [...data.items, { title: "", points: "", imageFile: null }]);
    const removeItem = (i) => setData("items", data.items.filter((_, idx) => idx !== i));

    transform((formData) => {
        const fd = new FormData();
        fd.append("type", formData.type);
        fd.append("tagline", formData.tagline || "");
        fd.append("title", formData.title);
        fd.append("description", formData.description || "");
        fd.append("button_text", formData.button_text || "");
        fd.append("benefits_title", formData.benefits_title || "");
        fd.append("benefits_points", formData.benefits_points || "");
        fd.append("order", formData.order || 0);
        fd.append("is_active", formData.is_active ? "1" : "0");
        if (formData.image) fd.append("image", formData.image);

        formData.items.forEach((item, i) => {
            fd.append(`items[${i}][title]`, item.title || "");
            fd.append(`items[${i}][points]`, item.points || "");
            if (item.imageFile) fd.append(`items[${i}][image]`, item.imageFile);
        });

        return fd;
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/service", { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Service" />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <BackToDashboard />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">Add Service</h1>
                    <Link href="/admin/service" className="text-sm text-gray-600 hover:text-[#1A3A5C]">← Back to list</Link>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                        <select value={data.type} onChange={(e) => setData("type", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white">
                            {TYPE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                            Link: <span className="font-mono text-[#1A3A5C]">/services/{data.type}</span>
                        </p>
                        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={data.title} onChange={(e) => setData("title", e.target.value)}
                            placeholder="e.g. Plumbing System"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                        <input type="text" value={data.tagline} onChange={(e) => setData("tagline", e.target.value)}
                            placeholder="e.g. What We Do"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows={4} value={data.description} onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input type="text" value={data.button_text} onChange={(e) => setData("button_text", e.target.value)}
                            placeholder="View Plumbing Solutions"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                        <p className="text-sm font-semibold">Benefits Section</p>
                        <input type="text" placeholder="Benefits title" value={data.benefits_title}
                            onChange={(e) => setData("benefits_title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                        <textarea rows={4} placeholder="One benefit per line" value={data.benefits_points}
                            onChange={(e) => setData("benefits_points", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>

                    {/* Items (3 grid cards) */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium">Service Items (grid cards)</label>
                            <button type="button" onClick={addItem} className="text-xs px-3 py-1 bg-[#1A3A5C] text-white rounded-lg">
                                + Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.items.map((item, i) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-2 relative">
                                    {data.items.length > 1 && (
                                        <button type="button" onClick={() => removeItem(i)}
                                            className="absolute top-2 right-2 text-xs text-red-500">Remove</button>
                                    )}
                                    <input type="text" placeholder="Item title (e.g. Water Supply System)"
                                        value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                                    <textarea rows={3} placeholder="Points — one per line"
                                        value={item.points} onChange={(e) => updateItem(i, "points", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Item Image</label>
                                        <input type="file" accept="image/*"
                                            onChange={(e) => updateItem(i, "imageFile", e.target.files[0])} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData("order", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        </div>
                        <div className="flex items-center mt-6">
                            <input type="checkbox" id="is_active" checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)} className="w-4 h-4 mr-2" />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                    </div>

                    <button type="submit" disabled={processing}
                        className="px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60">
                        {processing ? "Saving..." : "Create Service"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}