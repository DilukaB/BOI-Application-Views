 import React, { useEffect, useState } from 'react';

const Sewage = () => {
  const [sewageList, setSewageList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setSewageList(data.sewageList || []))
      .catch((err) => console.error('Error loading sewage data:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Sewage Details
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left">No</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Nature of Effluent</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Treatment</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Method of Disposal</th>
            </tr>
          </thead>
          <tbody>
            {sewageList.length > 0 ? (
              sewageList.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-6 py-4">{index + 1}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swNatureOfEffluent}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swTreatment}</td>
                  <td className="border border-gray-300 px-6 py-4">{item.swMethDisposal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No sewage data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sewage;
