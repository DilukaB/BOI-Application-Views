 import React, { useEffect, useState } from "react";

const LocationForm = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.siteLocations && data.siteLocations.length > 0) {
          setLocation(data.siteLocations[0]); // Use the first location
        }
      })
      .catch((err) => console.error("Error fetching location:", err));
  }, []);

  if (!location) {
    return <p className="text-center text-gray-600">Loading location data....</p>;
  }

  return (
    <div className="space-y-8 text-gray-800 text-[15px] leading-relaxed print:text-black print:bg-white print:p-0 print:shadow-none print:rounded-none">
      <h2 className="text-2xl font-bold underline underline-offset-4 text-gray-900 mb-4">
        4). Location
      </h2>

      {/* 1.1 Address */}
      <section>
        <p className="font-semibold">
          1.1 Address of Location{" "}
          <span className="font-normal text-sm">(Please attach a sketch)</span>:
        </p>
        <div className="mt-3 space-y-2 text-gray-700">
          <div className="border-b border-gray-400 pb-1">{location.facadD1}</div>
          <div className="border-b border-gray-400 pb-1">
            {location.facadD2}, {location.facadD3}
          </div>
        </div>
      </section>

      {/* 1.2 Location Details */}
      <section>
        <p className="font-semibold mb-2">1.2 Location details of the project:</p>
        <div className="ml-6 space-y-3 text-gray-700">
          <p>
            <strong>1.2.1</strong> Extent of land (in acres):
            <span className="ml-2 font-medium">{location.lndacr}</span>
          </p>

          <p>
            <strong>1.2.2</strong> Districts:
            <span className="ml-2 font-medium">{location.facdistcd}</span>
            <span className="ml-4">D S Division:
              <span className="ml-2 font-medium">{location.facagacd}</span>
            </span>
          </p>

          <div className="text-sm text-gray-600">
            <p><strong>1.2.3</strong> Whether land is already procured, if so please submit a copy of the deed</p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>If sale agreement is signed, please submit a copy of the agreement</li>
              <li>If the land is obtained on lease basis, submit a copy of the lease</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 1.3 Ownership */}
      <section>
        <p className="font-semibold">1.3 Ownership of the land/lands:</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 ml-6 mt-3 text-gray-700">
          <label className="flex items-center gap-2">
            <span className="w-5 h-5 border border-gray-600 flex items-center justify-center bg-gray-100 text-sm">
              {location.ownership === "Private" ? "✔" : ""}
            </span>{" "}
            Private
          </label>
          <label className="flex items-center gap-2">
            <span className="w-5 h-5 border border-gray-600 flex items-center justify-center bg-gray-100 text-sm">
              {location.ownership === "State" ? "✔" : ""}
            </span>{" "}
            State
          </label>
          <label className="flex items-center gap-2">
            (Please specify):
            <span className="border-b border-gray-600 w-48 inline-block font-medium">
              {location.ownership !== "Private" && location.ownership !== "State" ? location.ownership : ""}
            </span>
          </label>
        </div>
      </section>

      {/* 1.4 Covered space */}
      <section>
        <p className="font-semibold">
          1.4 Covered space of buildings{" "}
          <span className="font-normal text-sm">(in sq.ft / sq. meters)</span>:
        </p>
        <div className="w-64 mt-2 border-b border-gray-600 pb-1 text-gray-700 font-medium">
          {location.coveredSpace}
        </div>
      </section>
    </div>
  );
};

export default LocationForm;
