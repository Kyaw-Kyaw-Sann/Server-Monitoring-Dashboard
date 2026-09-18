export async function fetchSystemData(signal) {
  const res = await fetch(`${import.meta.env.BASE_URL}data.json`, { signal });
  if (!res.ok) throw new Error(`Unable to load demo data (HTTP ${res.status}).`);

  const json = await res.json();
  if (!Array.isArray(json?.data)) throw new Error("The demo data format is invalid.");

  return json.data
    .map((item) => ({
      ...item,
      cpu_usage: Number.parseFloat(item.cpu_usage) || 0,
      memory: {
        ...item.memory,
        used: Number.parseInt(item.memory?.used, 10) || 0,
        total: Number.parseInt(item.memory?.total, 10) || 0,
        percent: Number.parseInt(item.memory?.percent, 10) || 0,
      },
      disk_usage: Number.parseInt(item.disk_usage, 10) || 0,
      network_connections: Number.parseInt(item.network_connections, 10) || 0,
      location: {
        lat: Number.parseFloat(item.location?.lat),
        lon: Number.parseFloat(item.location?.lon),
      },
    }))
    .sort((first, second) => new Date(first.timestamp) - new Date(second.timestamp));
}
