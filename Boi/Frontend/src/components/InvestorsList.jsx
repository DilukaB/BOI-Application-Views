import React, { useState } from 'react';

const InvestorsList = ({ data }) => {
    const [selectedInvestor, setSelectedInvestor] = useState(null);

    const toggleDetails = (index) => {
        setSelectedInvestor(selectedInvestor === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Particulars of Investors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((inv, index) => (
                    <div
                        key={index}
                        className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 ${selectedInvestor === index
                            ? 'border-blue-500 shadow-lg bg-blue-50'
                            : 'border-gray-200 shadow-md hover:shadow-lg'
                            }`}
                        onClick={() => toggleDetails(index)}
                    >
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-blue-700">Investor {index + 1}</h3>
                                <p className="text-gray-600 font-medium mt-1">{inv.shdname}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-inner text-right">
                                <p className="text-sm text-gray-500 font-medium">Equity Contribution</p>
                                <div className="flex items-center justify-end space-x-3 mt-1">
                                    <span className="text-lg font-bold text-blue-600">
                                        ${inv.equity}M
                                    </span>
                                    <span className="text-gray-500">|</span>
                                    <span className="text-lg font-bold text-green-600">
                                        {inv.eqtypct}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Conditional Rendering */}
                        {selectedInvestor === index ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Citizenship</h4>
                                        <p className="mt-1">{inv.citizen}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">ID/Passport</h4>
                                        <p className="mt-1">{inv.invtidno}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h4>
                                    <p className="mt-1">
                                        {[inv.shdadD1, inv.shdadD2, inv.shdadD3, inv.shdadD4].filter(Boolean).join(', ')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Telephone</h4>
                                        <p className="mt-1">{inv.shdtel || '—'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Fax</h4>
                                        <p className="mt-1">{inv.shdfax || '—'}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</h4>
                                    <p className="mt-1 text-blue-600">{inv.shdeml || '—'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Current Business Interests</h4>
                                    <p className="mt-1">{inv.businessInterest}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Previous BOI Projects</h4>
                                        <p className="mt-1">{inv.companyProfile || 'None'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Other BOI Interests</h4>
                                        <p className="mt-1">{inv.interestProj || 'None'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-gray-500 font-medium w-32 flex-shrink-0">Citizenship:</span>
                                    <span>{inv.citizen}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-gray-500 font-medium w-32 flex-shrink-0">ID/Passport:</span>
                                    <span>{inv.invtidno}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-gray-500 font-medium w-32 flex-shrink-0">Contact:</span>
                                    <span>
                                        {inv.shdtel || '—'} {inv.fax ? ` / Fax: ${inv.fax}` : ''}
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-gray-500 font-medium w-32 flex-shrink-0">Email:</span>
                                    <span className="text-blue-600">{inv.shdeml || '—'}</span>
                                </div>
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <p className="text-gray-500 font-medium">Business Interests:</p>
                                    <p className="line-clamp-2">{inv.businessInterest}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDetails(index);
                                }}
                            >
                                {selectedInvestor === index ? 'Show Less' : 'Show Full Details'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestorsList;