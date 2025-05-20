 import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import InvestorsList from './components/InvestorsList';
import ProjectDetails from './components/ProjectDetails';
import ProductsTable from './components/ProductsTable';
import InvestmentTable from './components/InvestmentTable';
import ManpowerStats from './components/ManpowerStats';
import RemittanceDetails from './components/RemittanceDetails';
import ImplementationPrograms from './components/ImplementationPrograms';
import ContactDetails from './components/ContactDetails';
import DeclarationDetails from './components/DeclarationDetails';
import Proposed_Financing from './components/Proposed_Financing';

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded jsonData:", data);
        setJsonData(data);
      })
      .catch((error) => {
        console.error('Failed to load data.json:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
    if (!jsonData) return;

    const doc = new jsPDF();
    let currentY = 20;
    const pageHeight = doc.internal.pageSize.height;
    let sectionNumber = 1;

    const addSectionHeader = (title, yPos, number) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${number}. ${title}`, 10, yPos);
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

    // --- Investors List Section ---
    ensureSpace(15);
    addSectionHeader('Particulars of Investors', currentY, sectionNumber++);
    currentY += 10;

    jsonData.investors.forEach((inv, index) => {
      ensureSpace(60);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`Investor ${index + 1}:`, 10, currentY);
      doc.setFont('helvetica', 'normal');
      doc.text(inv.shdname || 'N/A', 50, currentY);
      currentY += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Equity Contribution: $${inv.equity}M | ${inv.eqtypct}%`, 10, currentY);
      currentY += 10;

      addLabelValue('Citizenship:', inv.citizen || 'N/A', currentY);
      currentY += 8;
      addLabelValue('ID/Passport:', inv.invtidno || 'N/A', currentY);
      currentY += 8;

      const address = [inv.shdadD1, inv.shdadD2, inv.shdadD3, inv.shdadD4].filter(Boolean).join(', ') || 'N/A';
      addLabelValue('Address:', address, currentY);
      currentY += 10;
      addLabelValue('Telephone:', inv.shdtel || '—', currentY);
      currentY += 8;
      addLabelValue('Fax:', inv.shdfax || '—', currentY);
      currentY += 8;
      addLabelValue('Email:', inv.shdeml || '—', currentY);
      currentY += 10;

      doc.setFont('helvetica', 'bold');
      doc.text('Current Business Interests:', 10, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'normal');
      const businessLines = doc.splitTextToSize(inv.businessInterest || 'N/A', 180);
      doc.text(businessLines, 15, currentY);
      currentY += businessLines.length * 6 + 4;

      doc.setFont('helvetica', 'bold');
      doc.text('Previous BOI Projects:', 10, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'normal');
      const projectsLines = doc.splitTextToSize(inv.companyProfile || 'None', 180);
      doc.text(projectsLines, 15, currentY);
      currentY += projectsLines.length * 6 + 4;

      doc.setFont('helvetica', 'bold');
      doc.text('Other BOI Interests:', 10, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'normal');
      const otherInterestLines = doc.splitTextToSize(inv.interestProj || 'None', 180);
      doc.text(otherInterestLines, 15, currentY);
      currentY += otherInterestLines.length * 6 + 12;
    });

    // --- Project Details Section ---
    ensureSpace(30);
    addSectionHeader('Project Details', currentY, sectionNumber++);
    currentY += 10;

    const project = jsonData.projects[0] || {};
    addLabelValue('Project Type:', project.projectType || 'N/A', currentY);
    currentY += 10;
    addLabelValue('Description:', project.projectDes || 'N/A', currentY);
    currentY += 15;

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

<<<<<<< HEAD
  doc.save('Investor_Report.pdf');    
};
=======
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
>>>>>>> 55e6357aac4156df6ff35dfe3b9c2183bd79ca37

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
    const declarationLines = doc.splitTextToSize(declarationStatement, 180);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(declarationLines, 10, currentY);
    currentY += declarationLines.length * 7 + 20;

    // Signature placeholders
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 10, currentY);
    doc.text('Signature:', 130, currentY);
    currentY += 15;
    doc.text('Date:', 10, currentY);
    currentY += 25;

    // Save PDF
    doc.save('Investor_Report.pdf');
  };

  if (!jsonData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow transition"
        >
          Download PDF
        </button>
      </div>

      <div className="space-y-8 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Investor Dashboard</h1>

        <InvestorsList investors={jsonData.investors} />
        <ProjectDetails projects={jsonData.projects} />
        <ProductsTable products={jsonData.products} />
        <InvestmentTable investments={jsonData.investments} />
        <ManpowerStats manpower={jsonData.manpower} />
        <RemittanceDetails remittances={jsonData.remittances} />
        <ImplementationPrograms implementationPrograms={jsonData.implementationPrograms} />
        <ContactDetails contact={jsonData.contact} />
        <DeclarationDetails declaration={jsonData.declaration} />
        <Proposed_Financing financing={jsonData.proposedFinancing} />
      </div>
    </div>
  );
}

export default App;
