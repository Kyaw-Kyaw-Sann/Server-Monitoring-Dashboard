import { useEffect, useState } from "react";
import { fetchSystemData } from "../api/monitoringApi";
import { Cpu } from "lucide-react";
import { MemoryStick } from "lucide-react";
import { HardDrive } from "lucide-react";
import { Wifi } from "lucide-react";

function TaskManager() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
    let controller;

    const fetchData = () => {
      controller = new AbortController();
      fetchSystemData(controller.signal)
        .then((systemData) => {
          setData(systemData);
          setError(null);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        });
    };

    fetchData();
    intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
      if (controller) controller.abort();
    };
  }, []);

  if (error) return <div className="p-6 text-red-700">Could not load task data: {error}</div>;
  if (!data.length) return <div className="p-6 text-gray-600">Loading task data…</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {data
        .slice()
        .reverse()
        .map((item, idx) => (
          <div
            key={`${item.timestamp}-${idx}`}
            className="bg-white shadow rounded-xl p-6 border border-gray-200 space-y-4"
          >
            <h2 className="text-lg font-bold text-gray-800">
              {new Date(item.timestamp).toLocaleString()}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* CPU */}
              <div className="p-6 rounded-2xl border shadow-lg bg-blue-50 flex flex-col">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-full shadow-md">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">CPU Usage</h3>
                </div>

                {/* Percentage */}
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  {item.cpu_usage}%
                </p>

                {/* Modern Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                    style={{ width: `${item.cpu_usage}%` }}
                  ></div>
                </div>
              </div>

              {/* Memory */}
              <div className="p-6 rounded-2xl border shadow-lg bg-green-50 flex flex-col">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-full shadow-md">
                    <MemoryStick className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Memory Usage</h3>
                </div>

                {/* Percentage */}
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {item.memory.percent}%
                </p>
                {/* <p className="text-sm text-gray-600 mb-3">
    {item.memory.used}MB / {item.memory.total}MB
  </p> */}

                {/* Modern Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-green-500 to-green-700 rounded-full transition-all duration-500"
                    style={{ width: `${item.memory.percent}%` }}
                  ></div>
                </div>
              </div>

              {/* Disk */}
              {/* Disk Usage */}
              <div className="p-6 rounded-2xl border shadow-lg bg-orange-50 flex flex-col">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-600 p-2 rounded-full shadow-md">
                    <HardDrive className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Disk Usage</h3>
                </div>

                {/* Percentage */}
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {item.disk_usage}%
                </p>

                {/* Modern Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full transition-all duration-500"
                    style={{ width: `${item.disk_usage}%` }}
                  ></div>
                </div>
              </div>

              {/* Network Connections */}
              <div className="p-6 rounded-2xl border shadow-lg bg-purple-50 flex flex-col">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-full shadow-md">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Network Connections
                  </h3>
                </div>

                {/* Value */}
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {item.network_connections}
                </p>

                {/* Subtext */}
                <span className="text-sm text-gray-600">
                  Active connections
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskManager;
