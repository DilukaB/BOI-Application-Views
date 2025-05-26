 import React, { useEffect, useState } from 'react';

const SolidWaste = () => {
  const [solidWasteList, setSolidWasteList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setSolidWasteList(data.solidWasteList || []))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mt-4 mb-1">
          3.3 Waste Material
        </h3>
        <p className="italic text-sm text-gray-500 mb-4">
          (a) Solid Waste
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">Sl. No</th>
                <th className="border px-4 py-2 font-semibold">Nature</th>
                <th className="border px-4 py-2 font-semibold text-center">Kg/Day</th>
                <th className="border px-4 py-2 font-semibold">Method for Disposal</th>
              </tr>
            </thead>
            <tbody>
              {solidWasteList.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2">{item.swsno}</td>
                  <td className="border px-4 py-2">{item.swNature}</td>
                  <td className="border px-4 py-2 text-center">{item.swqty}</td>
                  <td className="border px-4 py-2">
                    {item.swTreatment && item.swDisMode
                      ? `${item.swTreatment} → ${item.swDisMode}`
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Include all solid waste generated and its disposal methods.
        </p>
      </div>
    </div>
  );
};

export default SolidWaste;
