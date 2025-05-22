import React, { useEffect, useState } from 'react';
import InvestorsList from './components/InvestorsList';
import ProjectDetails from './components/ProjectDetails';
import ProductsTable from './components/ProductsTable';
import InvestmentTable from './components/InvestmentTable';
import Proposed_Financing from './components/Proposed_Financing';
import ManpowerStats from './components/ManpowerStats';
import RemittanceDetails from './components/RemittanceDetails';
import ImplementationPrograms from './components/ImplementationPrograms';
import ContactDetails from './components/ContactDetails';
import DeclarationDetails from './components/DeclarationDetails';
import { handleDownloadPDF } from './pdfGenerator';

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
          onClick={() => handleDownloadPDF(jsonData)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow transition"
        >
          Download PDF
        </button>
      </div>
      <div
        className="space-y-8 bg-white p-6 rounded shadow-lg"
      >
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