 import React from 'react';

const EquipmentTable = ({ equipmentList = [] }) => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-2 text-indigo-800 border-b pb-2">
        2) Equipment  
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Item</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">No. of Items</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Condition</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.length > 0 ? (
                equipmentList.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                  >
                    <td className="px-6 py-4 border border-gray-200 text-gray-800">{item.eqpdes}</td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-700">{item.eqpcap}</td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-700">{item.eqpcnd}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
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
