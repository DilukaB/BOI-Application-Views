 import React, { useEffect, useState } from 'react';

const SolidWaste = () => {
  const [solidWasteData, setSolidWasteData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setSolidWasteData(data.solidWasteList || []))
      .catch((err) => console.error('Error loading solid waste data:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          5. Solid Waste Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">S.No</th>
                <th className="border px-4 py-2 font-semibold">Nature of Solid Waste</th>
                <th className="border px-4 py-2 font-semibold">Quantity (kg/day)</th>
                <th className="border px-4 py-2 font-semibold">Treatment Method</th>
                <th className="border px-4 py-2 font-semibold">Method for Disposal</th>
              </tr>
            </thead>
            <tbody>
              {solidWasteData.length > 0 ? (
                solidWasteData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-4 py-2">{item.swsno}</td>
                    <td className="border px-4 py-2 text-gray-800">{item.swNature}</td>
                    <td className="border px-4 py-2">{item.swqty}</td>
                    <td className="border px-4 py-2">{item.swTreatment}</td>
                    <td className="border px-4 py-2">{item.swDisMode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-6 text-gray-500 italic">
                    No solid waste data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Include details about biodegradable and non-biodegradable waste if applicable.
        </p>
      </div>
    </div>
  );
};

export default SolidWaste;
