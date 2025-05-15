import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
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
      .then((data) => setJsonData(data))
      .catch((error) => {
        console.error('Failed to load json.data:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
  try {
    const doc = new jsPDF();
    let currentY = 20;
    const pageHeight = 270;

    const checkAndAddPage = () => {
      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20; 
      }
    };

    const addTextToPDF = (text, yPosition) => {
      doc.text(text, 10, yPosition);
    };

    const addSectionHeader = (title) => {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      addTextToPDF(title, currentY);
      currentY += 10;
      doc.setFont(undefined, 'normal');
    };

    const addListSection = (title, items, displayField = 'shdname') => {
      if (!Array.isArray(items) || items.length === 0) return;
      addSectionHeader(title);
      items.forEach((item, index) => {
        const value = item[displayField] || 'N/A';
        addTextToPDF(`${index + 1}. ${value}`, currentY);
        currentY += 10;
        checkAndAddPage();
      });
    };

    const addTableToPDF = (headers, data, title) => {
      if (!Array.isArray(data) || data.length === 0) return;
      addSectionHeader(title);
      doc.setFontSize(10);
      headers.forEach((header, i) => {
        doc.text(header, 10 + i * 50, currentY);
      });
      currentY += 10;

      data.forEach(row => {
        checkAndAddPage();
        row.forEach((cell, i) => {
          doc.text(String(cell), 10 + i * 50, currentY);
        });
        currentY += 10;
      });
    };

    // Title
    doc.setFontSize(16);
    doc.text('Investor Dashboard', 105, currentY, { align: 'center' });
    currentY += 20;

    // Sections
    addListSection('Investors List:', jsonData?.investors, 'shdname');

    if (jsonData?.projects) {
      addSectionHeader('Project Details:');
      addTextToPDF(`Project Type: ${jsonData.projects.projectType || 'N/A'}`, currentY); currentY += 10;
      addTextToPDF(`Description: ${jsonData.projects.projectDes || 'N/A'}`, currentY); currentY += 10;
    }

    addTableToPDF(
      ['Product / Service'],
      jsonData?.products?.map(p => [p.prodserv || 'N/A']),
      'Products'
    );

    addTableToPDF(
      ['Project', 'Year', 'Capital (Foreign)', 'Capital (Local)'],
      jsonData?.investment?.map(i => [
        i.project || 'N/A',
        i.year || 'N/A',
        i.fcptatofor || 0,
        i.fcpttoaloc || 0
      ]),
      'Investment Details'
    );

    // These may not yet exist in JSON
    addListSection('Proposed Financing:', jsonData?.proposedFinancing, 'item');
    addListSection('Manpower Stats:', jsonData?.manpower, 'role');
    addListSection('Remittance Details:', jsonData?.remittances, 'type');
    addListSection('Implementation Programs:', jsonData?.implementationPrograms, 'program');
    addListSection('Contact Details:', jsonData?.contacts, 'name');
    addListSection('Declaration Details:', jsonData?.declarations, 'statement');
    
    addListSection('Investment Table:', jsonData?.investment, 'project');
    addListSection('Investors List:', jsonData?.investors, 'shdname');
    addListSection('Products Table:', jsonData?.products, 'prodserv');
    addListSection('Project Details:', jsonData?.projects, 'projectType');

    // Save the PDF
    doc.save('Investor_Report.pdf');
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Check console for details.');
  }
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
      {/* Download PDF button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow transition"
        >
          Download PDF
        </button>
      </div>

      {/* Content to be displayed on the screen */}
      <div className="space-y-8 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6"></h1>

        {/* Components with data */}
        <InvestorsList data={jsonData.investors} />
        <ProjectDetails data={jsonData.projects} />
        <ProductsTable data={jsonData.products} />
        <InvestmentTable data={jsonData.investment} />
        <Proposed_Financing data={jsonData.proposedFinancing} />
        <ManpowerStats data={jsonData.manpower} />
        <RemittanceDetails data={jsonData.remittances} />
        <ImplementationPrograms data={jsonData.implementationPrograms} />
        <ContactDetails data={jsonData.contacts} />
        <DeclarationDetails data={jsonData.declarations} />
      </div>
    </div>
  );
}

export default App;