 import React, { useEffect, useState } from 'react';

const WaterConsumptionTable = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Ensure data.json is in the public folder
      .then((res) => res.json())
      .then((data) => setWaterData(data.waterConsumptions))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        4.2 Water Use
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">Use of Water (Ltrs/day)</th>
              <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">At Commencement of Operation</th>
              <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">At Capacity</th>
            </tr>
          </thead>
          <tbody>
            {waterData.length > 0 ? (
              waterData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border-x border-gray-300 px-6 py-4 text-gray-800">{item.useOfWater}</td>
                  <td className="border-x border-gray-300 px-6 py-4 text-gray-700">{item.commenceProduction}</td>
                  <td className="border-x border-gray-300 px-6 py-4 text-gray-700">{item.waterCapacity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5 text-gray-500">
                  No water consumption data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterConsumptionTable;
