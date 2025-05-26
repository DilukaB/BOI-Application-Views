 import React, { useEffect, useState } from 'react';

const WaterConsumptionTable = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setWaterData(data.waterConsumptions || []))
      .catch((err) => console.error('Failed to load water consumption data', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mt-4 mb-1">
          3.2 Water Use <span className="text-sm font-medium text-gray-500">(Liters/day)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">Use of Water</th>
                <th className="border px-4 py-2 font-semibold">At Commencement of Production</th>
                <th className="border px-4 py-2 font-semibold">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {waterData.length > 0 ? (
                waterData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-4 py-2 text-gray-800">{item.useOfWater}</td>
                    <td className="border px-4 py-2 text-gray-700">{item.commenceProduction}</td>
                    <td className="border px-4 py-2 text-gray-700">{item.waterCapacity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-6 text-gray-500 italic">
                    No water usage data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Provide estimates based on current and projected production usage.
        </p>
      </div>
    </div>
  );
};

export default WaterConsumptionTable;
