import jsPDF from "jspdf";
import "jspdf-autotable";

export default function exportPdf(data = [], filename = "export") {
  if (!data || !data.length) {
    alert("No data available to export");
    return;
  }

  const doc = new jsPDF();

  const headers = [Object.keys(data[0])];
  const rows = data.map((row) => Object.values(row));

  doc.setFontSize(14);
  doc.text("Analytics Report", 14, 16);

  const dateStr = new Date().toISOString().slice(0, 10);

  doc.autoTable({
    startY: 24,
    head: headers,
    body: rows,
    theme: "grid",
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [40, 40, 40], // dark header
    },
  });

  doc.save(`${filename}_${dateStr}.pdf`);
}

