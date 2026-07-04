import { Head, Link, router } from "@inertiajs/react";
import MepLayout from "@/Layouts/MepLayout";

export default function Index({ ctaBanners }) {
    const handleDelete = (id) => {
        if (confirm("Delete this CTA Banner?")) {
            router.delete(`/admin/cta-banner/${id}`);
        }
    };
    return (
        <MepLayout>
            <Head title="Admin - CTA Banners" />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">CTA Banners</h1>
                    <Link href="/admin/cta-banner/create" className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A]">+ Add CTA Banner</Link>
                </div>
                <div className="space-y-4">
                    {ctaBanners.length === 0 && <p className="text-gray-500 text-sm">No CTA Banners yet.</p>}
                    {ctaBanners.map((cta) => (
                        <div key={cta.id} className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start">
                            {cta.image && <img src={`/storage/${cta.image}`} alt={cta.title} className="w-full sm:w-40 h-28 object-cover rounded-lg" />}
                            <div className="flex-1">
                                <h2 className="font-bold text-[#1A3A5C]">{cta.title}</h2>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{cta.description}</p>
                                {cta.button_text && (
                                    <span className="text-xs mt-1 inline-block px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">{cta.button_text}</span>
                                )}
                                <span className={`text-xs mt-1 ml-1 inline-block px-2 py-0.5 rounded-full ${cta.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                                    {cta.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/admin/cta-banner/${cta.id}/edit`} className="px-3 py-1.5 text-sm rounded-lg border border-[#1A3A5C] text-[#1A3A5C] hover:bg-[#1A3A5C]/5">Edit</Link>
                                <button onClick={() => handleDelete(cta.id)} className="px-3 py-1.5 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MepLayout>
    );
}