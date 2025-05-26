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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          6) Investors' Declaration & Signature
        </h2>

        <p className="text-gray-700 leading-relaxed text-sm">
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
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.ctel || 'N/A'}</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.ceml || 'N/A'}</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.cfax || 'N/A'}</td>
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

        <div className="pt-6 border-t">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Signatures of Investors
          </h3>
          <div className="space-y-6 text-sm text-gray-600">
            {declarations.map((item, index) => (
              <div key={item.investorID || index}>
                <div className="mb-1 font-medium text-gray-800">{item.cname}</div>
                <div className="flex flex-wrap items-center gap-8">
                  <div>
                    <span className="text-gray-800 font-semibold mr-2">Signature:</span>
                    <span className="border-b border-dotted border-gray-400 inline-block w-64 h-5 align-bottom" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-semibold mr-2">Date:</span>
                    <span className="border-b border-dotted border-gray-400 inline-block w-40 h-5 align-bottom" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestorsDeclaration;
