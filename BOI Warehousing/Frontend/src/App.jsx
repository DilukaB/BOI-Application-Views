import React, { useEffect, useState } from "react";
import Location from "./components/Location";
import Machenary from "./components/Machenary";
import Chemicals from "./components/Chemicals";
import WaterConsumptionTable from "./components/WaterConsumptionTable";
import SolidWaste from "./components/SolidWaste";
import Sewage from "./components/Sewage";
import Noise_Hazardous_FireRisk from "./components/Noise_Hazardous_FireRisk";
import ElectricityTable from "./components/ElectricityTable";
import ContactOfficer from "./components/ContactOfficer";
import InvestorsDeclaration from "./components/InvestorsDeclaration";
import { handleDownloadPDF } from "./pdfGenerator";

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded JSON Data:", data);
        setJsonData(data);
      })
      .catch((error) => {
        console.error("Failed to load data.json:", error);
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
        <h1 className="text-3xl font-bold text-center mb-6">Facility Inspection Report</h1>

        <Location data={jsonData.siteLocations} />
        <Machenary data={jsonData.machineryLists} />
        <Chemicals data={jsonData.chemicalDetails} />
        <WaterConsumptionTable data={jsonData.waterConsumptions} />
        <SolidWaste data={jsonData.solidWasteList} />
        <Sewage data={jsonData.sewageList} />
        <Noise_Hazardous_FireRisk
          noiseData={jsonData.noiseList}
          hazardousData={jsonData.hazardousList}
          fireRiskData={jsonData.fireRiskList}
        />
        <ElectricityTable data={jsonData.electricityList} />
        <ContactOfficer data={jsonData.contactOfficerList} />
        <InvestorsDeclaration data={jsonData.declarations} />
      </div>
    </div>
  );
}

export default App;