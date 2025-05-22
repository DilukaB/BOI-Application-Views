import React, { useEffect, useState } from "react";
import TourismProject from "./components/TourismProject";
import DeclarationForm from "./components/DeclarationForm";
import LocationForm from "./components/LocationForm";
import { handleDownloadPdf } from './pdfGenerator';

function App() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tourism Declaration Portal</h1>
          <button
            onClick={() => handleDownloadPdf(formData)}
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