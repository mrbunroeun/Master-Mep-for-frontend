import { Head, Link, router } from "@inertiajs/react";
import MepLayout from "@/Layouts/MepLayout";

export default function Index({ faqs }) {
    const handleDelete = (id) => {
        if (confirm("Delete this FAQ?")) {
            router.delete(`/admin/faq/${id}`);
        }
    };
    return (
        <MepLayout>
            <Head title="Admin - FAQs" />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[#1A3A5C]">FAQs</h1>
                    <Link href="/admin/faq/create" className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A]">+ Add FAQ</Link>
                </div>
                <div className="space-y-4">
                    {faqs.length === 0 && <p className="text-gray-500 text-sm">No FAQs yet.</p>}
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="font-bold text-[#1A3A5C]">{faq.question}</h2>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>
                                    <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded-full ${faq.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                                        {faq.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Link href={`/admin/faq/${faq.id}/edit`} className="px-3 py-1.5 text-sm rounded-lg border border-[#1A3A5C] text-[#1A3A5C] hover:bg-[#1A3A5C]/5">Edit</Link>
                                    <button onClick={() => handleDelete(faq.id)} className="px-3 py-1.5 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MepLayout>
    );
}