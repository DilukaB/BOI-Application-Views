import React from 'react';

const InvestmentDocumentChecklist = () => {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-3">
                Annexure I
            </h2>

            <p className="text-lg text-gray-700 font-medium mb-8">
                The following documents should be forwarded along with the Investment Application:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Investment Section */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 border-l-4 border-blue-600 pl-4">
                        Investment
                    </h3>
                    <ol className="list-decimal list-inside space-y-5 text-gray-700 text-[15px] pl-2">
                        <li>
                            <span className="font-medium">Brief project description</span><br />
                            <span className="text-gray-600 block mt-1">
                                (In case project investment is less than US $500,000)<br />
                                <span className="italic text-sm text-blue-700">
                                    ** A project report should be forwarded for investment over US $500,000
                                </span>
                            </span>
                        </li>
                        <li>Bank References of Investors</li>
                        <li>
                            Audited Financial Statements<br />
                            <span className="text-gray-600 text-sm">
                                (If an existing company is submitting the application)
                            </span>
                        </li>
                        <li>
                            Investor Company Profile<br />
                            <span className="text-gray-600 text-sm">
                                (If an existing company is submitting the application)
                            </span>
                        </li>
                        <li>
                            Process Floor Chart (if any)<br />
                            <span className="text-gray-600 text-sm">
                                (In case of a manufacturing company)
                            </span>
                        </li>
                        <li>
                            If the products are exported under preferential trade arrangement / agreements, please submit:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600 text-sm">
                                <li>HS code of raw material imported and finished goods</li>
                                <li>Certified statement of value addition</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                {/* Location Section */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-4 border-l-4 border-blue-600 pl-4">
                        Location
                    </h3>
                    <ol start={7} className="list-decimal list-inside space-y-5 text-gray-700 text-[15px] pl-2">
                        <li>Copy of a Survey Plan / Floor Plan of the existing building</li>
                        <li>Letter of Consent from land owner regarding release of land</li>
                        <li>Street Line Certificate</li>
                        <li>Sketch showing access to the site</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default InvestmentDocumentChecklist;
