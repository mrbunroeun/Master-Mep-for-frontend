import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import ImageCropModal from '@/Components/ImageCropModal';

function ImagePreview({ image, className = 'w-32 h-24 object-cover rounded-lg' }) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (image instanceof File) {
            const objectUrl = URL.createObjectURL(image);
            setUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setUrl(image ? `/storage/${image}` : null);
    }, [image]);

    if (!url) return null;
    return <img src={url} alt="" className={className} />;
}

export default function Edit({ item }) {
    const { data, setData, processing, errors } = useForm({
        title: item.title || '',
        category: item.category || '',
        published_date: item.published_date ? item.published_date.slice(0, 10) : '',
        image: null,
        introduction: item.introduction || '',
        cta_text: item.cta_text || '',
        layout: item.layout || 'default',
        highlight_title: item.highlight_title || '',
        highlight_body: item.highlight_body || '',
        sections_title: item.sections_title || '',
        sections: item.sections || [],
    });

    const [cropState, setCropState] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const addSection = () => {
        setData('sections', [...data.sections, { title: '', body: '', image: null }]);
    };

    const removeSection = (i) => {
        setData('sections', data.sections.filter((_, idx) => idx !== i));
    };

    const updateSection = (i, field, value) => {
        const updated = [...data.sections];
        updated[i] = { ...updated[i], [field]: value };
        setData('sections', updated);
    };

    const openCropFor = (file, target, aspect) => {
        if (!file) return;
        const src = URL.createObjectURL(file);
        setCropState({ target, src, aspect, fileName: file.name });
    };

    const closeCrop = () => {
        if (cropState?.src) URL.revokeObjectURL(cropState.src);
        setCropState(null);
        setFileInputKey((k) => k + 1);
    };

    const handleCropSave = (croppedFile) => {
        if (cropState.target === 'hero') {
            setData('image', croppedFile);
        } else {
            updateSection(cropState.target, 'image', croppedFile);
        }
        closeCrop();
    };

    const submit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const fd = new FormData();
        fd.append('_method', 'PUT');
        fd.append('title', data.title);
        fd.append('category', data.category || '');
        fd.append('published_date', data.published_date || '');
        fd.append('introduction', data.introduction || '');
        fd.append('cta_text', data.cta_text || '');
        fd.append('layout', data.layout);
        fd.append('highlight_title', data.highlight_title || '');
        fd.append('highlight_body', data.highlight_body || '');
        fd.append('sections_title', data.sections_title || '');

        if (data.image instanceof File) {
            fd.append('image', data.image);
        }

        data.sections.forEach((s, i) => {
            fd.append(`sections[${i}][title]`, s.title || '');
            fd.append(`sections[${i}][body]`, s.body || '');
            if (s.image instanceof File) {
                fd.append(`sections[${i}][image]`, s.image);
            } else if (typeof s.image === 'string') {
                fd.append(`sections[${i}][existing_image]`, s.image);
            }
        });

        router.post(route('admin.insights.update', item.id), fd, {
            forceFormData: true,
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Insight — ${item.title}`} />

            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold text-[#1A3A5C] mb-6">Edit Insight</h1>

                <form onSubmit={submit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold text-gray-700">Basic Info</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Published Date</label>
                                <input
                                    type="date"
                                    value={data.published_date}
                                    onChange={(e) => setData('published_date', e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Layout</label>
                            <select
                                value={data.layout}
                                onChange={(e) => setData('layout', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="default">Default</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Hero / Cover Image</label>
                            <div className="mb-2">
                                <ImagePreview image={data.image || item.image} className="w-48 aspect-video object-cover rounded-lg" />
                            </div>
                            <input
                                key={`hero-image-${fileInputKey}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => openCropFor(e.target.files[0], 'hero', 16 / 9)}
                                className="text-sm"
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Introduction</label>
                            <textarea
                                value={data.introduction}
                                onChange={(e) => setData('introduction', e.target.value)}
                                rows={4}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">CTA Text</label>
                            <input
                                type="text"
                                value={data.cta_text}
                                onChange={(e) => setData('cta_text', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-gray-700">Content Sections</h2>
                            <button type="button" onClick={addSection} className="text-sm text-[#1A3A5C] font-medium hover:underline">
                                + Add Section
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Sections Heading</label>
                            <input
                                type="text"
                                value={data.sections_title}
                                onChange={(e) => setData('sections_title', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        {data.sections.map((section, i) => (
                            <div key={i} className="border rounded-lg p-4 space-y-3 relative">
                                <button
                                    type="button"
                                    onClick={() => removeSection(i)}
                                    className="absolute top-3 right-3 text-red-500 text-xs hover:underline"
                                >
                                    Remove
                                </button>

                                <input
                                    type="text"
                                    value={section.title || ''}
                                    onChange={(e) => updateSection(i, 'title', e.target.value)}
                                    placeholder="Section title"
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />
                                <textarea
                                    value={section.body || ''}
                                    onChange={(e) => updateSection(i, 'body', e.target.value)}
                                    placeholder="Section body"
                                    rows={3}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />

                                <ImagePreview image={section.image} />

                                <input
                                    key={`section-image-${i}-${fileInputKey}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => openCropFor(e.target.files[0], i, 4 / 3)}
                                    className="text-sm"
                                />
                                {errors[`sections.${i}.image`] && (
                                    <p className="text-red-500 text-xs">{errors[`sections.${i}.image`]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Highlight Box */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold text-gray-700">Highlight Box (optional)</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Highlight Title</label>
                            <input
                                type="text"
                                value={data.highlight_title}
                                onChange={(e) => setData('highlight_title', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Highlight Body</label>
                            <textarea
                                value={data.highlight_body}
                                onChange={(e) => setData('highlight_body', e.target.value)}
                                rows={3}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            disabled={submitting || processing}
                            className="w-full sm:w-auto justify-center px-6 py-2.5 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#12283f] transition disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link href="/admin/insights" className="w-full sm:w-auto text-center px-6 py-2.5 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>

            {cropState && (
                <ImageCropModal
                    imageSrc={cropState.src}
                    aspect={cropState.aspect}
                    fileName={cropState.fileName}
                    onCancel={closeCrop}
                    onSave={handleCropSave}
                />
            )}
        </AuthenticatedLayout>
    );
} 