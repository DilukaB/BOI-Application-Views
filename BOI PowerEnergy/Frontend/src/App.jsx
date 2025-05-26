// App.jsx
import React, { useEffect, useState } from "react";
import FuelConsumptions from "./components/FuelConsumptions";
import EnvironmentExamination from "./components/EnvironmentExamination";
import WaterConsumption from "./components/WaterConsumption";
import ElectricityTable from "./components/ElectricityTable";
import ContactOfficer from "./components/ContactOfficer";
import InvestorsDeclaration from "./components/InvestorsDeclaration";
import LocationForm from "./components/LocationForm";
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

      <div className="space-y-8 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Environmental Impact Assessment Form</h1>

        <LocationForm data={jsonData.siteLocations} />
        <FuelConsumptions data={jsonData.fuelConsumptions} />
        <WaterConsumption data={jsonData.waterConsumptions} />
        <EnvironmentExamination data={jsonData} />
        <ElectricityTable data={jsonData.electricityList} />
        <ContactOfficer data={jsonData.contactOfficerList} />
        <InvestorsDeclaration data={jsonData.declarations} />
      </div>
    </div>
  );
}

export default App;