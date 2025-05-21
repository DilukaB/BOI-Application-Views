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
  const margin = 12; // smaller margin to save space
  const pageHeight = doc.internal.pageSize.height;
  let y = margin;

  // Smaller fonts to fit content
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

  const selectedTypes = formData.typeOfTourismProjects.tourismProjectType || [];

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
    `2) No. of Rooms/Villas/Chalets: ${formData.typeOfTourismProjects.noRoom || "N/A"}`,
    margin,
    y
  );
  y += lineSpacing;

  doc.setFontSize(bodyFontSize);
  doc.setFont(undefined, "normal");

  const starsCount = Number(formData.typeOfTourismProjects.expectedStar) || 0;
  doc.text(`3) Expected Star Classification: ${starsCount} Star`, margin, y);
  y += lineSpacing + 4;

   // === 2. Location Details ===
  const loc = formData.siteLocations[0];
  doc.setFontSize(sectionFontSize);
  doc.setTextColor(0);
  doc.text("4). Location", margin, y);
  y += lineSpacing + 4;

  // 1.1 Address of Location
  doc.setFontSize(bodyFontSize);
  doc.text("1.1 Address of Location (Please attach a sketch):", margin, y);
  y += lineSpacing;

  // Address lines
  doc.text(loc.facadD1 || "N/A", margin, y);
  y += lineSpacing;
  doc.text(loc.facadD2 || "N/A", margin, y);
  y += lineSpacing;
  doc.text(loc.facadD3 || "N/A", margin, y);
  y += lineSpacing;

  // Horizontal line to separate address from next section
  doc.setLineWidth(0.5); // Thin line
  doc.line(margin, y, pageWidth - margin, y);
  y += lineSpacing + 4;

  // Reset line width to default
  doc.setLineWidth(0.2);

  // 1.2 Location details of the project
  doc.setFontSize(sectionFontSize);
  doc.text("1.2 Location details of the project:", margin, y);
  y += lineSpacing + 4;

  // Extent of land
  doc.setFontSize(bodyFontSize);
  doc.text("1.2.1 Extent of land (in acres):", margin, y);
  doc.text(`${loc.lndacr || "N/A"}`, pageWidth - 80, y); // Right-aligned
  y += lineSpacing;

  // Districts and Division
  doc.text("1.2.2 Districts: ", margin, y);
  doc.text(`${loc.facdistcd || "N/A"}`, pageWidth - 80, y); // Right-aligned
  y += lineSpacing;
  doc.text("D S Division: ", margin, y);
  doc.text(`${loc.facagacd || "N/A"}`, pageWidth - 80, y); // Right-aligned
  y += lineSpacing + 4;

  // Whether land is already procured
  doc.text("1.2.3 Whether land is already procured, if so please submit a copy of the deed", margin, y);
  y += lineSpacing;
  doc.text("- If sale agreement is signed, please submit a copy of the agreement", margin + 4, y);
  y += lineSpacing;
  doc.text("- If the land is obtained on lease basis, submit a copy of the lease", margin + 4, y);
  y += lineSpacing + 4;

  // 1.3 Ownership of the land/lands
  doc.setFontSize(sectionFontSize);
  doc.text("1.3 Ownership of the land/lands:", margin, y);
  y += lineSpacing + 4;

  // Checkbox for Private and State
  doc.setFontSize(bodyFontSize);
  const checkboxSize = 6; // Size of the checkbox
  const checkboxMarginRight = 10; // Distance between text and checkbox
  const labelWidth = 50; // Width reserved for the text labels

  // Private checkbox
  doc.text("Private", margin, y); // Text aligned to the left
  doc.rect(margin + labelWidth + checkboxMarginRight, y - 2, checkboxSize, checkboxSize); // Draw checkbox
  if (loc.ownership === "Private") {
    // Draw an X inside the checkbox
    doc.line(
      margin + labelWidth + checkboxMarginRight + 1,
      y - 1,
      margin + labelWidth + checkboxMarginRight + 5,
      y + 3
    ); // Diagonal line 1
    doc.line(
      margin + labelWidth + checkboxMarginRight + 5,
      y - 1,
      margin + labelWidth + checkboxMarginRight + 1,
      y + 3
    ); // Diagonal line 2
  }
  y += lineSpacing;

  // State checkbox
  doc.text("State", margin, y); // Text aligned to the left
  doc.rect(margin + labelWidth + checkboxMarginRight, y - 2, checkboxSize, checkboxSize); // Draw checkbox
  if (loc.ownership === "State") {
    // Draw an X inside the checkbox
    doc.line(
      margin + labelWidth + checkboxMarginRight + 1,
      y - 1,
      margin + labelWidth + checkboxMarginRight + 5,
      y + 3
    ); // Diagonal line 1
    doc.line(
      margin + labelWidth + checkboxMarginRight + 5,
      y - 1,
      margin + labelWidth + checkboxMarginRight + 1,
      y + 3
    ); // Diagonal line 2
  }
  doc.text("(Please specify):", margin + labelWidth + checkboxMarginRight + checkboxSize + 10, y); // Text after the checkbox
  y += lineSpacing + 4;

  // 1.4 Covered space of buildings
  doc.setFontSize(sectionFontSize);
  doc.text("1.4 Covered space of buildings (in sq.ft / sq. meters):", margin, y);
  y += lineSpacing + 4;

  // Covered space
  doc.setFontSize(bodyFontSize);
  doc.text(`${loc.coveredSpace || "N/A"}`, margin, y);
  y += lineSpacing + 4;

  // === 3. Declarations Table ===
doc.setFontSize(sectionFontSize);
doc.text("5). Declarations", margin, y);
y += lineSpacing + 2;

// === 4. Static Declaration Statement ===
doc.setFontSize(bodyFontSize);
doc.setFont(undefined, "normal");

const declText = "I declare that the information furnished above in this application, attachments and otherwise represented are true and correct and undertake to inform the BOI immediately if any change in the information given above.";

// Word wrap the text to fit page width
const wrappedDeclText = doc.splitTextToSize(declText, pageWidth - 2 * margin);

wrappedDeclText.forEach((line) => {
  doc.text(line, margin, y);
  y += lineSpacing;
});
y += 4;

// === Name, Designation, Signature ===
// Name field
doc.text("Name:", margin, y);
doc.line(margin + 40, y + 1, pageWidth - margin - 80, y + 1);
y += lineSpacing;

// Designation field
doc.text("Designation:", margin, y);
doc.line(margin + 40, y + 1, pageWidth - margin - 80, y + 1); 
y += lineSpacing;

// Signature box on the right
const sigBoxX = pageWidth - 70; 
const sigBoxY = y;
const sigBoxWidth = 60;
const sigBoxHeight = 17;

doc.rect(sigBoxX, sigBoxY, sigBoxWidth, sigBoxHeight); 
doc.text("Signature", sigBoxX + 2, sigBoxY + 4); 
y += sigBoxHeight + 6;

// === Contact Details and Date ===
const telFaxX = margin; 
const emailX = margin; 
const dateX = margin + 100; 

// Tel and Fax fields
doc.text("Tel:", telFaxX, y);
doc.line(telFaxX + 20, y + 1, telFaxX + 80, y + 1); 

doc.text("Fax:", telFaxX + 100, y);
doc.line(telFaxX + 120, y + 1, telFaxX + 180, y + 1); 

// Move to the next line for Email and Date
y += lineSpacing;

// Email and Date fields
doc.text("Email:", emailX, y); 
doc.line(emailX + 20, y + 1, emailX + 80, y + 1);

doc.text("Date:", dateX, y); 
doc.line(dateX + 20, y + 1, dateX + 80, y + 1);
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
