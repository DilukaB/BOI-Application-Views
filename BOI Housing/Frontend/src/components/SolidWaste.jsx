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
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">3.3 Waste Material</h3>
      <p className="mb-4 font-medium">(a) Solid waste</p>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/12 px-4 py-2 text-left text-sm font-medium text-gray-700">Sl. No</th>
              <th className="w-5/12 px-4 py-2 text-left text-sm font-medium text-gray-700">Nature</th>
              <th className="w-3/12 px-4 py-2 text-left text-sm font-medium text-gray-700">K.g. per day</th>
              <th className="w-5/12 px-4 py-2 text-left text-sm font-medium text-gray-700">Method for Disposal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fullList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{item.swsno}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.swNature}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.swqty}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
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
  );
};

export default SolidWaste;
