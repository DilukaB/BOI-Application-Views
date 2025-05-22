import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handleDownloadPDF = (jsonData) => {
  const doc = new jsPDF();
  let currentY = 20;
  const pageHeight = 270;
  let sectionNumber = 1;
  const addSectionHeader = (text, yPosition, sectionNumber) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sectionNumber}. ${text}`, 10, yPosition);
  };
  const addLabelValue = (label, value, yPosition, labelX = 10, valueX = 60) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${label}`, labelX, yPosition);
    doc.setFont('helvetica', 'bold');
    doc.text(`${value}`, valueX, yPosition);
  };
  const ensureSpace = (spaceNeeded = 20) => {
    if (currentY + spaceNeeded > pageHeight) {
      doc.addPage();
      currentY = 20;
    }
  };
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Investor Dashboard', 105, currentY, { align: 'center' });
  currentY += 20;
  // Define the position for values relative to the keys
  const valueXPosition = 42; 
  // Define the left margin
  const leftMargin = 20;
  // --- Investors List Section ---
  ensureSpace(15);
  addSectionHeader('Particulars of Investors', currentY, sectionNumber++);
  currentY += 10;
  jsonData.investors.forEach((inv, index) => {
    ensureSpace(60);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Investor ${index + 1}:`, leftMargin, currentY); // Use leftMargin for labels
    doc.setFont('helvetica', 'normal');
    doc.text(inv.shdname || 'N/A', valueXPosition, currentY); // Normal font for value
    currentY += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Equity Contribution: $${inv.equity}M | ${inv.eqtypct}%`, leftMargin + 120, currentY - 10); // Adjusted x and y
    currentY += 10;
    // Increase the vertical gap here
    currentY += -10;
    // Bold the labels and keep values in normal font
    addLabelValueBoldKey('Citizenship:', inv.citizen || 'N/A', currentY); currentY += 8;
    addLabelValueBoldKey('ID/Passport:', inv.invtidno || 'N/A', currentY); currentY += 8;
    const address = [inv.shdadD1, inv.shdadD2, inv.shdadD3, inv.shdadD4].filter(Boolean).join(', ') || 'N/A';
    addLabelValueBoldKey('Address:', address, currentY); currentY += 10;
    addLabelValueBoldKey('Telephone:', inv.shdtel || '—', currentY); currentY += 8;
    addLabelValueBoldKey('Fax:', inv.shdfax || '—', currentY); currentY += 8;
    addLabelValueBoldKey('Email:', inv.shdeml || '—', currentY); currentY += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Current Business Interests:', leftMargin, currentY); // Use leftMargin
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    const businessLines = doc.splitTextToSize(inv.businessInterest || 'N/A', 180);
    doc.text(businessLines, leftMargin + 5, currentY); // Indent values slightly
    currentY += businessLines.length * 6 + 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Previous BOI Projects:', leftMargin, currentY); // Use leftMargin
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    const projectsLines = doc.splitTextToSize(inv.companyProfile || 'None', 180);
    doc.text(projectsLines, leftMargin + 5, currentY); // Indent values slightly
    currentY += projectsLines.length * 6 + 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Other BOI Interests:', leftMargin, currentY); // Use leftMargin
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    const otherInterestLines = doc.splitTextToSize(inv.interestProj || 'None', 180);
    doc.text(otherInterestLines, leftMargin + 5, currentY); // Indent values slightly
    currentY += otherInterestLines.length * 6 + 12;
  });
  // Helper function to add label-value pairs with bold keys
  function addLabelValueBoldKey(label, value, yPosition) {
    doc.setFont('helvetica', 'bold');
    doc.text(label, leftMargin, yPosition); 
    doc.setFont('helvetica', 'normal');
    doc.text(value, valueXPosition, yPosition); 
  }
  // --- Project Details Section ---
  ensureSpace(30);
  addSectionHeader('Project Details', currentY, sectionNumber++);
  currentY += 10;
  const project = jsonData.projects[0] || {};
  addLabelValue('Project Type:', project.projectType || 'N/A', currentY, leftMargin, valueXPosition); currentY += 10;
  addLabelValue('Description:', project.projectDes || 'N/A', currentY, leftMargin, valueXPosition); currentY += 15;
  // --- Marketing Programme Table Section ---
  ensureSpace(40);
  addSectionHeader('Marketing Programme for One Year', currentY, sectionNumber++);
  currentY += 10;
  autoTable(doc, {
    startY: currentY,
    head: [[
      'Product/Service', 'Unit Measure', 'Exports - QT', 'Exports - VL', 'Exports - %',
      'Local Sales - QT', 'Local Sales - VL', 'Local Sales - %', 'Total QT', 'Total VL'
    ]],
    body: jsonData.products.map((product) => {
      const totalqt = Number(product.expqtymrk) + Number(product.qtylocsle);
      const totalvt = Number(product.expvlumrk) + Number(product.locslevlu);
      return [
        product.prodserv,
        product.unitmeasure,
        product.expqtymrk,
        product.expvlumrk,
        product.exppercentage,
        product.qtylocsle,
        product.locslevlu,
        product.locpercentage,
        totalqt,
        totalvt
      ];
    }),
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    styles: { fontSize: 9, cellPadding: 2 },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 10;
    }
  });
  // --- Manpower Requirements Section ---
  ensureSpace(40);
  addSectionHeader('Manpower Requirements', currentY, sectionNumber++);
  currentY += 10;
  const manpowerBody = jsonData.manpower.map((item) => [
    item.isinicap || 'N/A',
    item.formgr ?? 0,
    item.locmgr ?? 0,
    item.forCLR ?? 0,
    item.locclr ?? 0
  ]);
  const totals = jsonData.manpower.reduce((acc, item) => {
    acc.initialForeign += item.formgr || 0;
    acc.initialLocal += item.locmgr || 0;
    acc.capacityForeign += item.forCLR || 0;
    acc.capacityLocal += item.locclr || 0;
    return acc;
  }, { initialForeign: 0, initialLocal: 0, capacityForeign: 0, capacityLocal: 0 });
  manpowerBody.push([
    'Total',
    totals.initialForeign,
    totals.initialLocal,
    totals.capacityForeign,
    totals.capacityLocal
  ]);
  autoTable(doc, {
    startY: currentY,
    head: [
      [{ content: 'Category', rowSpan: 2 }, { content: 'Initial Requirement', colSpan: 2 }, { content: 'Capacity Requirement', colSpan: 2 }],
      ['Foreign', 'Local', 'Foreign', 'Local']
    ],
    body: manpowerBody,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 50 }, 1: { halign: 'center' }, 2: { halign: 'center' },
      3: { halign: 'center' }, 4: { halign: 'center' }
    },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 10;
    }
  });
  // --- Remittable Liabilities Section ---
  ensureSpace(40);
  addSectionHeader('Remittable Liabilities', currentY, sectionNumber++);
  currentY += 10;
  const remittanceTableBody = jsonData.remittances.map((item) => {
    const total =
      Number(item.rmtramtyR1 || 0) + Number(item.rmtramtyR2 || 0) +
      Number(item.rmtramtyR3 || 0) + Number(item.rmtramtyR4 || 0) +
      Number(item.rmtramtyR5 || 0);
    return [
      item.remitterOrigin || 'N/A',
      item.rmtrort || 'N/A',
      item.rmtrcmp || 'N/A',
      item.rmtrprd || 'N/A',
      item.rmtramtyR1 || 0,
      item.rmtramtyR2 || 0,
      item.rmtramtyR3 || 0,
      item.rmtramtyR4 || 0,
      item.rmtramtyR5 || 0,
      total.toFixed(2)
    ];
  });
  autoTable(doc, {
    startY: currentY,
    head: [[
      'Remitter Origin', 'Remittance Type', 'Company', 'Period',
      'R1', 'R2', 'R3', 'R4', 'R5', 'Total'
    ]],
    body: remittanceTableBody,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: {
      4: { halign: 'right' }, 5: { halign: 'right' }, 6: { halign: 'right' },
      7: { halign: 'right' }, 8: { halign: 'right' }, 9: { halign: 'right', fontStyle: 'bold' }
    },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 10;
    }
  });
  // --- Programme of Implementation Section ---
  ensureSpace(30);
  addSectionHeader('Programme of Implementation', currentY, sectionNumber++);
  currentY += 10;
  const implementationTableBody = jsonData.implementationPrograms.map((item) => [
    item.investorID || 'N/A',
    item.lvlimplcd || 'N/A',
    item.mthaftagr !== undefined ? item.mthaftagr : 'N/A'
  ]);
  autoTable(doc, {
    startY: currentY,
    head: [['Investor ID', 'Activity', 'Months After Agreement']],
    body: implementationTableBody,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: { 2: { halign: 'center' } },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 10;
    }
  });
  // --- Declaration Details Section ---
  ensureSpace(40);
  addSectionHeader('Declaration Details', currentY, sectionNumber++);
  currentY += 10;
  const declarationStatement = `I declare that the information furnished above in this application, attachments, and otherwise represented are true and correct, and I undertake to inform the BOI immediately if there is any change in the information provided.`;
  const declarationLines = doc.splitTextToSize(declarationStatement, 220);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(declarationLines, 15, currentY);
  currentY += declarationLines.length * 6 + 10;
  const declarationBody = (jsonData.declarations || []).map((decl) => [
    decl.investorID || 'N/A',
    decl.cname || 'N/A',
    decl.designation || 'N/A',
    [decl.cadD1, decl.cadD2, decl.cadD3].filter(Boolean).join(', ') || 'N/A',
    decl.ctel || 'N/A',
    decl.cfax || 'N/A',
    decl.ceml || 'N/A'
  ]);
  if (declarationBody.length > 0) {
    autoTable(doc, {
      startY: currentY,
      head: [['Investor ID', 'Name', 'Designation', 'Address', 'Phone', 'Fax', 'Email']],
      body: declarationBody,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: 0 },
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: { 3: { cellWidth: 50 }, 6: { cellWidth: 40 } },
      didDrawPage: (data) => {
        currentY = data.cursor.y + 20;
      }
    });
    declarationBody.forEach((row) => {
      ensureSpace(15);
      doc.setFont('helvetica', 'bold');
      doc.text(`Investor ID: ${row[0]}`, 10, currentY);
      doc.text('Investor Signature: ________________________', 60, currentY);
      doc.text('Date: ____________', 160, currentY);
      currentY += 10;
    });
  }
  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
  }
  doc.save('Investor_Report.pdf');    
};