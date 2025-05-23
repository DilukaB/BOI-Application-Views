 import React, { useEffect, useState } from 'react';

const SolidWaste = () => {
  const [solidWasteList, setSolidWasteList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setSolidWasteList(data.solidWasteList))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Ensure 5 rows (pad with empty ones)
  const fullList = [...solidWasteList];
  while (fullList.length < 5) {
    fullList.push({
      swsno: (fullList.length + 1).toString(),
      swNature: '',
      swqty: '',
      swTreatment: '',
      swDisMode: ''
    });
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 3.3: Waste Material
      </h2>

      <div className="mb-4 font-medium text-gray-700">
        (a) Solid Waste
      </div>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Sl. No</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Nature</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Kg/day</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold">Method for Disposal</th>
              </tr>
            </thead>
            <tbody>
              {fullList.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                >
                  <td className="px-6 py-4 border border-gray-200">{item.swsno}</td>
                  <td className="px-6 py-4 border border-gray-200">{item.swNature}</td>
                  <td className="px-6 py-4 border border-gray-200">{item.swqty}</td>
                  <td className="px-6 py-4 border border-gray-200">
                    {item.swTreatment && item.swDisMode
                      ? `${item.swTreatment} → ${item.swDisMode}`
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolidWaste;
