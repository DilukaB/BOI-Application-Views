 import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SiteLocationsForm from './components/SiteLocationsForm';
import EquipmentTable from './components/EquipmentTable';
import WaterConsumptionTable from './components/WaterConsumptionTable';
import ElectricityTable from './components/ElectricityTable';
import ContactOfficerTable from './components/ContactOfficerTable';
import InvestorTable from './components/InvestorTable';
import InvestmentDocumentChecklist from './components/InvestmentDocumentChecklist';
import AnnexureIIForm from './components/AnnexureIIForm';
import NoiseDescriptionComponent from './components/NoiseDescriptionComponent';

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

  const PAGE_MARGIN_LEFT = 14;
  const PAGE_MARGIN_RIGHT = 14;
  const PAGE_MARGIN_TOP = 20;
  const PAGE_MARGIN_BOTTOM = 20;

  const generatePdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = PAGE_MARGIN_TOP;

    const addHeaderFooter = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Board of Investment of Sri Lanka', PAGE_MARGIN_LEFT, 10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
      }
    };

    // Function to check if there's enough space on the page, else add new page
    const ensureSpace = (neededHeight) => {
      if (y + neededHeight > pageHeight - PAGE_MARGIN_BOTTOM) {
        doc.addPage();
        y = PAGE_MARGIN_TOP;
      }
    };

    // Universal function to add a titled table with autoTable and page-break management
    const addTable = (title, columns, rows) => {
      const titleFontSize = 14;
      const tableFontSize = 8;

      // Add title with space before it (if not first content)
      if (y !== PAGE_MARGIN_TOP) y += 10;

      ensureSpace(titleFontSize + 6);
      doc.setFontSize(titleFontSize);
      doc.setTextColor(22, 160, 133);
      doc.text(title, PAGE_MARGIN_LEFT, y);
      y += 6;

      // Prepare autoTable options
      autoTable(doc, {
        startY: y,
        head: [columns],
        body: rows,
        styles: { fontSize: tableFontSize, cellPadding: 2 },
        headStyles: { fillColor: [22, 160, 133] },
        theme: 'striped',
        margin: { left: PAGE_MARGIN_LEFT, right: PAGE_MARGIN_RIGHT },
        didDrawPage: (data) => {
          // Update y position after table drawn
          y = data.cursor.y + 10;
        },
        pageBreak: 'auto',
        showHead: 'everyPage',
      });
    };

    // Document Title
    doc.setFontSize(20);
    doc.setTextColor(0);
    doc.text('Project Report', PAGE_MARGIN_LEFT, y);
    y += 12;

    const data = locationsData;

    if (!data) {
      doc.text('No data available', PAGE_MARGIN_LEFT, y);
      doc.save('project_report.pdf');
      return;
    }

    // 1.0 Site Locations
    if (data.siteLocations?.length) {
      addTable(
        '1.0 Site Locations',
        ['Address Line 1', 'Address Line 2', 'Address Line 3', 'Telephone', 'Fax', 'Email', 'Ownership', 'Number of Units', 'Covered Space', 'Existing Buildings'],
        data.siteLocations.map(loc => [
          loc.facadD1 || '', loc.facadD2 || '', loc.facadD3 || '',
          loc.factel || '', loc.facfax || '', loc.faceml || '',
          loc.ownership || '', loc.numberOfUnits || '', loc.coveredSpace || '', loc.existingBuildings || ''
        ])
      );
    }

    // 2.0 Equipment List
    if (data.equipmentList?.length) {
      addTable(
        '2.0 Equipment List',
        ['Description', 'Condition', 'Power', 'Capacity', 'Value'],
        data.equipmentList.map(eq => [
          eq.eqpdes || '', eq.eqpcnd || '', eq.eqppwr || '', eq.eqpcap || '', eq.equval?.toString() || ''
        ])
      );
    }

    // 3.0 Water Consumption
    if (data.waterConsumptions?.length) {
      addTable(
        '3.0 Water Consumption',
        ['Use of Water', 'Commence Production', 'Water Capacity'],
        data.waterConsumptions.map(w => [
          w.useOfWater || '', w.commenceProduction?.toString() || '', w.waterCapacity?.toString() || ''
        ])
      );
    }

    // 4.3 Sewage
    if (data.sewageList?.length) {
      addTable(
        '4.3 Sewage',
        ['Nature of Effluent', 'Treatment', 'Method of Disposal'],
        data.sewageList.map(sw => [
          sw.swNatureOfEffluent || '', sw.swTreatment || '', sw.swMethDisposal || ''
        ])
      );
    }

    // 4.4 Noise/Vibration
    if (data.noiseList?.length) {
      const noiseRows = [];
      data.noiseList.forEach(n => {
        n.niceDescription.forEach(desc => {
          noiseRows.push([n.noiseCode || '', desc.description || '']);
        });
      });
      addTable('4.4 Noise/Vibration - Construction Equipment', ['Noise Code', 'Description'], noiseRows);
    }

    // 4.5 Hazardous Materials
    if (data.hazardousList?.length) {
      addTable(
        '4.5 Hazardous Materials',
        ['Hazardous Description'],
        data.hazardousList.map(h => [h.hazardousDes || ''])
      );
    }

    // 4.6 Fire Risk
    if (data.fireRiskList?.length) {
      addTable(
        '4.6 Fire Risk',
        ['Fire Risk Description'],
        data.fireRiskList.map(f => [f.fireRiskDescription || ''])
      );
    }

    // 5.0 Electricity List
    if (data.electricityList?.length) {
      addTable(
        '5.0 Electricity Requirement',
        ['Period', 'Commence Production', 'Capacity'],
        data.electricityList.map(el => [
          el.erCode || '', el.commenceProduction?.toString() || '', el.erCapacity?.toString() || ''
        ])
      );
    }

    // 6.0 Contact Officers
    if (data.contactOfficerList?.length) {
      addTable(
        '6.0 Contact Officers',
        ['Name', 'Address', 'Telephone', 'Email', 'Fax'],
        data.contactOfficerList.map(c => [
          c.cntname || '', c.cntAddress || '', c.cntTel || '', c.cntEmail || '', c.cntFax || ''
        ])
      );
    }

    // 7.0 Investors with signatures
    if (data.investorList?.length) {
      addTable(
        '7.0 Investors',
        ['Name', 'Telephone', 'Email', 'Fax'],
        data.investorList.map(inv => [
          inv.invName || '', inv.invTel || '', inv.invEmail || '', inv.invFax || ''
        ])
      );

      data.investorList.forEach((inv, index) => {
        // Check space for signature block (approx 30 units)
        ensureSpace(30);

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Investor: ${inv.invName || 'N/A'}`, PAGE_MARGIN_LEFT, y);
        y += 8;

        doc.setFontSize(10);
        doc.text('Signature of Investor:', PAGE_MARGIN_LEFT, y);
        doc.line(60, y, pageWidth - PAGE_MARGIN_RIGHT, y);
        y += 10;

        doc.text('Date:', PAGE_MARGIN_LEFT, y);
        doc.line(60, y, pageWidth - PAGE_MARGIN_RIGHT, y);
        y += 15;
      });
    }

    addHeaderFooter();
    doc.save('project_report.pdf');
  };

  if (loading) return <div>Loading location data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!locationsData) return <div>No data available</div>;

  return (
    <div className="p-6 space-y-8">
      <button
        onClick={generatePdf}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>

      <SiteLocationsForm siteLocations={locationsData.siteLocations || []} />
      <EquipmentTable equipmentList={locationsData.equipmentList || []} />
      <WaterConsumptionTable waterConsumptions={locationsData.waterConsumptions || []} />
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
