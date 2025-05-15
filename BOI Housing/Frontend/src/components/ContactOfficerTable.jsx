import React from 'react';

const ContactOfficerTable = ({ contactOfficerList }) => {
    if (!contactOfficerList || contactOfficerList.length === 0) {
        return <div className="text-center text-gray-600">No contact officer data available.</div>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Officers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Name</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Address</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Telephone</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Email</th>
                            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Fax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactOfficerList.map((officer, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntname}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{officer.cntAddress}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{officer.cntTel}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{officer.cntEmail}</td>
                                <td className="border border-gray-300 px-6 py-4 text-gray-700">{officer.cntFax}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactOfficerTable;
