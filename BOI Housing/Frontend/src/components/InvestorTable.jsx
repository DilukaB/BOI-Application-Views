 import React from 'react';

const InvestorTable = ({ investorList }) => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-2 text-indigo-800 border-b pb-2">
       6) Investor's declaration & signature
      </h2>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
        We certify that the proposal constitutes a new project and does not involve the closure of an existing
        enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka.
        <span className="font-medium"> (Attach letter of authority or power of attorney if applicable.)</span>
      </p>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        {!investorList || investorList.length === 0 ? (
          <div className="text-center text-yellow-700 bg-yellow-50 border border-yellow-300 p-4 rounded-md">
            No investor data available.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 border border-gray-300 font-semibold">Name</th>
                    <th className="px-6 py-3 border border-gray-300 font-semibold">Telephone</th>
                    <th className="px-6 py-3 border border-gray-300 font-semibold">Email</th>
                    <th className="px-6 py-3 border border-gray-300 font-semibold">Fax</th>
                  </tr>
                </thead>
                <tbody>
                  {investorList.map((inv, index) => (
                    <tr
                      key={index}
                      className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                    >
                      <td className="px-6 py-4 border border-gray-200">{inv.invName}</td>
                      <td className="px-6 py-4 border border-gray-200">{inv.invTel}</td>
                      <td className="px-6 py-4 border border-gray-200">{inv.invEmail}</td>
                      <td className="px-6 py-4 border border-gray-200">{inv.invFax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signature and Date Section */}
            <div className="space-y-10 mt-10">
              {investorList.map((inv, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                  <p className="text-gray-800 font-medium mb-4">Investor: {inv.invName}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Signature of Investor</p>
                      <div className="border-b border-dotted border-gray-500 w-full h-6" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Date</p>
                      <div className="border-b border-dotted border-gray-500 w-full h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorTable;
