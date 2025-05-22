import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdf = (locationsData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const PAGE_MARGIN_LEFT = 14;
  const PAGE_MARGIN_RIGHT = 14;
  const PAGE_MARGIN_TOP = 20;
  const PAGE_MARGIN_BOTTOM = 20;
  let y = PAGE_MARGIN_TOP;

  // COVER PAGE
  doc.setFontSize(24);
  doc.setTextColor(40, 40, 40);
  doc.text('Board of Investment of Sri Lanka', pageWidth / 2, y + 30, { align: 'center' });

  doc.setFontSize(20);
  doc.text('Project Report', pageWidth / 2, y + 50, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString();
  doc.text(`Date: ${today}`, pageWidth / 2, y + 80, { align: 'center' });

  doc.addPage();
  y = PAGE_MARGIN_TOP;

  const addHeaderFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('Board of Investment of Sri Lanka', PAGE_MARGIN_LEFT, 10);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
    }
  };

  const ensureSpace = (neededHeight) => {
    if (y + neededHeight > pageHeight - PAGE_MARGIN_BOTTOM) {
      doc.addPage();
      y = PAGE_MARGIN_TOP;
    }
  };

  const addTable = (title, columns, rows) => {
    const titleFontSize = 14;
    const tableFontSize = 8;

    if (y !== PAGE_MARGIN_TOP) y += 10;

    ensureSpace(titleFontSize + 6);
    doc.setFontSize(titleFontSize);
    doc.setTextColor(22, 160, 133);
    doc.text(title, PAGE_MARGIN_LEFT, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [columns],
      body: rows,
      styles: { fontSize: tableFontSize, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133] },
      theme: 'striped',
      margin: { left: PAGE_MARGIN_LEFT, right: PAGE_MARGIN_RIGHT },
      didDrawPage: (data) => {
        y = data.cursor.y + 10;
      },
      pageBreak: 'auto',
      showHead: 'everyPage',
    });
  };

  if (!locationsData) {
    doc.text('No data available', PAGE_MARGIN_LEFT, y);
    doc.save('project_report.pdf');
    return;
  }

  // 1.0 Site Locations
  if (locationsData.siteLocations?.length) {
    addTable(
      '1.0 Site Locations',
      ['Address Line 1', 'Address Line 2', 'Address Line 3', 'Telephone', 'Fax', 'Email', 'Ownership', 'Number of Units', 'Covered Space', 'Existing Buildings'],
      locationsData.siteLocations.map(loc => [
        loc.facadD1 || '', loc.facadD2 || '', loc.facadD3 || '',
        loc.factel || '', loc.facfax || '', loc.faceml || '',
        loc.ownership || '', loc.numberOfUnits || '', loc.coveredSpace || '', loc.existingBuildings || ''
      ])
    );
  }

  // 2.0 Equipment List
  if (locationsData.equipmentList?.length) {
    addTable(
      '2.0 Equipment List',
      ['Description', 'Condition', 'Power', 'Capacity', 'Value'],
      locationsData.equipmentList.map(eq => [
        eq.eqpdes || '', eq.eqpcnd || '', eq.eqppwr || '', eq.eqpcap || '', eq.equval?.toString() || ''
      ])
    );
  }

  // 3.0 Water Consumption
  if (locationsData.waterConsumptions?.length) {
    addTable(
      '3.0 Water Consumption',
      ['Use of Water', 'Commence Production', 'Water Capacity'],
      locationsData.waterConsumptions.map(w => [
        w.useOfWater || '', w.commenceProduction?.toString() || '', w.waterCapacity?.toString() || ''
      ])
    );
  }

  // 4.3 Sewage
  if (locationsData.sewageList?.length) {
    addTable(
      '4.3 Sewage',
      ['Nature of Effluent', 'Treatment', 'Method of Disposal'],
      locationsData.sewageList.map(sw => [
        sw.swNatureOfEffluent || '', sw.swTreatment || '', sw.swMethDisposal || ''
      ])
    );
  }

  // 4.4 Noise/Vibration
  if (locationsData.noiseList?.length) {
    const noiseRows = [];
    locationsData.noiseList.forEach(n => {
      n.niceDescription.forEach(desc => {
        noiseRows.push([n.noiseCode || '', desc.description || '']);
      });
    });
    addTable('4.4 Noise/Vibration - Construction Equipment', ['Noise Code', 'Description'], noiseRows);
  }

  // 4.5 Hazardous Materials
  if (locationsData.hazardousList?.length) {
    addTable(
      '4.5 Hazardous Materials',
      ['Hazardous Description'],
      locationsData.hazardousList.map(h => [h.hazardousDes || ''])
    );
  }

  // 4.6 Fire Risk
  if (locationsData.fireRiskList?.length) {
    addTable(
      '4.6 Fire Risk',
      ['Fire Risk Description'],
      locationsData.fireRiskList.map(f => [f.fireRiskDescription || ''])
    );
  }

  // 5.0 Electricity List
  if (locationsData.electricityList?.length) {
    addTable(
      '5.0 Electricity Requirement',
      ['Period', 'Commence Production', 'Capacity'],
      locationsData.electricityList.map(el => [
        el.erCode || '', el.commenceProduction?.toString() || '', el.erCapacity?.toString() || ''
      ])
    );
  }

  // 6.0 Contact Officers
  if (locationsData.contactOfficerList?.length) {
    addTable(
      '6.0 Contact Officers',
      ['Name', 'Address', 'Telephone', 'Email', 'Fax'],
      locationsData.contactOfficerList.map(c => [
        c.cntname || '', c.cntAddress || '', c.cntTel || '', c.cntEmail || '', c.cntFax || ''
      ])
    );
  }

  // 7.0 Investors with Signatures
  if (locationsData.investorList?.length) {
    addTable(
      '7.0 Investors',
      ['Name', 'Telephone', 'Email', 'Fax'],
      locationsData.investorList.map(inv => [
        inv.invName || '', inv.invTel || '', inv.invEmail || '', inv.invFax || ''
      ])
    );

    locationsData.investorList.forEach((inv) => {
      ensureSpace(30);
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Investor: ${inv.invName || 'N/A'}`, PAGE_MARGIN_LEFT, y);
      y += 8;

      doc.setFontSize(10);
      doc.text('Signature of Investor:', PAGE_MARGIN_LEFT, y);
      doc.line(60, y, pageWidth - PAGE_MARGIN_RIGHT, y);
      y += 10;

      doc.text('Date:', PAGE_MARGIN_LEFT, y);
      doc.line(60, y, pageWidth - PAGE_MARGIN_RIGHT, y);
      y += 15;
    });
  }

  // SUMMARY PAGE
  doc.addPage();
  y = PAGE_MARGIN_TOP;

  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Summary', PAGE_MARGIN_LEFT, y);
  y += 10;

  doc.setFontSize(12);
  const summaryText = `
This document summarizes the key details of the proposed investment project submitted to the
Board of Investment of Sri Lanka. It includes site location details, equipment lists, utility
requirements, contact information, and investor declarations.

The data provided herein will be used for investment assessment, infrastructure planning, and
regulatory approvals. All investors are responsible for the accuracy of the provided data.

Thank you for your cooperation.
  `;

  const summaryLines = doc.splitTextToSize(summaryText.trim(), pageWidth - PAGE_MARGIN_LEFT - PAGE_MARGIN_RIGHT);
  doc.text(summaryLines, PAGE_MARGIN_LEFT, y);

  addHeaderFooter();
  doc.save('project_report.pdf');
};