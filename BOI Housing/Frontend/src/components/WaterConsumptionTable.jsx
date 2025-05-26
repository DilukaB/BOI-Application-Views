 import React from 'react';

const WaterConsumptionTable = ({ waterConsumptions }) => {
  if (!waterConsumptions || waterConsumptions.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          No water consumption data available.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3  className="text-lg font-semibold mt-4 mb-1">
          3.2 Water Use (Liters/Day)
        </h3>
        <p className="italic text-sm text-gray-500 mb-4">
          (Indicate water usage at various stages)
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">Use of Water</th>
                <th className="border px-4 py-2 font-semibold text-center">At Commencement of Construction</th>
                <th className="border px-4 py-2 font-semibold text-center">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {waterConsumptions.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2">{item.useOfWater}</td>
                  <td className="border px-4 py-2 text-center">{item.commenceProduction}</td>
                  <td className="border px-4 py-2 text-center">{item.waterCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Provide separate figures for different stages of project lifecycle.
        </p>
      </div>
    </div>
  );
};

export default WaterConsumptionTable;
