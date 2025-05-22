import React, { useState, useEffect } from 'react';
import SiteLocationsForm from './components/SiteLocationsForm';
import EquipmentTable from './components/EquipmentTable';
import WaterConsumptionTable from './components/WaterConsumptionTable';
import ElectricityTable from './components/ElectricityTable';
import ContactOfficerTable from './components/ContactOfficerTable';
import InvestorTable from './components/InvestorTable';
import InvestmentDocumentChecklist from './components/InvestmentDocumentChecklist';
import AnnexureIIForm from './components/AnnexureIIForm';
import NoiseDescriptionComponent from './components/NoiseDescriptionComponent';
import SolidWaste from './components/SolidWaste';
import { generatePdf } from './pdfGenerator';

function App() {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setLocationsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGeneratePdf = () => {
    if (locationsData) {
      generatePdf(locationsData);
    }
  };

  if (loading) return <div>Loading location data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!locationsData) return <div>No data available</div>;

  return (
    <div className="p-6 space-y-8">
      <button
        onClick={handleGeneratePdf}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>

      <SiteLocationsForm siteLocations={locationsData.siteLocations || []} />
      <EquipmentTable equipmentList={locationsData.equipmentList || []} />
      <WaterConsumptionTable waterConsumptions={locationsData.waterConsumptions || []} />
      <SolidWaste />
      <NoiseDescriptionComponent />
      <ElectricityTable electricityList={locationsData.electricityList || []} />
      <ContactOfficerTable contactOfficerList={locationsData.contactOfficerList || []} />
      <InvestorTable investorList={locationsData.investorList || []} />
      <InvestmentDocumentChecklist />
      <AnnexureIIForm />
    </div>
  );
}

export default App;