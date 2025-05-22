 import React, { useEffect, useState } from 'react';

const InvestorsDeclaration = () => {
  const [declarations, setDeclarations] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setDeclarations(data.declarations || []))
      .catch((err) => console.error('Failed to load data.json:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        9) Investors' Declaration & Signature
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
        We certify that the proposal constitutes a new project and does not involve the closure of an
        existing enterprise of a similar nature or the transfer of any assets from an existing enterprise in
        Sri Lanka. <span className="italic">(Attach letter of authority or power of attorney if applicable)</span>
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Name of Investor</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Tel</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Email</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">Fax</th>
            </tr>
          </thead>
          <tbody>
            {declarations.length > 0 ? (
              declarations.map((item, index) => (
                <tr
                  key={item.investorID || index}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.cname}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.ctel}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.ceml}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.cfax}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No investor data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 mb-4 text-base font-semibold text-gray-800">Signatures of Investors</h3>
      <div className="space-y-6 text-sm text-gray-600">
        {declarations.map((item, index) => (
          <div key={item.investorID || index}>
            <div className="mb-1 font-medium text-gray-800">{item.cname}</div>
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-gray-800 font-semibold mr-2">Signature:</span>
                <span className="border-b border-dotted border-gray-400 inline-block w-64 h-5" />
              </div>
              <div>
                <span className="text-gray-800 font-semibold mr-2">Date:</span>
                <span className="border-b border-dotted border-gray-400 inline-block w-40 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorsDeclaration;
