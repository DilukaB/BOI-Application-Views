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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Solid Waste Details
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left">S.No</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Nature of solid waste</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Quantity (kg/day)</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Treatment Method</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Method for Disposal</th>
            </tr>
          </thead>
          <tbody>
            {solidWasteData.length > 0 ? (
              solidWasteData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-6 py-4">{item.swsno}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swNature}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swqty}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swTreatment}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swDisMode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No solid waste data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolidWaste;
