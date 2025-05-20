  import React from "react";
import TourismProject from "./components/TourismProject";
 
import DeclarationForm from "./components/DeclarationForm";
import LocationForm from "./components/LocationForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Tourism Declaration Portal</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 space-y-10">
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