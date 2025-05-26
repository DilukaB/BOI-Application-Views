import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import LocationForm from "./components/LocationForm";
import EquipmentTable from "./components/EquipmentTable";
import WaterConsumptionTable from "./components/WaterConsumptionTable";
import FireRisk from "./components/FireRisk";
import ElectricityTable from "./components/ElectricityTable";
import InvestorsDeclaration from "./components/InvestorsDeclaration";
import ContactOfficer from "./components/ContactOfficer";

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

    const doc = new jsPDF("p", "mm", "a4");
    const pageHeight = 270;
    let currentY = 30;
    let sectionNumber = 1;

    const ensureSpace = (spaceNeeded = 10) => {
      if (currentY + spaceNeeded > pageHeight) {
        doc.addPage();
        currentY = 30;
      }
    };

    const addSectionHeader = (text) => {
      ensureSpace(12);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${sectionNumber++}. ${text}`, 14, currentY);
      currentY += 8;
    };

    const addLabelValue = (label, value) => {
    ensureSpace(8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(String(label), 14, currentY); // label should already be a string, but for safety
    doc.setFont("helvetica", "normal");
    doc.text(String(value ?? "N/A"), 60, currentY); // convert value to string
    currentY += 6;
  };


    // Header
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Facility Inspection Report", 105, currentY, null, null, "center");
    doc.setDrawColor(0, 51, 102);
    doc.line(20, currentY + 5, 190, currentY + 5);
    currentY += 15;
    doc.setTextColor(0, 0, 0);

    // Section: Project Location Details
if (formData?.siteLocations?.length > 0) {
  // Add main section header only once
  addSectionHeader("Project Location Details");
  currentY += 4; // Space after main heading

  formData.siteLocations.forEach((site, index) => {
    // Add sub-header for each location
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Location #${index + 1}`, 14, currentY); // e.g. "Location #1"
    doc.setFontSize(10); // Reset font size
    doc.setFont("helvetica", "normal");

    // Add vertical spacing after the subheading
    currentY += 8; // Adjust this value as needed

    const xOffset = 13;

// Address
const address = [site.facadD1, site.facadD2, site.facadD3]
  .filter(Boolean)
  .join(", ");

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Address", 14 + xOffset, currentY);
doc.setFont("helvetica", "normal");
doc.text(address || "N/A", 32 + xOffset, currentY);
currentY += 8;

// Extent of Land
// Extent of Land - Aligned to the right
addLabelValue("Extent of Land (in Acres)", String(site.lndacr || "N/A"), 27, 73);
currentY += 8;

function addLabelValue(label, value, labelX, valueX, y = currentY) {
  doc.setFont("helvetica", "bold");
  doc.text(label, labelX, y);
  doc.setFont("helvetica", "normal");
  doc.text(value || "N/A", valueX, y);
}

// District and DS Division
doc.setFont("helvetica", "bold");
doc.text("District", 14 + xOffset, currentY);
doc.text("DS Division", 50 + xOffset, currentY);
doc.setFont("helvetica", "normal");
doc.text(site.facdistcd || "N/A", 30 + xOffset, currentY);
doc.text(site.facagacd || "N/A", 75 + xOffset, currentY);
currentY += 10;

// Land Procurement Status Notes
doc.setFont("helvetica", "bold");
doc.text("Land Procurement Status", 14 + xOffset, currentY);
currentY += 5;
doc.setFont("helvetica", "normal");
doc.setFontSize(9);

const statusPoints = [
  "If land is procured, submit a copy of the deed.",
  "If a sale agreement is signed, submit a copy of the agreement.",
  "If land is leased, attach the lease document or MOU."
];

statusPoints.forEach((point) => {
  doc.text(`• ${point}`, 16 + xOffset, currentY);
  currentY += 5;
});

currentY += 5;

// Land Ownership
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.text("Land Ownership", 14 + xOffset, currentY);
doc.setFont("helvetica", "normal");

let checkboxX = 60 + xOffset;
const labelX1 = 75 + xOffset,
      labelX2 = 110 + xOffset,
      labelX3 = 145 + xOffset;
const checkboxSize = 5;

// Private
if (site.ownership === "Private") {
  doc.setFillColor(0, 0, 0);
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).fill().stroke();
} else {
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).stroke();
}
doc.text("Private", labelX1, currentY + 4);

// State
checkboxX += 45;
if (site.ownership === "State") {
  doc.setFillColor(0, 0, 0);
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).fill().stroke();
} else {
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).stroke();
}
doc.text("State", labelX2 + 8, currentY + 4);

// Other
checkboxX += 45;
if (site.ownership === "Other") {
  doc.setFillColor(0, 0, 0);
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).fill().stroke();
} else {
  doc.rect(checkboxX, currentY + 1, checkboxSize, checkboxSize).stroke();
}
doc.text("Other", labelX3 + 17, currentY + 4);

if (site.ownership === "Other" && site.ownershipDetails) {
  doc.text(`(${site.ownershipDetails})`, labelX3 + 30, currentY + 4);
}

currentY += 17;

// Covered Space of Buildings
doc.setFont("helvetica", "bold");
doc.text("Covered Space of Buildings (SQ.FT / SQ.M)", 14 + xOffset, currentY);
doc.setFont("helvetica", "normal");
doc.text(`${site.coveredSpace || "N/A"}`, 90 + xOffset, currentY);
currentY += 8;

    // Final padding before next location
    currentY += 18;
  });
}

    // Section 2: Equipment List
if (formData.equipmentList?.length > 0) {
  // Add section header
  addSectionHeader("Equipment (Construction Related)");
  currentY += 2; // Space after header

  // Define table configuration
  autoTable(doc, {
    startY: currentY,
    head: [["Item", "No. of Items", "Condition"]], // Match UI column names
    body: formData.equipmentList.map((e) => [
      e.eqpdes || "N/A", // Item description
      e.eqpqty || "N/A", // Number of items (assuming eqpqty is the field for quantity)
      e.eqpcnd || "N/A", // Condition
    ]),
    theme: "grid",
    styles: { fontSize: 10 }, // Consistent font size
    columnStyles: {
      0: { cellWidth: 60 }, // Adjust width for "Item" column
      1: { cellWidth: 60 }, // Adjust width for "No. of Items" column
      2: { cellWidth: 60 }, // Adjust width for "Condition" column
    },
    margin: { left: 14, right: 14 }, // Optional: Add margins for better alignment
  });
  currentY = doc.lastAutoTable.finalY + 10;
}

    // Section 3: Water Consumption
    if (formData.waterConsumptions?.length > 0) {
      addSectionHeader("Water Consumption");
      autoTable(doc, {
        startY: currentY,
        head: [["Use of Water (Ltrs/day)", "At Commencement of Operation", "At Capacity"]],
        body: formData.waterConsumptions.map((w) => [
          w.useOfWater,
          w.commenceProduction,
          w.waterCapacity,
        ]),
        theme: "grid",
        styles: { fontSize: 10 },
      });
      currentY = doc.lastAutoTable.finalY + 10;
    }

    // Section 4: Fire Risk
    if (formData.fireRiskList?.length > 0) {
      addSectionHeader("Fire Risk Assessment");
      formData.fireRiskList.forEach((f) => {
        ensureSpace(6);
        doc.setFont("helvetica", "normal");
        doc.text(`• ${f.fireRiskDescription}`, 16, currentY);
        currentY += 6;
      });
      currentY += 4;
    }

    // Section 5: Electricity Supply
    if (formData.electricityList?.length > 0) {
      addSectionHeader("Electricity Supply");
      autoTable(doc, {
        startY: currentY,
        head: [["Code", "At Commencement of Operation", " At Capacity"]],
        body: formData.electricityList.map((e) => [
          e.erCode,
          e.commenceProduction,
          e.erCapacity,
        ]),
        theme: "grid",
        styles: { fontSize: 10 },
      });
      currentY = doc.lastAutoTable.finalY + 10;
    }

    // Section 6: Contact Officers
if (formData.contactOfficerList?.length > 0) {
  // Add section header
  addSectionHeader("Contact Officers");
  currentY += 0; // Space after header

  // Define table configuration
  autoTable(doc, {
    startY: currentY,
    head: [["Name", "Address", "Telephone", "Email", "Fax"]],
    body: formData.contactOfficerList.map((c) => [
      c.cntname || "N/A",
      c.cntAddress || "N/A",
      c.cntTel || "N/A",
      c.cntEmail || "N/A",
      c.cntFax || "N/A",
    ]),
    theme: "grid",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 40 }, // Name
      1: { cellWidth: 40 }, // Address
      2: { cellWidth: 40 }, // Telephone
      3: { cellWidth: 40 }, // Email
      4: { cellWidth: 20 }, // Fax
    },
    margin: { left: 14, right: 14 },
    headStyles: {
      textColor: [255, 255, 255], // White text
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray rows
    },
  });
  // Update Y position after table
  currentY = doc.lastAutoTable.finalY + 10;
}

  // Helper function to draw dotted lines
function drawDottedLine(doc, x1, y1, x2, gap = 2, dotLength = 1) {
  doc.setLineWidth(0.5);
  doc.setDrawColor(150); // Gray color
  for (let x = x1; x < x2; x += gap + dotLength) {
    doc.line(x, y1, x + dotLength, y1);
  }
}

// Section 9: Investors' Declaration & Signature
if (formData.declarations && formData.declarations.length > 0) {
  // Add new page and reset Y position
  doc.addPage();
  currentY = 30;

  // Section header
  addSectionHeader("Investors' Declaration & Signature");
  currentY += 8;

  // Declaration paragraph
  const declarationText =
    "We certify that the proposal constitutes a new project and does not involve the closure of an existing enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka. (Attach letter of authority or power of attorney if applicable)";
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Wrap long text automatically
  const splitDeclaration = doc.splitTextToSize(declarationText, 170);
  splitDeclaration.forEach((line) => {
    doc.text(line, 14, currentY);
    currentY += 6;
  });
  currentY += 10; // Space after declaration

  // Investor Details Table
  autoTable(doc, {
    startY: currentY,
    head: [["Name of Investor", "Tel", "Email", "Fax"]],
    body: formData.declarations.map((d) => [
      d.cname || "N/A",
      d.ctel || "N/A",
      d.ceml || "N/A",
      d.cfax || "N/A",
    ]),
    theme: "grid",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 45 }, // Name
      1: { cellWidth: 45 }, // Tel
      2: { cellWidth: 45 }, // Email
      3: { cellWidth: 45 }, // Fax
    },
    margin: { left: 14, right: 14 },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray rows
    },
  });

  // Update Y position after table
  currentY = doc.lastAutoTable.finalY + 10;

  // Signatures Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Signatures of Investors", 14, currentY);
  currentY += 8;

  // Signature lines
  formData.declarations.forEach((d) => {
    doc.setFont("helvetica", "normal");
    doc.text(d.cname || "N/A", 14, currentY); // Investor name
    currentY += 10;

    // Signature line
    drawDottedLine(doc, 14, currentY, 90);
    doc.text("Signature:", 14, currentY - 2);
    currentY += 7;

    // Date line
    drawDottedLine(doc, 14, currentY, 90);
    doc.text("Date:", 14, currentY - 2);
    currentY += 12;
  });
}

    // Save PDF
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

      <LocationForm />
      <EquipmentTable />
      <WaterConsumptionTable />
      <FireRisk />
      <ElectricityTable />
      <ContactOfficer />
      <InvestorsDeclaration />
    </div>
  );
};

export default App;
