import React, { useEffect, useState } from "react";
import EnvironmentalExamination from "./components/EnvironmentalExamination"
import EnvironmentalExamination_ii from "./components/EnvironmentalExamination_ii"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper function to draw dotted lines
function drawDottedLine(doc, x1, y1, x2, gap = 2, dotLength = 1) {
  doc.setLineWidth(0.5);
  doc.setDrawColor(150); // Gray color
  for (let x = x1; x < x2; x += gap + dotLength) {
    doc.line(x, y1, x + dotLength, y1);
  }
}

const App = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  const handleDownloadPdf = () => {
  if (!formData) {
    alert("Form data not loaded yet.");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // Helper to check remaining space and add new page if needed
  const ensureNewPageForSection = (requiredHeight = 50) => {
    if (y + requiredHeight > pageHeight - 10) {
      doc.addPage();
      y = 20; // Reset Y position after new page
    }
    return y;
  };

  // Reusable function to add table sections
  const addTable = (title, headers, data, startY, headerFontSize = 12, tableFontSize = 9) => {
    // Ensure enough space for title + some content
    if (startY + 60 > pageHeight) {
      doc.addPage();
      startY = 20;
    }

    doc.setFontSize(headerFontSize);
    doc.text(title, 14, startY);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: startY + 10,
      theme: 'grid',
      styles: {
        fontSize: tableFontSize,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { halign: 'center' }, // Numbering
        1: { halign: 'left' }    // Description
      }
    });

    return doc.lastAutoTable.finalY + 15;
  };

  // -------------------------------
  // COVER PAGE / HEADER
  // -------------------------------
  doc.setFontSize(16);
  doc.text("Facility Inspection Report", 14, y);
  y += 15;

  // -------------------------------
  // SECTION 3.1: Raw Materials
  // -------------------------------
  y = addTable(
    "3.1 Raw - Material Usage",
    ["#", "Item", "Kg Per Month", "Source (Local/Imported)"],
    formData.rawMaterials.map((item, index) => [
      index + 1,
      item.itemDescription,
      `${item.quantityPerMonth} ${item.unitPerMonth}`,
      item.source
    ]),
    y
  );

  // -------------------------------
  // SECTION 3.2: Machinery & Equipment
  // -------------------------------
  y = addTable(
    "3.2 Machinery & Equipment",
    ["#", "Item", "HP", "No. of Items", "Condition (Used/New)"],
    formData.machineryLists.map((machine, index) => [
      index + 1,
      machine.machineDescription,
      machine.horsePower,
      machine.quantity,
      machine.condition
    ]),
    y
  );

  // -------------------------------
  // SECTION 3.4: Water Use
  // -------------------------------
  y = addTable(
    "3.4 Water Use (Ltrs/Day)",
    ["#", "Item", "At Commencement of Production", "At Capacity"],
    formData.waterConsumptions.map((water, index) => [
      index + 1,
      water.useOfWater,
      water.commenceProduction,
      water.waterCapacity
    ]),
    y
  );

  // -------------------------------
  // SECTION 3.5: Waste Products
  // -------------------------------
  y = addTable(
    "3.5 Waste Products",
    ["#", "Nature of Waste", "Treatment", "K.g. per day", "Method for Disposal"],
    formData.solidWasteList.map((waste, index) => [
      index + 1,
      waste.swNature,
      waste.swTreatment,
      waste.swqty,
      waste.swDisMode
    ]),
    y
  );

  // -------------------------------
  // SECTION 3.5 (b): Sewage
  // -------------------------------
  y = addTable(
    "(b) Sewage",
    ["Nature of Effluent", "Treatment", "Method of Disposal"],
    formData.sewageList.map((sewage) => [
      sewage.swNatureOfEffluent,
      sewage.swTreatment,
      sewage.swMethDisposal
    ]),
    y
  );

  // -------------------------------
  // SECTION 4: Electricity Requirements
  // -------------------------------
  y = addTable(
    "4. Electricity Requirements",
    ["#", "Item", "At Commencement of Production", "At Capacity"],
    formData.electricityList.map((electricity, index) => [
      index + 1,
      electricity.erCode,
      electricity.commenceProduction,
      electricity.erCapacity
    ]),
    y
  );

  // -------------------------------
  // SECTION 4: Contact Officers
  // -------------------------------
  y = addTable(
    "4) Contact Officers",
    ["Name", "Address", "Telephone", "Email", "Fax"],
    formData.contactOfficerList.map((officer) => [
      officer.cntname,
      officer.cntAddress,
      officer.cntTel,
      officer.cntEmail,
      officer.cntFax
    ]),
    y
  );

  // -------------------------------
  // SECTION 9: Investors' Declaration & Signature (Starts on New Page)
  // -------------------------------
  ensureNewPageForSection(); // Force new page if needed
  y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : y;

  doc.setFontSize(12);
  doc.text("9) Investors' Declaration & Signature", 14, y);
  y += 10;

  doc.setFontSize(8);
  doc.text(
    "We certify that the proposal constitutes a new project and does not involve the closure of an existing enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka. (Attach letter of authority or power of attorney if applicable)",
    14,
    y,
    { maxWidth: pageWidth - 28 }
  );
  y += 20;

  y = addTable(
    "Investor Details",
    ["Name of Investor", "Tel", "Email", "Fax"],
    formData.declarations.map((declaration) => [
      declaration.cname,
      declaration.ctel,
      declaration.ceml,
      declaration.cfax
    ]),
    y
  );

  // -------------------------------
  // SIGNATURE BLOCK
  // -------------------------------
  doc.setFontSize(10);
  doc.text("Signatures of Investors", 14, y);
  y += 10;

  doc.setFontSize(8);
  doc.text("Alice Fernando", 14, y);
  y += 10;

  // Draw signature line
  drawDottedLine(doc, 14, y, pageWidth - 14);
  doc.text("Signature:", 14, y - 5);
  doc.text("Date:", pageWidth / 2 + 10, y - 5);
  y += 5;

  // Save the PDF
  doc.save("Facility_Inspection_Report.pdf");
};

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <button
        onClick={handleDownloadPdf}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Generate PDF
      </button>
      {/* Your existing components */}
      <EnvironmentalExamination />
      <EnvironmentalExamination_ii />
      <ContactOfficer />
      <InvestorsDeclaration />
    </div>
  );
};

export default App;