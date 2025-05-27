 import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TourismProject from "./components/TourismProject";
import DeclarationForm from "./components/DeclarationForm";
import LocationForm from "./components/LocationForm";

function App() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleDownloadPdf = () => {
    if (!formData) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const margin = 12;
   
    let y = margin;

    const titleFontSize = 14;
    const sectionFontSize = 11;
    const bodyFontSize = 9;
    const lineSpacing = 6;

    doc.setFontSize(titleFontSize);
    doc.text("Tourism Declaration Application", margin, y);
    y += lineSpacing + 4;

    doc.setFontSize(bodyFontSize);
    doc.setTextColor(40);

    // === 1. Type of the Project ===
    doc.setFontSize(sectionFontSize);
    doc.setTextColor(0);
    doc.text("1) Type of the Project", margin, y);
    y += lineSpacing;

    const selectedTypes = formData.typeOfTourismProjects?.tourismProjectType || [];

    if (selectedTypes.length === 0) {
      doc.setFontSize(bodyFontSize);
      doc.text("No project types selected.", margin, y);
      y += lineSpacing;
    } else {
      doc.setFontSize(bodyFontSize);
      selectedTypes.forEach((type) => {
        doc.text(`- ${type}`, margin + 4, y);
        y += lineSpacing;
      });
    }

    y += 4;

    doc.text(
      `2) No. of Rooms/Villas/Chalets: ${formData.typeOfTourismProjects?.noRoom || "N/A"}`,
      margin,
      y
    );
    y += lineSpacing;

    const starsCount = Number(formData.typeOfTourismProjects?.expectedStar) || 0;
    doc.text(`3) Expected Star Classification: ${starsCount} Star`, margin, y);
    y += lineSpacing + 4;

    // === 2. Location Details ===
    const loc = formData.siteLocations?.[0] || {};

    doc.setFontSize(sectionFontSize);
    doc.text("4). Location Details", margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2 },
      theme: "grid",
      body: [
        ["Address Line 1", loc.facadD1 || ""],
        ["Address Line 2", loc.facadD2 || ""],
        ["Address Line 3", loc.facadD3 || ""],
        ["Telephone", loc.factel || ""],
        ["Fax", loc.facfax || ""],
        ["Email", loc.faceml || ""],
        ["Land Area (Acres)", loc.lndacr || ""],
        ["Road Frontage (ft)", loc.lndrood || ""],
        ["Land Purchased (Acres)", loc.lndpurch || ""],
        ["Province Code", loc.facprvcd || ""],
        ["District Code", loc.facdistcd || ""],
        ["AGA Division Code", loc.facagacd || ""],
        ["Longitude", loc.longitude || ""],
        ["Latitude", loc.latitude || ""],
        ["Ownership", loc.ownership || ""],
        ["No. of Units", loc.numberOfUnits || ""],
        ["Off-Site Infrastructure", loc.offSiteInfrastructure || ""],
        ["On-Site Infrastructure", loc.onSiteInfrastructure || ""],
        ["Total Covered Space (sq.ft)", loc.coveredSpace || ""],
        ["Existing Buildings", loc.existingBuildings || ""],
      ],
    });
    y = doc.lastAutoTable.finalY + 6;

    // === 3. Declarations ===
    doc.setFontSize(sectionFontSize);
    doc.text("5). Declarations", margin, y);
    y += lineSpacing + 2;

    doc.setFontSize(bodyFontSize);
    doc.setFont(undefined, "normal");

    const declText =
      "I declare that the information furnished above in this application, attachments and otherwise represented are true and correct and undertake to inform the BOI immediately if any change in the information given above.";

    const wrappedDeclText = doc.splitTextToSize(declText, pageWidth - 2 * margin);
    wrappedDeclText.forEach((line) => {
      doc.text(line, margin, y);
      y += lineSpacing;
    });
    y += 4;

    // Name
    doc.text("Name:", margin, y);
    doc.line(margin + 40, y + 1, pageWidth - margin - 80, y + 1);
    y += lineSpacing;

    // Designation
    doc.text("Designation:", margin, y);
    doc.line(margin + 40, y + 1, pageWidth - margin - 80, y + 1);
    y += lineSpacing;

    // Signature box
    const sigBoxX = pageWidth - 70;
    const sigBoxY = y;
    const sigBoxWidth = 60;
    const sigBoxHeight = 17;

    doc.rect(sigBoxX, sigBoxY, sigBoxWidth, sigBoxHeight);
    doc.text("Signature", sigBoxX + 2, sigBoxY + 4);
    y += sigBoxHeight + 6;

    // Tel & Fax
    doc.text("Tel:", margin, y);
    doc.line(margin + 20, y + 1, margin + 80, y + 1);

    doc.text("Fax:", margin + 100, y);
    doc.line(margin + 120, y + 1, margin + 180, y + 1);

    y += lineSpacing;

    // Email & Date
    doc.text("Email:", margin, y);
    doc.line(margin + 20, y + 1, margin + 80, y + 1);

    doc.text("Date:", margin + 100, y);
    doc.line(margin + 120, y + 1, margin + 180, y + 1);

    doc.save("tourism-project.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tourism Declaration Portal</h1>
          <button
            onClick={handleDownloadPdf}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Download PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 space-y-10">
        <section className="bg-white p-6 rounded-lg shadow">
          <TourismProject />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <LocationForm />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <DeclarationForm />
        </section>
      </main>
    </div>
  );
}

export default App;
