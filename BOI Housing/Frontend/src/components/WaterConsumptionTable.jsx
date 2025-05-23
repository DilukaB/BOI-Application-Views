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
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 3: Water Use (Liters/Day)
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-left">Use of Water</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-center">At Commencement of Construction</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-center">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {waterConsumptions.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                >
                  <td className="px-6 py-4 border border-gray-200">{item.useOfWater}</td>
                  <td className="px-6 py-4 border border-gray-200 text-center">{item.commenceProduction}</td>
                  <td className="px-6 py-4 border border-gray-200 text-center">{item.waterCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaterConsumptionTable;
