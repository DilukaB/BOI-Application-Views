import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const handleDownloadPDF = (formData) => {
  const doc = new jsPDF();
  const margin = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  const sectionFontSize = 12;
  const bodyFontSize = 10;
  let sectionNumber = 1;

  // --- Utility Functions ---
  const ensureNewPageForSection = (requiredSpace = 40) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
  };

  const addLabelValueBoldKey = (label, value, yPosition) => {
    const labelX = margin;
    const valueX = margin + 80;
    doc.setFont("helvetica", "bold");
    doc.text(label, labelX, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(value || "N/A", valueX, yPosition);
  };

  const addSectionHeader = (text, yPosition, sectionNumber) => {
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text(`${sectionNumber}. ${text}`, margin, yPosition);
    return yPosition + 15;
  };

  const drawXInBox = (x, y, size) => {
    doc.line(x + 1, y + 1, x + size - 1, y + size - 1);
    doc.line(x + size - 1, y + 1, x + 1, y + size - 1);
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
        5: { halign: "right" }    // Value
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

  // --- SECTION 1: Site Locations ---
  ensureNewPageForSection(100);
  if (formData.siteLocations?.length) {
    y = addSectionHeader("Site Locations", y, sectionNumber++);
    formData.siteLocations.forEach((loc, index) => {
      ensureNewPageForSection(100);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(sectionFontSize);
      doc.text(`Location #${index + 1}`, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(bodyFontSize);
      y += 15;

      addLabelValueBoldKey("Address", loc.facadD1 || "N/A", y); y += 10;
      addLabelValueBoldKey("District", loc.facdistcd || "N/A", y); y += 10;
      addLabelValueBoldKey("Local Gov. Authority", "N/A", y); y += 10;

      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.text("Land Ownership", margin, y); y += 8;
      const checkboxSize = 6;
      const checkboxMarginRight = 10;

      doc.text("Private", margin, y);
      doc.rect(margin + 80 + checkboxMarginRight, y - 2, checkboxSize, checkboxSize);
      if (loc.ownership === "Private") drawXInBox(margin + 80 + checkboxMarginRight, y - 2, checkboxSize);
      y += 8;

      doc.text("State", margin, y);
      doc.rect(margin + 80 + checkboxMarginRight, y - 2, checkboxSize, checkboxSize);
      if (loc.ownership === "State") drawXInBox(margin + 80 + checkboxMarginRight, y - 2, checkboxSize);
      y += 10;

      doc.text("Extent of Land Required", margin, y); y += 8;
      doc.text("A:", margin, y); doc.text(loc.lndacr || "N/A", margin + 80, y); y += 6;
      doc.text("R:", margin, y); doc.text(loc.lndrood || "N/A", margin + 80, y); y += 6;
      doc.text("P:", margin, y); doc.text(loc.lndpurch || "N/A", margin + 80, y); y += 10;

      doc.text("Covered Space (sq.ft / sq.m)", margin, y); y += 8;
      doc.text(loc.coveredSpace || "N/A", margin, y); y += 15;

      if (index < formData.siteLocations.length - 1) {
        doc.addPage();
        y = 20;
      }
    });
  }

  // --- SECTION 2: Machinery & Equipment ---
  ensureNewPageForSection(60);
  if (formData.machineryLists?.length) {
    const machineryData = formData.machineryLists.map((item, index) => [
      index + 1,
      item.machineDescription || "N/A",
      item.horsePower || "N/A",
      item.quantity ?? "N/A",
      item.condition || "N/A"
    ]);
    const machineryHeaders = [["#", "DESCRIPTION", "HORSE POWER", "QUANTITY", "CONDITION"]];
    y = addTable("2. Machinery & Equipment", machineryHeaders, machineryData, y);
  }

  // --- SECTION 3: Environmental Examination ---
  ensureNewPageForSection(60);
  if (formData.chemicalDetails?.length || formData.waterConsumptions?.length) {
    y = addSectionHeader("Environmental Examination", y, sectionNumber++);
    doc.setTextColor(100);
    doc.text("(Please see Annexure II)", margin, y);
    doc.setTextColor(0);
    y += 10;

    // 3.1 Chemicals
    if (formData.chemicalDetails?.length) {
      ensureNewPageForSection(40);
      doc.text("3.1 Chemicals", margin, y); y += 15;
      const chemicalData = formData.chemicalDetails.map((item, index) => [
        index + 1,
        item.chemicalName || "N/A",
        item.chPurpose || "N/A",
        `${item.chQuentity || "N/A"} L`,
      ]);
      const chemicalHeaders = [["#", "CHEMICAL NAME", "PURPOSE", "QTY./MONTH"]];
      y = addTable("Chemicals", chemicalHeaders, chemicalData, y);
      doc.setTextColor(100);
      y = addWrappedText("Note: Include all chemicals, even if used in small quantities.", margin, y);
      doc.setTextColor(0);
      y += 10;
    }

    // 3.2 Water Use
    if (formData.waterConsumptions?.length) {
      ensureNewPageForSection(40);
      doc.text("3.2 Water Use (Liters/day)", margin, y); y += 15;
      const waterData = formData.waterConsumptions.map((item, index) => [
        item.useOfWater || "N/A",
        item.commenceProduction || "N/A",
        item.waterCapacity || "N/A",
      ]);
      const waterHeaders = [["USE OF WATER", "AT COMMENCEMENT OF PRODUCTION", "AT CAPACITY"]];
      y = addTable("Water Use", waterHeaders, waterData, y);
    }
  }

  // --- SECTION 4: Electricity Requirements ---
  ensureNewPageForSection(60);
  if (formData.electricityList?.length) {
    const electricityData = formData.electricityList.map((item, index) => [
      index + 1,
      item.erCode || "N/A",
      item.commenceProduction || "N/A",
      item.erCapacity || "N/A",
    ]);
    const electricityHeaders = [["#", "USAGE PHASE", "AT COMMENCEMENT / PRODUCTION", "AT CAPACITY"]];
    y = addTable("4. Electricity Requirements", electricityHeaders, electricityData, y);
  }

  // --- SECTION 5: Noise & Vibration ---
  ensureNewPageForSection(60);
  if (formData.noiseList?.length || formData.hazardousList?.length || formData.fireRiskList?.length) {
    y = addSectionHeader("Noise & Vibration", y, sectionNumber++);

    // 5.5.1 Noise Sources
    if (formData.noiseList?.length) {
      doc.setFontSize(bodyFontSize);
      doc.text("5.5.1 High intensity noise and/or vibration generating machinery / equipment", margin, y);
      y += 8;
      formData.noiseList.forEach((item, index) => {
        item.niceDescription.forEach((desc, idx) => {
          doc.text(`${index + 1}.${idx + 1}. ${desc.description || "N/A"}`, margin, y);
          y += 6;
        });
      });
      y += 10;
    }

    // 5.5.2 Mitigation Methods
    if (formData.hazardousList?.length) {
      doc.setFontSize(bodyFontSize);
      doc.text("5.5.2 Methodology proposed for mitigation", margin, y);
      y += 8;
      formData.hazardousList.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.hazardousDes || "N/A"}`, margin, y);
        y += 6;
      });
      y += 10;
    }

    // 5.5.3 Fire Control Plan
    if (formData.fireRiskList?.length) {
      doc.setFontSize(bodyFontSize);
      doc.text("5.5.3 Plan for controlling fire", margin, y);
      y += 8;
      formData.fireRiskList.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.fireRiskDescription || "N/A"}`, margin, y);
        y += 6;
      });
      y += 10;
    }
  }

  // --- SECTION 6: Solid Waste Details ---
  if (formData.solidWasteList?.length) {
    const solidWasteData = formData.solidWasteList.map((item, index) => [
      index + 1,
      item.swNature || "N/A",
      `${item.swqty || "N/A"} kg/day`,
      item.swTreatment || "N/A",
      item.swDisMode || "N/A",
    ]);
    const solidWasteHeaders = [["S.NO", "NATURE OF SOLID WASTE", "QUANTITY (KG/DAY)", "TREATMENT METHOD", "METHOD FOR DISPOSAL"]];
    y = addTable("6. Solid Waste Details", solidWasteHeaders, solidWasteData, y);
    doc.setTextColor(100);
    y = addWrappedText("Note: Include details about biodegradable and non-biodegradable waste if applicable.", margin, y);
    doc.setTextColor(0);
    y += 10;
  }

  // --- SECTION 7: Sewage / Effluent Details ---
  if (formData.sewageList?.length) {
    const sewageData = formData.sewageList.map((item, index) => [
      index + 1,
      item.swNatureOfEffluent || "N/A",
      item.swTreatment || "N/A",
      item.swMethDisposal || "N/A",
    ]);
    const sewageHeaders = [["S.NO", "NATURE OF EFFLUENT", "TREATMENT", "METHOD OF DISPOSAL"]];
    y = addTable("7. Sewage / Effluent Details", sewageHeaders, sewageData, y);
    doc.setTextColor(100);
    y = addWrappedText("Note: Ensure the disposal method complies with local environmental regulations.", margin, y);
    doc.setTextColor(0);
    y += 10;
  }

  // --- SECTION 8: Contact Officers ---
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
    y = addTable("8. Contact Officers", contactHeaders, contactData, y);
  }

  // --- SECTION 9: Investors' Declaration ---
  ensureNewPageForSection(100);
  if (formData.declarations?.length) {
    y = addSectionHeader("Investors' Declaration", y, sectionNumber++);
    const declarationText =
      "We certify that the proposal constitutes a new project and does not involve the closure of an existing enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka.";
    y = addWrappedText(declarationText, margin, y);
    doc.setFont("helvetica", "italic");
    y = addWrappedText("(Attach letter of authority or power of attorney if applicable)", margin, y);
    doc.setFont("helvetica", "normal");

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

  // Save the final PDF
  doc.save("Facility_Inspection_Report.pdf");
};