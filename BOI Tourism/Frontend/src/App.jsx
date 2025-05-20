import React, { useRef } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import TourismProject from "./components/TourismProject";
import DeclarationForm from "./components/DeclarationForm";
import LocationForm from "./components/LocationForm";

function App() {
  const pdfRef = useRef();

  const handleDownloadPdf = () => {
  const input = pdfRef.current;
  if (!input) return;

  domtoimage.toPng(input).then((imgData) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Adjust margins
    const leftMargin = 20; // ⬅️ Increased for better centering
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </header>

      <main className="flex justify-center">
        <div
          ref={pdfRef}
          className="w-full max-w-4xl px-4 space-y-10 bg-white py-6 rounded-lg shadow"
        >
          {/* Tourism Project Section */}
          <section>
            <TourismProject />
          </section>

          {/* Location Form Section */}
          <section>
            <LocationForm />
          </section>

          {/* Declaration Form Section */}
          <section>
            <DeclarationForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
