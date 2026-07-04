import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackToDashboard from "@/Components/BackToDashboard";

export default function Index({ items }) {
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      router.delete(route("admin.why-choose-us.destroy", { why_choose_u: id }));
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Why Choose Us" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <BackToDashboard />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1A3A5C]">Why Choose Us</h1>
          <Link
            href="/admin/why-choose-us/create"
            className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg text-sm font-medium hover:bg-[#2E5C8A] transition-colors"
          >
            + Add Item
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">No items found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Icon</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3">
                      {item.image ? (
                        <img
                          src={`/storage/${item.image}`}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.icon || "—"}</td>
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-gray-600">{item.sort_order}</td>
                    <td className="px-4 py-3">
                      {item.is_active ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/why-choose-us/${item.id}/edit`}
                        className="px-3 py-1.5 bg-[#1A3A5C] text-white rounded text-xs hover:bg-[#2E5C8A]"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                      >
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