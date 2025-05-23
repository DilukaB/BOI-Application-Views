 import React, { useState, useEffect } from 'react';

const ElectricityTable = () => {
  const [electricityList, setElectricityList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setElectricityList(data.electricityList || []))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 6: Electricity Requirements
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Type</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Commence Production</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {electricityList.length > 0 ? (
                electricityList.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                  >
                    <td className="px-6 py-4 border border-gray-200">{row.erCode}</td>
                    <td className="px-6 py-4 border border-gray-200">{row.commenceProduction}</td>
                    <td className="px-6 py-4 border border-gray-200">{row.erCapacity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No electricity data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElectricityTable;
