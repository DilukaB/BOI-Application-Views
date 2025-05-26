 import React, { useEffect, useState } from 'react';

const Chemicals = () => {
  const [chemicals, setChemicals] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setChemicals(data.chemicalDetails || []))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  // Ensure 7 rows minimum
  const paddedChemicals = [...chemicals];
  while (paddedChemicals.length < 7) {
    paddedChemicals.push({
      chemicalName: '',
      chPurpose: '',
      chuom: '',
      chQuentity: ''
    });
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2 text-indigo-800 border-b pb-2">
          3). Environmental Examination
        </h2>
        <p className="italic text-sm text-gray-500 mb-1">(Please see Annexure II)</p>

        <h3 className="text-lg font-semibold mt-4 mb-1">3.1 Chemicals</h3>
        <p className="italic text-sm text-gray-500 mb-4">
          (Indicate all chemicals including those used in small quantities)
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="border px-4 py-2 font-semibold">#</th>
                <th className="border px-4 py-2 font-semibold">Chemical Name</th>
                <th className="border px-4 py-2 font-semibold">Purpose</th>
                <th className="border px-4 py-2 font-semibold">Qty./Month</th>
              </tr>
            </thead>
            <tbody>
              {paddedChemicals.map((chem, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                >
                  <td className="border px-4 py-2">{index + 1}.</td>
                  <td className="border px-4 py-2">{chem.chemicalName}</td>
                  <td className="border px-4 py-2">{chem.chPurpose}</td>
                  <td className="border px-4 py-2">
                    {chem.chQuentity} {chem.chuom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Include all chemicals, even if used in small quantities.
        </p>
      </div>
    </div>
  );
};

export default Chemicals;
