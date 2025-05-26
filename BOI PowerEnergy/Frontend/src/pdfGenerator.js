import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handleDownloadPDF = (formData) => {
  const doc = new jsPDF();
  const margin = 14;

    let currentY = 20;
  const pageHeight = 270;
  
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  let sectionNumber = 1; // To keep track of section numbers
  const sectionFontSize = 12;
  const bodyFontSize = 10;

  const ensureNewPageForSection = (requiredSpace = 40) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
  };

  // --- Helper Functions ---
  const addSectionHeader = (text, yPosition, sectionNumber) => {
    doc.setFontSize(sectionFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sectionNumber}. ${text}`, margin, yPosition);
  };

  const addLabelValueBoldKey = (label, value, yPosition) => {
    const labelX = margin;
    const valueX = margin + 80;
    doc.setFont('helvetica', 'bold');
    doc.text(label, labelX, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(value || 'N/A', valueX, yPosition);
  };

  // SECTION: Site Locations
  if (formData.siteLocations?.length) {
    formData.siteLocations.forEach((loc, index) => {
      ensureNewPageForSection(100);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(sectionFontSize);
      doc.text(`Location #${index + 1}`, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(bodyFontSize);
      y += 15;
      doc.text("Address", margin, y);
      doc.text(loc.facadD1 || "N/A", margin + 80, y);
      y += 10;
      doc.text("District", margin, y);
      doc.text(loc.facdistcd || "N/A", margin + 80, y);
      y += 10;
      doc.text("Local Gov. Authority", margin, y);
      doc.text("N/A", margin + 80, y);
      y += 10;
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;
      doc.text("Land Ownership", margin, y);
      y += 8;
      const checkboxSize = 6;
      const checkboxMarginRight = 10;
      doc.text("Private", margin, y);
      doc.rect(margin + 80 + checkboxMarginRight, y - 2, checkboxSize, checkboxSize);
      if (loc.ownership === "Private") {
        doc.line(
          margin + 80 + checkboxMarginRight + 1,
          y - 1,
          margin + 80 + checkboxMarginRight + 5,
          y + 3
        );
        doc.line(
          margin + 80 + checkboxMarginRight + 5,
          y - 1,
          margin + 80 + checkboxMarginRight + 1,
          y + 3
        );
      }
      y += 8;
      doc.text("State", margin, y);
      doc.rect(margin + 80 + checkboxMarginRight, y - 2, checkboxSize, checkboxSize);
      if (loc.ownership === "State") {
        doc.line(
          margin + 80 + checkboxMarginRight + 1,
          y - 1,
          margin + 80 + checkboxMarginRight + 5,
          y + 3
        );
        doc.line(
          margin + 80 + checkboxMarginRight + 5,
          y - 1,
          margin + 80 + checkboxMarginRight + 1,
          y + 3
        );
      }
      y += 10;
      doc.text("Extent of Land Required", margin, y);
      y += 8;
      doc.text("A:", margin, y);
      doc.text(`${loc.lndacr || "N/A"}`, margin + 80, y);
      y += 6;
      doc.text("R:", margin, y);
      doc.text(`${loc.lndrood || "N/A"}`, margin + 80, y);
      y += 6;
      doc.text("P:", margin, y);
      doc.text(`${loc.lndpurch || "N/A"}`, margin + 80, y);
      y += 10;
      doc.text("Covered Space (sq.ft / sq.m)", margin, y);
      y += 8;
      doc.text(loc.coveredSpace || "N/A", margin, y);
      y += 15;
      if (index < formData.siteLocations.length - 1) {
        doc.addPage();
        y = 20;
      }
    });
  }

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
      0: { halign: "center" }, // Center-align the first column (#)
      1: { halign: "left" }, // Left-align EQUIPMENT
      2: { halign: "center" }, // Center-align CAPACITY
      3: { halign: "center" }, // Center-align QTY.
      4: { halign: "center" }, // Center-align PETROL
      5: { halign: "center" }, // Center-align DIESEL
      6: { halign: "center" }, // Center-align FURNACE OIL
      7: { halign: "center" }, // Center-align KEROSENE OIL
      8: { halign: "center" }, // Center-align BIOMASS
    },
    headStyles: {
      fillColor: [240, 240, 240], // Light gray background for headers
      textColor: 0, // Black text for headers
    },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 15; // Adjust vertical spacing after table
    },
  });
  return doc.lastAutoTable.finalY + 15; // Return the final Y position
};

const addWrappedText = (text, x, startY, lineHeight = 7) => {
  let currentY = startY;
  const wrapped = doc.splitTextToSize(text, pageWidth - 2 * margin);
  wrapped.forEach((line) => {
    if (currentY + 10 > pageHeight - margin) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(line, x, currentY);
    currentY += lineHeight;
  });
  return currentY;
};

// SECTION: Fossil Fuel Consumption
ensureNewPageForSection(60);
if (formData.fuelConsumptions?.length) {
  const fuelData = formData.fuelConsumptions.map((item, index) => [
    index + 1,
    item.eqpcd || "N/A",
    item.capacity || "No Data",
    item.noeqp ?? "No Data",
    item.plpermth ?? "No Data",
    item.dlpermth ?? "No Data",
    item.fulpermth ?? "No Data",
    item.klpermth ?? "No Data",
    item.biomas ?? "No Data",
  ]);

  const fuelHeaders = [
    ["#", "EQUIPMENT", "CAPACITY", "QTY.", "PETROL", "DIESEL", "FURNACE OIL", "KEROSENE OIL", "BIOMASS"],
  ];

  y = addTable("3. Fossil Fuel Consumption (Ltrs/month)", fuelHeaders, fuelData, y);

  // Add note
  doc.setTextColor(100); // Light gray color for the note
  y = addWrappedText(
    "Note: Specify other fuel types if applicable and include consumption estimates.",
    margin,
    y
  );
  doc.setTextColor(0); // Reset text color to black
  y += 10;
}

// SECTION: Water Use
ensureNewPageForSection(60);
if (formData.waterConsumptions?.length) {
  const waterData = formData.waterConsumptions.map((item, index) => [
    index + 1,
    item.useOfWater || "N/A",
    item.commenceProduction || "No Data",
    item.waterCapacity || "No Data",
  ]);
  const waterHeaders = [["#", "TYPE OF USE", "AT COMMENCEMENT / PRODUCTION", "AT CAPACITY"]];
  y = addTable("4. Water Use (If applicable) – Ltrs/day", waterHeaders, waterData, y);

  doc.setTextColor(100); // Gray color for note
  y = addWrappedText(
    "Note: Please include all sources and anticipated changes based on capacity.",
    margin,
    y
  );
  doc.setTextColor(0); // Reset to black
  y += 10;
}

// SECTION: Environmental Examination
ensureNewPageForSection(60);
if (
  formData.wasteWaterList?.length ||
  formData.solidWasteList?.length ||
  formData.airEmissionsDetails?.length ||
  formData.sewageList?.length ||
  formData.noiseList?.length ||
  formData.electricityList?.length
) {
  doc.setFontSize(sectionFontSize);
  doc.text("5. Environmental Examination", margin, y);
  y += 15;

  // --- Waste Water Management ---
  if (formData.wasteWaterList?.length) {
    const wasteWaterData = formData.wasteWaterList.map((item, index) => [
      index + 1,
      item.wwsno || "N/A",
      item.wwVolume || "No Data",
      item.wwTreatment || "No Data",
      item.wwDisposalMode || "No Data",
    ]);
    const wasteWaterHeaders = [
      ["#", "SOURCE OF WASTE WATER", "VOLUME (Ltrs/day)", "TREATMENT METHOD", "DISPOSAL MODE"],
    ];
    y = addTable("a) Waste Water Management", wasteWaterHeaders, wasteWaterData, y);
  }

  // --- Solid Waste Management ---
  if (formData.solidWasteList?.length) {
    const solidWasteData = formData.solidWasteList.map((item, index) => [
      index + 1,
      item.swsno || "N/A",
      item.swNature || "N/A",
      item.swqty || "No Data",
      item.swTreatment || "No Data",
      item.swDisMode || "No Data",
    ]);
    const solidWasteHeaders = [
      ["#", "SOURCE OF SOLID WASTE", "NATURE OF WASTE", "QUANTITY (kg/day)", "TREATMENT METHOD", "DISPOSAL MODE"],
    ];
    y = addTable("b) Solid Waste Management", solidWasteHeaders, solidWasteData, y);
  }

  // --- Air Emissions Control ---
  if (formData.airEmissionsDetails?.length) {
    const airEmissionsData = formData.airEmissionsDetails.map((item, index) => [
      index + 1,
      item.aEenvisagedSQNO || "N/A",
      item.aeMethodologyControl || "No Data",
    ]);
    const airEmissionsHeaders = [["#", "ENVISAGED AIR EMISSION SOURCE", "CONTROL METHODOLOGY"]];
    y = addTable("c) Air Emissions Control", airEmissionsHeaders, airEmissionsData, y);
  }

  // --- Sewage Treatment and Disposal ---
  if (formData.sewageList?.length) {
    const sewageData = formData.sewageList.map((item, index) => [
      index + 1,
      item.swNatureOfEffluent || "N/A",
      item.swTreatment || "No Data",
      item.swMethDisposal || "No Data",
    ]);
    const sewageHeaders = [["#", "NATURE OF SEWAGE EFFLUENT", "TREATMENT METHOD", "DISPOSAL MODE"]];
    y = addTable("d) Sewage Treatment and Disposal", sewageHeaders, sewageData, y);
  }

  // SECTION: Noise & Vibration
ensureNewPageForSection(60);
if (formData.noiseList?.length || formData.mitigationMeasures?.length || formData.fireControlPlan?.length) {
  doc.setFontSize(sectionFontSize);
  doc.text("5.5 Noise / Vibration", margin, y);
  y += 15;

  // 5.5.1 High intensity noise and/or vibration generating machinery/equipment
  if (formData.noiseList?.length) {
    formData.noiseList.forEach((item, index) => {
      const noiseCode = item.noiseCode;
      const descriptions = item.niceDescription.map(desc => desc.description);

      switch (noiseCode) {
        case "5.5.1":
          doc.setFontSize(bodyFontSize);
          doc.setTextColor(100); // Light blue color for sub-section title
          doc.text(`${noiseCode} – High intensity noise and/or vibration generating machinery/equipment`, margin, y);
          y += 8;
          descriptions.forEach((desc, idx) => {
            doc.setFontSize(bodyFontSize);
            doc.text(`${idx + 1}. ${desc}`, margin, y);
            y += 6;
          });
          y += 10;
          break;

        case "5.5.2":
          doc.setFontSize(bodyFontSize);
          doc.setTextColor(100); // Light blue color for sub-section title
          doc.text(`${noiseCode} – Methodology proposed for mitigation`, margin, y);
          y += 8;
          descriptions.forEach((desc, idx) => {
            doc.setFontSize(bodyFontSize);
            doc.text(`${idx + 1}. ${desc}`, margin, y);
            y += 6;
          });
          y += 10;
          break;

        case "5.5.3":
          doc.setFontSize(bodyFontSize);
          doc.setTextColor(100); // Light blue color for sub-section title
          doc.text(`${noiseCode} – Plan for controlling fire`, margin, y);
          y += 8;
          descriptions.forEach((desc, idx) => {
            doc.setFontSize(bodyFontSize);
            doc.text(`${idx + 1}. ${desc}`, margin, y);
            y += 6;
          });
          y += 10;
          break;
      }
    });
  }
}

  // --- Electricity Usage ---
  if (formData.electricityList?.length) {
    const electricityData = formData.electricityList.map((item, index) => [
      index + 1,
      item.erCode || "N/A",
      item.commenceProduction || "No Data",
      item.erCapacity || "No Data",
    ]);
    const electricityHeaders = [["#", "ELECTRICITY USAGE PHASE", "AT COMMENCEMENT / PRODUCTION", "AT CAPACITY"]];
    y = addTable("f) Electricity Usage", electricityHeaders, electricityData, y);
  }
}

    // SECTION: Contact Officers
ensureNewPageForSection(60);
if (formData.contactOfficerList?.length) {
  const contactData = formData.contactOfficerList.map((item, index) => [
    index + 1,
    item.cntname || "N/A",
    item.cntAddress || "N/A",
    item.cntTel || "N/A",
    item.cntEmail || "N/A",
    item.cntFax || "N/A",
  ]);
  const contactHeaders = [["#", "NAME", "ADDRESS", "TELEPHONE", "EMAIL", "FAX"]];
  y = addTable("6. Contact Officers", contactHeaders, contactData, y);
}

// SECTION: Investors and Declaration
ensureNewPageForSection(100);
if (formData.declarations?.length) {
  doc.setFontSize(sectionFontSize);
  doc.text("7. Investors' Declaration", margin, y);
  y += 15;

  const declarationText =
    "We certify that the proposal constitutes a new project and does not involve the closure of an existing enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka.";
  y = addWrappedText(declarationText, margin, y);

  doc.setFont("helvetica", "italic");
  y = addWrappedText("(Attach letter of authority or power of attorney if applicable)", margin, y);
  doc.setFont("helvetica", "normal");

  // Investor Details Table
  const investorData = formData.declarations.map((item, index) => [
    index + 1,
    item.cname || "N/A",
    item.ctel || "N/A",
    item.ceml || "N/A",
    item.cfax || "N/A",
  ]);
  const investorHeaders = [["#", "Name of Investor", "Tel", "Email", "Fax"]];
  y = addTable("Investors' Details", investorHeaders, investorData, y);

  y += 10;
  doc.setFontSize(sectionFontSize);
  doc.text("Signatures of Investors", margin, y);
  y += 10;

  formData.declarations.forEach((item, index) => {
    const name = item.cname || "N/A";
    const startX = margin;
    const endX = pageWidth - margin;
    const currentY = y + 5;

    doc.setLineDash([2, 2]);
    doc.line(startX, currentY, endX, currentY);
    doc.text(`${index + 1}. ${name} Signature:`, startX, y);
    doc.text("Date:", endX - 40, y);
    y += 15;
  });

  doc.setLineDash([]); // Reset line style
}

// Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
  }

  // Save PDF
  doc.save("EIA_Location_Details.pdf");
};