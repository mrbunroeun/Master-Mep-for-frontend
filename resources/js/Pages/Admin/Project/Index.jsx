import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth, projects }) {
    const handleDelete = (id) => {
        if (confirm("Delete this project?")) {
            router.delete(`/admin/project/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - Projects" />
            <div className="max-w-5xl mx-auto px-4 py-10">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1A3A5C]">Projects</h1>
                        <p className="text-gray-400 text-sm mt-0.5">{projects.length} project(s)</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route("admin.category-gallery.index")}
                            className="px-4 py-2 border border-[#1A3A5C] text-[#1A3A5C] rounded-lg text-sm font-medium hover:bg-[#1A3A5C]/5 transition">
                            Category Galleries
                        </Link>
                        <Link href="/admin/project/create"
                            className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] transition">
                            + Add Project
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    {projects.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-10">No projects yet.</p>
                    )}

                    {projects.map((project) => (
                        <div key={project.id}
                            className="flex flex-col sm:flex-row gap-4 items-start border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition">

                            {/* Image */}
                            {project.image
                                ? <img src={`/storage/${project.image}`} alt={project.title}
                                    className="w-full sm:w-44 h-28 object-cover rounded-lg flex-shrink-0" />
                                : <div className="w-full sm:w-44 h-28 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-400 text-xs">No image</span>
                                  </div>
                            }

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="font-bold text-[#1A3A5C] truncate">{project.title}</h2>
                                </div>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="text-xs text-orange-500 font-medium">{project.category}</span>
                                    {project.location && <span className="text-xs text-gray-400">📍 {project.location}</span>}
                                    {project.timeline && <span className="text-xs text-gray-400">📅 {project.timeline}</span>}
                                    <span className="text-xs text-gray-400">Order: {project.order}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                                <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded-full font-medium ${
                                    project.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                                    {project.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-shrink-0">
                                <Link href={`/admin/project/${project.id}/edit`}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-[#1A3A5C] text-[#1A3A5C] hover:bg-[#1A3A5C]/5 transition">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(project.id)}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}