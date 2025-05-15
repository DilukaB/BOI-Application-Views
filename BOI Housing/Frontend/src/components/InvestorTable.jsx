import React from 'react';

const InvestorTable = ({ investorList }) => {
    if (!investorList || investorList.length === 0) {
        return (
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md">
                No investor data available.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Investor Information</h2>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                We certify that the proposal constitutes a new project and does not involve the closure of an existing
                enterprise of a similar nature or the transfer of any assets from an existing enterprise in Sri Lanka.
                <span className="font-medium"> (Attach letter of authority or power of attorney if applicable.)</span>
            </p>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Name</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Telephone</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Email</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Fax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investorList.map((inv, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="border border-gray-300 px-6 py-4 text-gray-800">{inv.invName}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{inv.invTel}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{inv.invEmail}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{inv.invFax}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Signature and Date Section */}
            <div className="mt-10 space-y-10">
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
        </div>
    );
};

export default InvestorTable;
