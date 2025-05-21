 import React, { useEffect, useState } from "react";

const LocationForm = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.siteLocations?.length > 0) {
          setLocations(data.siteLocations);
        }
      })
      .catch((err) => console.error("Error fetching location:", err));
  }, []);

  if (locations.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading location data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-800">
      <h2 className="text-3xl font-bold text-slate-900 mb-10 border-b pb-4 border-slate-300 tracking-wide">
        Section 4: Project Location Details
      </h2>

      {locations.map((location, index) => (
        <div
          key={index}
          className="bg-white border border-slate-300 rounded-xl shadow-sm mb-12 p-8 space-y-8"
        >
          <h3 className="text-xl font-semibold text-indigo-800">Location #{index + 1}</h3>

          {/* Address */}
          <section>
            <p className="font-semibold text-slate-700">
              1.1 Address of Location{" "}
              <span className="text-sm font-normal text-gray-500">(Please attach a sketch)</span>
            </p>
            <div className="mt-2 text-gray-800 pl-4 space-y-1">
              <div className="border-b border-gray-300 pb-1">{location.facadD1}</div>
              <div className="border-b border-gray-300 pb-1">
                {location.facadD2}, {location.facadD3}
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section>
            <p className="font-semibold text-slate-700 mb-2">1.2 Location Details:</p>
            <div className="pl-4 space-y-3">
              <p>
                <strong className="text-gray-700">1.2.1</strong> Extent of Land (in acres):{" "}
                <span className="font-medium text-blue-900">{location.lndacr}</span>
              </p>
              <p>
                <strong className="text-gray-700">1.2.2</strong> District:{" "}
                <span className="font-medium text-blue-900">{location.facdistcd}</span>
                <span className="ml-6">DS Division:{" "}
                  <span className="font-medium text-blue-900">{location.facagacd}</span>
                </span>
              </p>
              <div className="text-sm text-gray-600 mt-2">
                <p className="mb-1"><strong>1.2.3</strong> Land Procurement Status:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>If land is procured, submit a copy of the deed.</li>
                  <li>If a sale agreement is signed, submit a copy.</li>
                  <li>If land is leased, attach the lease document.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ownership */}
          <section>
            <p className="font-semibold text-slate-700">1.3 Land Ownership:</p>
            <div className="flex flex-wrap items-start gap-8 mt-3 pl-4 text-gray-800">
              {["Private", "State"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <span className={`w-5 h-5 border border-gray-600 rounded-sm flex items-center justify-center bg-gray-100 text-green-700 font-semibold`}>
                    {location.ownership === type ? "✔" : ""}
                  </span>
                  {type}
                </label>
              ))}
              <label className="flex items-center gap-2">
                Other (Specify):
                <span className="border-b border-gray-600 min-w-[220px] font-medium">
                  {["Private", "State"].includes(location.ownership) ? "" : location.ownership}
                </span>
              </label>
            </div>
          </section>

          {/* Covered space */}
          <section>
            <p className="font-semibold text-slate-700">
              1.4 Covered Space of Buildings{" "}
              <span className="text-sm font-normal text-gray-500">(sq.ft / sq.m)</span>:
            </p>
            <div className="mt-2 pl-4 border-b border-gray-400 text-lg font-semibold text-blue-800 w-fit">
              {location.coveredSpace}
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default LocationForm;
