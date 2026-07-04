import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category: "",
        published_date: "",
        introduction: "",
        cta_text: "",
        layout: "default",
        highlight_title: "",
        highlight_body: "",
        sections_title: "",
        sections: [{ title: "", body: "", image: null }],
        image: null,
    });

    const updateSection = (index, field, value) => {
        const updated = [...data.sections];
        updated[index][field] = value;
        setData("sections", updated);
    };

    const addSection = () => {
        setData("sections", [...data.sections, { title: "", body: "", image: null }]);
    };

    const removeSection = (index) => {
        setData("sections", data.sections.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("title", data.title);
        fd.append("category", data.category || "");
        fd.append("published_date", data.published_date || "");
        fd.append("introduction", data.introduction || "");
        fd.append("cta_text", data.cta_text || "");
        fd.append("layout", data.layout);
        fd.append("highlight_title", data.highlight_title || "");
        fd.append("highlight_body", data.highlight_body || "");
        fd.append("sections_title", data.sections_title || "");
        if (data.image instanceof File) fd.append("image", data.image);

        data.sections.forEach((s, i) => {
            fd.append(`sections[${i}][title]`, s.title || "");
            fd.append(`sections[${i}][body]`, s.body || "");
            if (s.image instanceof File) fd.append(`sections[${i}][image]`, s.image);
        });

        post("/admin/insights", {
            data: fd,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Insight" />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <BackToDashboard />
                <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">Add Insight</h1>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData("category", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="">— Select category —</option>
                                <option value="HVAC">HVAC</option>
                                <option value="MEP Design">MEP Design</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Plumbing">Plumbing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Published Date</label>
                            <input
                                type="date"
                                value={data.published_date}
                                onChange={(e) => setData("published_date", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Introduction</label>
                        <textarea
                            rows={3}
                            value={data.introduction}
                            onChange={(e) => setData("introduction", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">CTA Text</label>
                        <input
                            type="text"
                            value={data.cta_text}
                            onChange={(e) => setData("cta_text", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Layout</label>
                        <select
                            value={data.layout}
                            onChange={(e) => setData("layout", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="default">Default</option>
                            <option value="dark">Dark (with highlight box)</option>
                        </select>
                    </div>

                    {data.layout === "dark" && (
                        <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                            <p className="text-sm font-semibold">Highlight Box</p>
                            <input
                                type="text"
                                placeholder="Highlight title"
                                value={data.highlight_title}
                                onChange={(e) => setData("highlight_title", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                            <textarea
                                rows={2}
                                placeholder="Highlight body"
                                value={data.highlight_body}
                                onChange={(e) => setData("highlight_body", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Sections Title (optional)</label>
                        <input
                            type="text"
                            value={data.sections_title}
                            onChange={(e) => setData("sections_title", e.target.value)}
                            placeholder="Important Factors to Consider"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium">Items</label>
                            <button
                                type="button"
                                onClick={addSection}
                                className="text-xs px-3 py-1 bg-[#1A3A5C] text-white rounded-lg"
                            >
                                + Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.sections.map((section, i) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-2 relative">
                                    {data.sections.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSection(i)}
                                            className="absolute top-2 right-2 text-xs text-red-500"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <input
                                        type="text"
                                        placeholder="Item title"
                                        value={section.title}
                                        onChange={(e) => updateSection(i, "title", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                    <textarea
                                        rows={3}
                                        placeholder="Item description"
                                        value={section.body}
                                        onChange={(e) => updateSection(i, "body", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Item Image</label>
                                        {section.image instanceof File && (
                                            <img
                                                src={URL.createObjectURL(section.image)}
                                                alt=""
                                                className="w-32 h-24 object-cover rounded-lg mb-2"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => updateSection(i, "image", e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image</label>
                        {data.image instanceof File && (
                            <img
                                src={URL.createObjectURL(data.image)}
                                alt=""
                                className="w-48 aspect-video object-cover rounded-lg mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-50"
                    >
                        {processing ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}