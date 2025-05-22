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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        3.2 Water Use (Liters / day)
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left">Use of Water</th>
              <th className="border border-gray-300 px-6 py-3 text-left">At Commencement of Production</th>
              <th className="border border-gray-300 px-6 py-3 text-left">At Capacity</th>
            </tr>
          </thead>
          <tbody>
            {waterData.length > 0 ? (
              waterData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-6 py-4">{item.useOfWater}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.commenceProduction}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.waterCapacity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5 text-gray-500">
                  No water usage data found.
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
