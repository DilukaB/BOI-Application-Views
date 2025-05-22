 import React, { useEffect, useState } from 'react';

const Machenary = () => {
  const [machinery, setMachinery] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setMachinery(data.machineryLists || []))
      .catch((err) => console.error('Error loading machinery data:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        4) Machinery List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Item</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">HP</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">No.of items</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Condition(Used/New)</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {machinery.length > 0 ? (
              machinery.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.machineDescription}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.horsePower}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.quantity}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.condition}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">
                    ${item.machineryValue?.toLocaleString() ?? 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No machinery data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Machenary;
