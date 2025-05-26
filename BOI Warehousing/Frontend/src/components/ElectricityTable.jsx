 import React, { useEffect, useState } from 'react';

const ElectricityTable = () => {
  const [electricityData, setElectricityData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setElectricityData(data.electricityList || []))
      .catch((err) => console.error('Error loading electricity data:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          3) Electricity Requirements
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-6 py-3 font-semibold"></th>
                <th className="border px-6 py-3 font-semibold">
                  At Commencement of Operation
                </th>
                <th className="border px-6 py-3 font-semibold">
                  At Capacity
                </th>
              </tr>
            </thead>
            <tbody>
              {electricityData.length > 0 ? (
                electricityData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-6 py-4 text-indigo-700 whitespace-nowrap font-semibold">
                      {index === 0 ? `A. ${item.erCode}` : `B. ${item.erCode}`}
                    </td>
                    <td className="border px-6 py-4 text-gray-700 whitespace-nowrap">
                      {item.commenceProduction}
                    </td>
                    <td className="border px-6 py-4 text-gray-700 whitespace-nowrap">
                      {item.erCapacity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-5 text-gray-500 italic">
                    No electricity data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Provide relevant electricity consumption details.
        </p>
      </div>
    </div>
  );
};

export default ElectricityTable;
