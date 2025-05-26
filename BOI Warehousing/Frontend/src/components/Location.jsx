 import React, { useEffect, useState } from 'react';

const Location = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteLocations?.length > 0) {
          setLocations(data.siteLocations);
        }
      })
      .catch((err) => console.error("Error loading location data:", err));
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
      <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
        1. Location(s)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((location, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md bg-white space-y-6"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Location #{index + 1}
            </h3>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                1.1 Address of Location
              </h4>
              <p className="mt-1">
                {[location.facadD1, location.facadD2, location.facadD3]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                1.2 Extent of Land Required
              </h4>
              <p className="mt-1 text-blue-800 font-medium">
                Acres: {location.lndacr} | Roods: {location.lndrood} | Perches: {location.lndpurch}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                1.3 Ownership of the Land
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
                  Other (Specify):
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
                1.4 Covered Space of Buildings
              </h4>
              <p className="mt-1 text-blue-800 font-semibold">
                {location.coveredSpace} sq.ft.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                1.5 Existing Buildings
              </h4>
              <p className="mt-1 text-gray-700">
                {location.existingBuildings}
              </p>
              {location.ownership?.toLowerCase() === "state" && (
                <p className="text-sm italic text-red-600 mt-1">
                  * Provide letter of consent from relevant authorities
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
