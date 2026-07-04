import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    icon: "",
    image: null,
    main_description: "",
    section_label: "",
    section_title: "",
    sort_order: 0,
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.why-choose-us.store"), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Add Why Choose Us Item" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <BackToDashboard />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#1A3A5C]">Add Item</h1>
          <Link href="/admin/why-choose-us" className="text-sm text-gray-600 hover:text-[#1A3A5C]">
            ← Back to list
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Label</label>
              <input
                type="text"
                value={data.section_label}
                onChange={(e) => setData("section_label", e.target.value)}
                placeholder="e.g. Why Choose Master MEP"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
              />
              {errors.section_label && <p className="text-red-500 text-xs mt-1">{errors.section_label}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input
                type="text"
                value={data.section_title}
                onChange={(e) => setData("section_title", e.target.value)}
                placeholder="e.g. Why Choose Us"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
              />
              {errors.section_title && <p className="text-red-500 text-xs mt-1">{errors.section_title}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Title *</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              placeholder="e.g. Experienced engineering team"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Description (intro text)</label>
            <input
              type="text"
              value={data.main_description}
              onChange={(e) => setData("main_description", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
            />
            {errors.main_description && <p className="text-red-500 text-xs mt-1">{errors.main_description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon (text/emoji, optional)</label>
            <input
              type="text"
              value={data.icon}
              onChange={(e) => setData("icon", e.target.value)}
              placeholder="e.g. ⚡ or icon-name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
            />
            {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData("image", e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                type="number"
                value={data.sort_order}
                onChange={(e) => setData("sort_order", parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                min={0}
              />
              {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="is_active"
                checked={data.is_active}
                onChange={(e) => setData("is_active", e.target.checked)}
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] transition-colors disabled:opacity-60"
          >
            {processing ? "Saving..." : "Create Item"}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}