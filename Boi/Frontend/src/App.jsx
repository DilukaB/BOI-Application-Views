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
      .then((data) => {
        console.log("Loaded jsonData:", data);
        setJsonData(data);
      })
      .catch((error) => {
        console.error('Failed to load data.json:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let currentY = margin;

    // Add page footer with page number
    const addFooter = (pageNum) => {
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 20, { align: 'right' });
    };

    // Add section title with underline
    const addSectionTitle = (title) => {
      checkAddPage(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor('#003366');
      doc.text(title, margin, currentY);
      currentY += 6;
      // underline
      doc.setDrawColor('#003366');
      doc.setLineWidth(1.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 15;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(0);
    };

    // Check if need to add new page
    const checkAddPage = (heightNeeded = 20) => {
      if (currentY + heightNeeded > pageHeight - margin) {
        addFooter(doc.getNumberOfPages());
        doc.addPage();
        currentY = margin;
      }
    };

    // Render array of objects as a table
    const renderTable = (title, dataList) => {
      if (!Array.isArray(dataList) || dataList.length === 0) return;

      addSectionTitle(title);

      // Extract all column headers
      const columns = Array.from(
        new Set(dataList.flatMap(item => Object.keys(item)))
      );

      const tableStartX = margin;
      const tableWidth = pageWidth - margin * 2;
      const colWidth = tableWidth / columns.length;

      // Header row
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(220, 220, 220);
      doc.rect(tableStartX, currentY - 12, tableWidth, 20, 'F');

      columns.forEach((col, i) => {
        doc.text(col.charAt(0).toUpperCase() + col.slice(1), tableStartX + i * colWidth + 5, currentY);
      });
      currentY += 20;

      doc.setFont('helvetica', 'normal');

      dataList.forEach((item) => {
        checkAddPage(20);
        columns.forEach((col, i) => {
          const text = item[col] !== undefined ? String(item[col]) : '';
          const splitText = doc.splitTextToSize(text, colWidth - 10);
          doc.text(splitText, tableStartX + i * colWidth + 5, currentY);
        });
        currentY += 18;
      });

      currentY += 10;
    };

    // Document title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#004080');
    doc.text('Investor Dashboard Report', pageWidth / 2, currentY, { align: 'center' });
    currentY += 30;

    // Render all sections as tables if possible
    renderTable('Investors List', jsonData.investors);
    renderTable('Project Details', jsonData.projects);
    renderTable('Products', jsonData.products);
    renderTable('Investment Details', jsonData.investment);
    renderTable('Proposed Financing', jsonData.proposedFinancing);
    renderTable('Manpower Stats', jsonData.manpower);
    renderTable('Remittance Details', jsonData.remittances);
    renderTable('Implementation Programs', jsonData.implementationPrograms);
    renderTable('Contact Details', jsonData.contacts);
    renderTable('Declaration Details', jsonData.declarations);

    addFooter(doc.getNumberOfPages());

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

