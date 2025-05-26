 import React, { useEffect, useState } from 'react';

const WaterConsumption = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setWaterData(json.waterConsumptions || []))
      .catch(err => console.error('Failed to load water data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          4. Water Use <span className="text-sm font-medium text-gray-500">(If applicable) – Ltrs/day</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">#</th>
                <th className="border px-4 py-2 font-semibold">Type of Use</th>
                <th className="border px-4 py-2 font-semibold">At Commencement / Production</th>
                <th className="border px-4 py-2 font-semibold">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {waterData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-medium text-gray-800">{displayValue(item.useOfWater)}</td>
                  <td className="border px-4 py-2">{displayValue(item.commenceProduction)}</td>
                  <td className="border px-4 py-2">{displayValue(item.waterCapacity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Please include all sources and anticipated changes based on capacity.
        </p>
      </div>
    </div>
  );
};

export default WaterConsumption;
