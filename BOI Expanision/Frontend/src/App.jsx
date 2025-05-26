import React from "react";
import EnvironmentalExamination from "./component/EnvironmentalExamination";
import { handleDownloadPDF } from "./pdfGenerator";

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleDownloadPDF()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow transition"
        >
          Generate PDF
        </button>
      </div>

      <div className="space-y-8 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Environmental Examination Report</h1>

        <EnvironmentalExamination />
      </div>
    </div>
  );
}

export default App;