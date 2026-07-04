import { Head, useForm } from "@inertiajs/react";
import MepLayout from "@/Layouts/MepLayout";

export default function Edit({ faq }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question, answer: faq.answer,
        order: faq.order, is_active: faq.is_active,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/faq/${faq.id}`);
    };
    return (
        <MepLayout>
            <Head title="Edit FAQ" />
            <div className="max-w-2xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">Edit FAQ</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                        <input type="text" value={data.question} onChange={(e) => setData("question", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]" />
                        {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
                        <textarea rows={4} value={data.answer} onChange={(e) => setData("answer", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] resize-none" />
                        {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input type="number" value={data.order} onChange={(e) => setData("order", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={(e) => setData("is_active", e.target.checked)} id="is_active" />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Active</label>
                    </div>
                    <button type="submit" disabled={processing}
                        className="px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] disabled:opacity-60">
                        {processing ? "Saving..." : "Update FAQ"}
                    </button>
                </form>
            </div>
        </MepLayout>
    );
}