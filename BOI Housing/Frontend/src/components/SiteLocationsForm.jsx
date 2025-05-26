 import React from 'react';

const SiteLocationsForm = ({ siteLocations = [] }) => {
  if (siteLocations.length === 0) {
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
      <h2 className="text-2xl font-bold mb-2 text-indigo-800 border-b pb-2">
        1) Project Location Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteLocations.map((location, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Location #{index + 1}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Project Site</p>
              </div>
            </div>

            <div className="space-y-4">
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

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Extent of Land (in acres)
                </h4>
                <p className="mt-1 text-blue-800 font-medium">
                  {location.lndacr}
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
                    DS Division
                  </h4>
                  <p className="mt-1 text-blue-800 font-medium">
                    {location.facagacd}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Land Procurement Status
                </h4>
                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
                  <li>If land is procured, submit a copy of the deed.</li>
                  <li>
                    If a sale agreement is signed, submit a copy of the
                    agreement.
                  </li>
                  <li>
                    If land is leased, attach the lease document or MOU.
                  </li>
                </ul>
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
                  Covered Space of Buildings (sq.ft / sq.m)
                </h4>
                <p className="mt-1 text-blue-800 font-semibold">
                  {location.coveredSpace}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteLocationsForm;
