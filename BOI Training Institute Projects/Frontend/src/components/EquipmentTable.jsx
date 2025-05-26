 import React, { useEffect, useState } from 'react';

const EquipmentTable = () => {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setEquipmentList(data.equipmentList || []))
      .catch((error) => console.error('Error fetching equipment data:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          4. Equipment (Construction Related)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">Item</th>
                <th className="border px-4 py-2 font-semibold">No. of Items</th>
                <th className="border px-4 py-2 font-semibold">Condition</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.length > 0 ? (
                equipmentList.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-4 py-2 text-gray-800">{item.eqpdes}</td>
                    <td className="border px-4 py-2 text-gray-700">{item.eqpcap}</td>
                    <td className="border px-4 py-2 text-gray-700">{item.eqpcnd}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-5 text-gray-500">
                    No equipment added yet.
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

export default EquipmentTable;
