 import React, { useRef } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import TourismProject from "./components/TourismProject";
import DeclarationForm from "./components/DeclarationForm";
import LocationForm from "./components/LocationForm";

function App() {
  const pdfRef = useRef(null);

  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    if (!input) return;

    domtoimage.toPng(input).then((imgData) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Margins for better alignment
      const leftMargin = 20; // Slightly more to shift right
      const rightMargin = 10;
      const topBottomMargin = 15;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth - leftMargin - rightMargin;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let y = topBottomMargin;
      if (imgHeight < pageHeight - topBottomMargin * 2) {
        y = (pageHeight - imgHeight) / 2;
      }

      pdf.addImage(imgData, "PNG", leftMargin, y, imgWidth, imgHeight);
      pdf.save("tourism-project.pdf");
    }).catch((error) => {
      console.error("PDF generation error:", error);
    });
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

      <main className="max-w-7xl mx-auto px-4 space-y-10" ref={pdfRef}>
        {/* Tourism Project Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <TourismProject />
        </section>

        {/* Location Form Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <LocationForm />
        </section>

        {/* Declaration Form Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <DeclarationForm />
        </section>
      </main>
    </div>
  );
}

export default App;