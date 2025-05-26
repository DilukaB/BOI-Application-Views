import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const handleDownloadPDF = () => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((formData) => {
      const doc = new jsPDF();
      const margin = 14;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 20;

      const sectionFontSize = 12;
      const bodyFontSize = 10;

      // --- Utility Functions ---
      const ensureNewPageForSection = (requiredSpace = 40) => {
        if (y + requiredSpace > pageHeight - margin) {
          doc.addPage();
          y = 20;
        }
      };

      const addSectionHeader = (text, yPosition) => {
        ensureNewPageForSection(20);
        doc.setFontSize(sectionFontSize);
        doc.setFont("helvetica", "bold");
        doc.text(text, margin, yPosition);
        return yPosition + 15;
      };

      const addTable = (title, headers, data, startY) => {
        if (startY + 60 > pageHeight - margin) {
          doc.addPage();
          startY = 20;
        }

        doc.setFontSize(sectionFontSize);
        doc.text(title, margin, startY);

        autoTable(doc, {
          head: headers,
          body: data,
          startY: startY + 10,
          theme: "grid",
          styles: { fontSize: 9, cellPadding: 3 },
          columnStyles: {
            0: { halign: "center" }, // Serial number
            3: { halign: "center" }, // Quantity
            4: { halign: "center" }, // Condition
            5: { halign: "right" },   // Value
          },
          headStyles: {
            fillColor: [240, 240, 240],
            textColor: 0,
          },
          didDrawPage: (data) => {
            y = data.cursor.y + 15;
          },
        });
        return doc.lastAutoTable.finalY + 15;
      };

      // --- SECTION 2.1: Raw Material Usage ---
      y = addSectionHeader("2.1 Raw Material Usage", y);
      if (formData.rawMaterials?.length) {
        const rawMaterialData = formData.rawMaterials.map((item, index) => [
          index + 1,
          item.itemDescription || "N/A",
          `${item.quantityPerMonth} ${item.unitPerMonth}`,
          item.source === "Local" ? "✓" : "",
          item.source === "Imported" ? "✓" : "",
        ]);
        const rawMaterialHeaders = [["#", "ITEM", "KG. PER MONTH", "LOCAL", "IMPORTED"]];
        y = addTable("Raw Material Usage", rawMaterialHeaders, rawMaterialData, y);
      }

      // --- SECTION 2.2: Machinery ---
      y = addSectionHeader("2.2 Machinery", y);
      if (formData.machineryLists?.length) {
        const machineryData = formData.machineryLists.map((item, index) => [
          index + 1,
          item.machineDescription || "N/A",
          item.horsePower || "N/A",
          item.quantity ?? "N/A",
          item.condition === "Used" ? "✓" : "",
          item.condition === "New" ? "✓" : "",
        ]);
        const machineryHeaders = [["#", "ITEM", "CAPACITY", "QUANTITY", "USED", "NEW"]];
        y = addTable("Machinery", machineryHeaders, machineryData, y);
      }

      // --- SECTION 2.4: Fossil Fuel Consumption ---
      y = addSectionHeader("2.4 Fossil Fuel Consumption", y);
      if (formData.fuelConsumptions?.length) {
        const fuelData = formData.fuelConsumptions.map((item, index) => [
          index + 1,
          item.eqpcd || "N/A",
          item.noeqp || "N/A",
          item.plpermth || "N/A",
          item.dlpermth || "N/A",
          item.fulpermth || "N/A",
          item.klpermth || "N/A",
        ]);
        const fuelHeaders = [["#", "EQUIPMENT", "QTY", "PETROL", "DIESEL", "FURNACE OIL", "KEROSENE OIL"]];
        y = addTable("Fossil Fuel Consumption", fuelHeaders, fuelData, y);
      }

      // --- SECTION 2.5: Chemicals / Fertilizer ---
      y = addSectionHeader("2.5 Chemicals / Fertilizer", y);
      if (formData.chemicalDetails?.length) {
        const chemicalData = formData.chemicalDetails.map((item, index) => [
          index + 1,
          item.chemicalName || "N/A",
          item.chPurpose || "N/A",
          `${item.chQuentity} ${item.chuom}`,
        ]);
        const chemicalHeaders = [["#", "CHEMICAL NAME", "PURPOSE", "QTY / MONTH"]];
        y = addTable("Chemicals / Fertilizer", chemicalHeaders, chemicalData, y);
      }

      // --- Add Page Numbers ---
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
      }

      // Save PDF
      doc.save("Environmental_Examination_Report.pdf");
    })
    .catch((err) => {
      console.error("Failed to load data.json:", err);
    });
};