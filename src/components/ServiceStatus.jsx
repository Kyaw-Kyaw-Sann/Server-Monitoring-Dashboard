import { Server } from "lucide-react";

export default function ServiceStatus({ services }) {
  if (!services) return null;

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-600 p-2 rounded-full shadow-md">
          <Server className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-semibold text-gray-800">Services</h2>
      </div>

      {/* Service List */}
      <ul className="space-y-2">
        {Object.entries(services).map(([name, status]) => (
          <li
            key={name}
            className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-200"
          >
            <span className="capitalize font-medium text-gray-700">{name}</span>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                status === "running"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
