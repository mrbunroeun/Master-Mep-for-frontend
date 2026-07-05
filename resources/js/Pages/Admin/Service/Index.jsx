import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

const TYPE_LABELS = {
  mechanical: "Mechanical / HVAC",
  electrical: "Electrical & ELV",
  plumbing: "Plumbing",
  maintenance: "Maintenance (AMS)",
  solasystem: "Solar System",
};

export default function Index({ services = [] }) {
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      router.delete(route("admin.service.destroy", id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Services" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <BackToDashboard />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1A3A5C]">Services</h1>
          <Link
            href={route("admin.service.create")}
            className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] transition-colors"
          >
            + Add Service
          </Link>
        </div>

        {services.length === 0 ? (
          <p className="text-gray-500 text-sm">No services found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-t">
                    <td className="px-4 py-3">
                      {service.image ? (
                        <img src={`/storage/${service.image}`} alt={service.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{service.title}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {TYPE_LABELS[service.type] || service.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{service.items?.length ?? 0}</td>
                    <td className="px-4 py-3">
                      {service.is_active ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      <Link href={route("admin.service.edit", service.id)} className="px-3 py-1.5 bg-[#1A3A5C] text-white rounded text-xs hover:bg-[#2E5C8A]">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(service.id)} className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}