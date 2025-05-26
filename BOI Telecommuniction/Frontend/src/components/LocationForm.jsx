 import React, { useEffect, useState } from 'react';

const LocationForm = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setLocations(data.siteLocations || []))
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  if (locations.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading location data...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 1: Location(s) Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((location, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              Location #{index + 1}
            </h3>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Address
              </h4>
              <p className="mt-1">
                {[location.facadD1, location.facadD2, location.facadD3]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  District
                </h4>
                <p className="mt-1 text-blue-800 font-medium">
                  {location.facdistcd}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Local Gov. Authority
                </h4>
                <p className="mt-1 text-blue-800 font-medium">
                  {location.facagacd || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Land Ownership
              </h4>
              <div className="mt-2 flex flex-wrap items-start gap-6 text-sm text-gray-700">
                {["Private", "State"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center bg-gray-100 text-green-600 font-bold`}
                    >
                      {location.ownership === type ? "✔" : ""}
                    </span>
                    {type}
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  Other:
                  <span className="border-b border-gray-400 min-w-[150px] font-medium">
                    {!["Private", "State"].includes(location.ownership)
                      ? location.ownership
                      : ""}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Extent of Land Required
              </h4>
              <div className="grid grid-cols-3 gap-4 mt-1 text-blue-800 font-medium">
                <div>
                  <span className="font-semibold">A:</span> {location.lndacr}
                </div>
                <div>
                  <span className="font-semibold">R:</span> {location.lndrood}
                </div>
                <div>
                  <span className="font-semibold">P:</span> {location.lndpurch}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Covered Space (sq.ft / sq.m)
              </h4>
              <p className="mt-1 text-blue-800 font-semibold">
                {location.coveredSpace}
              </p>
            </div>

            <p className="text-xs italic text-gray-500 pt-4">
              Note: Please annex clearance already obtained from relevant authorities if available.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationForm;
