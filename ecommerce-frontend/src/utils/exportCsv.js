export default function exportCsv(data = [], filename = "export.csv") {
  if (!data || !data.length) {
    alert("No data available to export");
    return;
  }
  const header = Object.keys(data[0]);
  const rows = data.map((obj) =>
    header.map((key) => `"${(obj[key] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );

  const csvContent = [header.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const dateStr = new Date().toISOString().slice(0, 10);
  link.download = `${filename}_${dateStr}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

