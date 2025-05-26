import React, { useState, useEffect } from "react";
import WaterConsumption from "./components/WaterConsumption";
import EnvironmentalExamination from "./components/EnvironmentalExamination";
import NoiseVibration from "./components/NoiseVibration";
import ContactOfficer from "./components/ContactOfficer";
import InvestorsDeclaration from "./components/InvestorsDeclaration";
import ElectricityTable from "./components/ElectricityTable";
import FuelConsumptions from "./components/FuelConsumptions";
import LocationForm from "./components/LocationForm";
import generatePdf from "./pdfGenerator";

function App() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  const handleDownloadPdf = () => {
    if (!formData) {
      alert("Form data not loaded yet.");
      return;
    }
    generatePdf(formData);
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <button
        onClick={handleDownloadPdf}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Generate PDF
      </button>
      {/* UI Components */}
      <LocationForm />
      <FuelConsumptions />
      <WaterConsumption />
      <EnvironmentalExamination />
      <NoiseVibration />
      <ElectricityTable />
      <ContactOfficer />
      <InvestorsDeclaration />
    </div>
  );
}

export default App;