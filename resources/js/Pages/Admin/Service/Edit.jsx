import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

const TYPE_OPTIONS = [
    { value: "mechanical", label: "Mechanical / HVAC" },
    { value: "electrical", label: "Electrical & ELV" },
    { value: "plumbing",   label: "Plumbing" },
];

export default function Edit({ item }) {
    const { data, setData, transform, post, processing, errors } = useForm({
        type:            item.type,
        tagline:         item.tagline || "",
        title:           item.title,
        description:     item.description || "",
        image:           null,
        button_text:     item.button_text || "",
        benefits_title:  item.benefits_title || "",
        benefits_points: item.benefits_points || "",
        order:           item.order ?? 0,
        is_active:       !!item.is_active,
        // ← fix: empty array ពេល items null, មិនមែន [{empty}]
        items: Array.isArray(item.items) && item.items.length > 0
            ? item.items.map((it) => ({
                title:     it.title     || "",
                points:    it.points    || "",
                image:     it.image     || null,
                imageFile: null,
              }))
            : [],
    });

    const updateItem = (i, field, value) => {
        const updated = [...data.items];
        updated[i][field] = value;
        setData("items", updated);
    };
    const addItem    = () => setData("items", [...data.items, { title: "", points: "", image: null, imageFile: null }]);
    const removeItem = (i) => setData("items", data.items.filter((_, idx) => idx !== i));

    transform((formData) => {
        const fd = new FormData();
        fd.append("_method",         "put");
        fd.append("type",            formData.type);
        fd.append("tagline",         formData.tagline         || "");
        fd.append("title",           formData.title);
        fd.append("description",     formData.description     || "");
        fd.append("button_text",     formData.button_text     || "");
        fd.append("benefits_title",  formData.benefits_title  || "");
        fd.append("benefits_points", formData.benefits_points || "");
        fd.append("order",           formData.order           || 0);
        fd.append("is_active",       formData.is_active ? "1" : "0");
        if (formData.image) fd.append("image", formData.image);

        formData.items.forEach((it, i) => {
            fd.append(`items[${i}][title]`,  it.title  || "");
            fd.append(`items[${i}][points]`, it.points || "");
            if (it.imageFile) fd.append(`items[${i}][image]`, it.imageFile);
        });

        return fd;
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/service/${item.id}`, { forceFormData: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Service" />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <BackToDashboard />

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">Edit Service</h1>
                    <Link href="/admin/service" className="text-sm text-gray-600 hover:text-[#1A3A5C]">
                        ← Back to list
                    </Link>
                </div>

                {item.image && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Current Hero Image</p>
                        <img src={`/storage/${item.image}`} alt={item.title}
                            className="w-40 h-24 object-cover rounded-lg" />
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                        <select value={data.type} onChange={(e) => setData("type", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white">
                            {TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                            Link: <span className="font-mono text-[#1A3A5C]">/services/{data.type}</span>
                        </p>
                        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Tagline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                        <input type="text" value={data.tagline}
                            onChange={(e) => setData("tagline", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows={4} value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none" />
                    </div>

                    {/* Hero Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Replace Hero Image (optional)
                        </label>
                        <input type="file" accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    {/* Button Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                        <input type="text" value={data.button_text}
                            onChange={(e) => setData("button_text", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                    </div>

                    {/* Benefits */}
                    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                        <p className="text-sm font-semibold">Benefits Section</p>
                        <input type="text" placeholder="Benefits title"
                            value={data.benefits_title}
                            onChange={(e) => setData("benefits_title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                        <textarea rows={4} placeholder="One benefit per line"
                            value={data.benefits_points}
                            onChange={(e) => setData("benefits_points", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>

                    {/* Service Items */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <label className="block text-sm font-medium">Service Items (grid cards)</label>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {data.items.length === 0
                                        ? "No items yet — click + Add Item to start"
                                        : `${data.items.length} item${data.items.length > 1 ? "s" : ""}`}
                                </p>
                            </div>
                            <button type="button" onClick={addItem}
                                className="text-xs px-3 py-1.5 bg-[#1A3A5C] text-white rounded-lg hover:bg-[#2E5C8A]">
                                + Add Item
                            </button>
                        </div>

                        {data.items.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-sm">
                                No items yet. Click <strong>"+ Add Item"</strong> to add service grid cards.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.items.map((it, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-2 relative bg-white">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-gray-500">Item {i + 1}</span>
                                            <button type="button" onClick={() => removeItem(i)}
                                                className="text-xs text-red-500 hover:text-red-700">
                                                Remove
                                            </button>
                                        </div>

                                        <input type="text" placeholder="Item title (e.g. Air Conditioning System)"
                                            value={it.title}
                                            onChange={(e) => updateItem(i, "title", e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                                        {errors[`items.${i}.title`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`items.${i}.title`]}</p>
                                        )}

                                        <textarea rows={4}
                                            placeholder={"Points — one per line\ne.g.\nSplit Type AC\nVRV/VRF Systems\nChiller Systems"}
                                            value={it.points}
                                            onChange={(e) => updateItem(i, "points", e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
                                        {errors[`items.${i}.points`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`items.${i}.points`]}</p>
                                        )}

                                        {it.image && (
                                            <img src={`/storage/${it.image}`}
                                                className="w-24 h-16 object-cover rounded mb-1" />
                                        )}
                                        <div>
                                            <label className="block text-xs font-medium mb-1 text-gray-600">
                                                {it.image ? "Replace Item Image" : "Item Image (optional)"}
                                            </label>
                                            <input type="file" accept="image/*"
                                                onChange={(e) => updateItem(i, "imageFile", e.target.files[0])} />
                                            {errors[`items.${i}.image`] && (
                                                <p className="text-red-500 text-xs mt-1">{errors[`items.${i}.image`]}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order + Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <input type="number" value={data.order}
                                onChange={(e) => setData("order", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                        </div>
                        <div className="flex items-center mt-6">
                            <input type="checkbox" id="is_active" checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)}
                                className="w-4 h-4 mr-2" />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                    </div>

                    <button type="submit" disabled={processing}
                        className="w-full px-6 py-3 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60 transition-colors">
                        {processing ? "Saving..." : "Update Service"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}