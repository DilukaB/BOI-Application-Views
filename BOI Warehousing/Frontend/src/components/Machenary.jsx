 import React, { useEffect, useState } from 'react';

const Machenary = () => {
  const [machinery, setMachinery] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setMachinery(data.equipmentList || []))
      .catch((err) => console.error('Error loading machinery data:', err));
  }, []);

  if (machinery.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading machinery data...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          4. Machinery List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">Item Description</th>
                <th className="border px-4 py-2 font-semibold">Horse Power (HP)</th>
                <th className="border px-4 py-2 font-semibold">No of Items</th>
                <th className="border px-4 py-2 font-semibold">Condition (used/new)</th>
                <th className="border px-4 py-2 font-semibold">Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              {machinery.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2 text-gray-800">{item.eqpdes}</td>
                  <td className="border px-4 py-2 text-gray-700">{item.eqppwr}</td>
                  <td className="border px-4 py-2 text-gray-700">{item.eqpcap}</td>
                  <td className="border px-4 py-2 text-gray-700">{item.eqpcnd}</td>
                  <td className="border px-4 py-2 text-gray-700 font-medium">
                    ${item.machineryValue?.toLocaleString() ?? '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Ensure all machinery details are accurate and up to date.
        </p>
      </div>
    </div>
  );
};

export default Machenary;
