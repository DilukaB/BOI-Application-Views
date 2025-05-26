 import React, { useEffect, useState } from 'react';

const ElectricityTable = () => {
  const [electricityData, setElectricityData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setElectricityData(json.electricityList || []))
      .catch(err => console.error('Failed to load electricity data:', err));
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
          3. Electricity Requirement
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">#</th>
                <th className="border px-4 py-2 font-semibold">Power (KVA)</th>
                <th className="border px-4 py-2 font-semibold">At Commencement of Production</th>
                <th className="border px-4 py-2 font-semibold">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {electricityData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-medium text-gray-800">{displayValue(item.erCode)}</td>
                  <td className="border px-4 py-2">{displayValue(item.commenceProduction)}</td>
                  <td className="border px-4 py-2">{displayValue(item.erCapacity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Indicate electricity requirement at different stages of operation.
        </p>
      </div>
    </div>
  );
};

export default ElectricityTable;
