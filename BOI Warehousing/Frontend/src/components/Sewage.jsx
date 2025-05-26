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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          6. Sewage / Effluent Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">S.No</th>
                <th className="border px-4 py-2 font-semibold">Nature of Effluent</th>
                <th className="border px-4 py-2 font-semibold">Treatment</th>
                <th className="border px-4 py-2 font-semibold">Method of Disposal</th>
              </tr>
            </thead>
            <tbody>
              {sewageList.length > 0 ? (
                sewageList.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 text-gray-800">{item.swNatureOfEffluent}</td>
                    <td className="border px-4 py-2">{item.swTreatment}</td>
                    <td className="border px-4 py-2">{item.swMethDisposal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-6 text-gray-500 italic">
                    No sewage data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Ensure the disposal method complies with local environmental regulations.
        </p>
      </div>
    </div>
  );
};

export default Sewage;
