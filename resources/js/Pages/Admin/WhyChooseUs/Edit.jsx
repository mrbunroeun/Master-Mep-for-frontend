import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, Save } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ICON_OPTIONS = [
    'BadgeCheck', 'Layers', 'Clock', 'ShieldCheck', 'Globe', 'Headphones',
    'CheckCircle', 'Star', 'Zap', 'Award', 'TrendingUp', 'Users',
    'Wrench', 'Settings', 'HardHat', 'Building', 'Lightbulb', 'Shield',
];

export default function Edit({ item }) {
    const { data, setData, put, processing, errors } = useForm({
        title:            item.title            || "",
        description:      item.description      || "",
        icon:             item.icon             || "CheckCircle",
        image:            null,
        main_description: item.main_description || "",
        sort_order:       item.sort_order       ?? 0,
        is_active:        !!item.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.why-choose-us.update', item.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Why Choose Us Item" />
            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/admin/why-choose-us"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">Edit Item</h1>
                </div>

                {/* Current Image */}
                {item.image && (
                    <img src={`/storage/${item.image}`} alt={item.title}
                        className="w-32 h-24 object-cover rounded-lg mb-6" />
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Title *</label>
                        <input type="text" value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                            placeholder="e.g. Certified MEP Engineers" />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Card Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Description
                            <span className="text-gray-400 font-normal ml-1 text-xs">card</span>
                        </label>
                        <textarea rows={3} value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
                            placeholder="Short description for this card..." />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Main Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Main Description
                            <span className="text-gray-400 font-normal ml-1 text-xs">— item </span>
                        </label>
                        <textarea rows={4} value={data.main_description}
                            onChange={(e) => setData("main_description", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none"
                            placeholder="Master MEP Solution Co., Ltd combines technical expertise..." />
                        {errors.main_description && <p className="text-red-500 text-xs mt-1">{errors.main_description}</p>}
                    </div>

                    {/* Icon Picker */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Lucide) *</label>
                        <div className="grid grid-cols-6 gap-2 mb-2">
                            {ICON_OPTIONS.map(iconName => {
                                const Icon = LucideIcons[iconName];
                                if (!Icon) return null;
                                const isSelected = data.icon === iconName;
                                return (
                                    <button key={iconName} type="button"
                                        onClick={() => setData("icon", iconName)}
                                        title={iconName}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition ${
                                            isSelected
                                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                                : "border-gray-200 hover:border-gray-400 text-gray-500"
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                        <span className="truncate w-full text-center" style={{ fontSize: "9px" }}>{iconName}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <input type="text" value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                            placeholder="Or type any Lucide icon name..." />
                        {data.icon && (() => {
                            const Preview = LucideIcons[data.icon];
                            return Preview ? (
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <Preview className="w-5 h-5 text-[#1A3A5C]" />
                                    <span>Preview: <strong>{data.icon}</strong></span>
                                </div>
                            ) : (
                                <p className="mt-1 text-xs text-red-400">Icon "{data.icon}" not found</p>
                            );
                        })()}
                        {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                    </div>

                    {/* Replace Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Replace Image (optional)</label>
                        <input type="file" accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    {/* Sort Order + Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                            <input type="number" value={data.sort_order}
                                onChange={(e) => setData("sort_order", parseInt(e.target.value) || 0)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                                min={0} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={data.is_active ? "1" : "0"}
                                onChange={(e) => setData("is_active", e.target.value === "1")}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={processing}
                            className="inline-flex items-center gap-2 bg-[#1A3A5C] text-white px-6 py-2.5 rounded-lg hover:bg-[#2E5C8A] transition text-sm font-medium disabled:opacity-60">
                            <Save className="w-4 h-4" />
                            {processing ? "Updating..." : "Update Item"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}