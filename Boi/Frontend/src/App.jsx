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
        console.error('Failed to load data.json:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const addTextToPDF = (text, yPosition) => {
      doc.text(text, 10, yPosition);
    };

    const addTableToPDF = (headers, data, startY) => {
      let currentY = startY;

      // Adding table headers
      doc.setFontSize(10);
      headers.forEach((header, index) => {
        doc.text(header, 10 + index * 50, currentY);
      });

      currentY += 10;

      // Adding table rows
      data.forEach((row, index) => {
        row.forEach((cell, cellIndex) => {
          doc.text(cell, 10 + cellIndex * 50, currentY);
        });
        currentY += 10;
      });

      return currentY;
    };

    let currentY = 20;
    const pageHeight = 270; // standard A4 size - margin from top and bottom

    // Add title
    doc.setFontSize(16);
    doc.text('Investor Dashboard', 105, currentY, { align: 'center' });
    currentY += 20;

    // Add Investors List
    addTextToPDF('Investors List:', currentY);
    currentY += 10;
    const investors = jsonData.investors;
    investors.forEach((investor, index) => {
      addTextToPDF(`${index + 1}. ${investor.name}`, currentY);
      currentY += 10;

      // Check if we need to add a new page
      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Project Details
    addTextToPDF('Project Details:', currentY);
    currentY += 10;
    const projects = jsonData.projects;
    projects.forEach((project, index) => {
      addTextToPDF(`${index + 1}. ${project.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Products Table
    addTextToPDF('Products:', currentY);
    currentY += 10;
    const products = jsonData.products;
    const productHeaders = ['Product Name'];
    const productData = products.map((product) => [product.name]);
    currentY = addTableToPDF(productHeaders, productData, currentY);

    if (currentY > pageHeight) {
      doc.addPage();
      currentY = 20;
    }

    // Add Investment Table
    addTextToPDF('Investment Details:', currentY);
    currentY += 10;
    const investments = jsonData.investment;
    const investmentHeaders = ['Investor', 'Amount'];
    const investmentData = investments.map((investment) => [investment.name, investment.amount]);
    currentY = addTableToPDF(investmentHeaders, investmentData, currentY);

    if (currentY > pageHeight) {
      doc.addPage();
      currentY = 20;
    }

    // Add Proposed Financing
    addTextToPDF('Proposed Financing:', currentY);
    currentY += 10;
    const financing = jsonData.proposedFinancing;
    financing.forEach((item, index) => {
      addTextToPDF(`${index + 1}. ${item.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Manpower Stats
    addTextToPDF('Manpower Stats:', currentY);
    currentY += 10;
    const manpower = jsonData.manpower;
    manpower.forEach((stat, index) => {
      addTextToPDF(`${index + 1}. ${stat.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Remittance Details
    addTextToPDF('Remittance Details:', currentY);
    currentY += 10;
    const remittances = jsonData.remittances;
    remittances.forEach((remittance, index) => {
      addTextToPDF(`${index + 1}. ${remittance.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Implementation Programs
    addTextToPDF('Implementation Programs:', currentY);
    currentY += 10;
    const programs = jsonData.implementationPrograms;
    programs.forEach((program, index) => {
      addTextToPDF(`${index + 1}. ${program.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Contact Details
    addTextToPDF('Contact Details:', currentY);
    currentY += 10;
    const contacts = jsonData.contacts;
    contacts.forEach((contact, index) => {
      addTextToPDF(`${index + 1}. ${contact.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

    // Add Declaration Details
    addTextToPDF('Declaration Details:', currentY);
    currentY += 10;
    const declarations = jsonData.declarations;
    declarations.forEach((declaration, index) => {
      addTextToPDF(`${index + 1}. ${declaration.name}`, currentY);
      currentY += 10;

      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
    });

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