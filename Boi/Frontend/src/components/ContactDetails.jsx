import React from 'react';

const ContactDetails = ({ data }) => {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Contact Details</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border p-3 text-left">Investor ID</th>
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Designation</th>
                            <th className="border p-3 text-left">Address</th>
                            <th className="border p-3 text-left">Phone</th>
                            <th className="border p-3 text-left">Fax</th>
                            <th className="border p-3 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((contact, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 || index !== 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                            >
                                <td className="border p-3">{contact.investorID}</td>
                                <td className="border p-3">{contact.cname}</td>
                                <td className="border p-3">{contact.designation}</td>
                                <td className="border p-3">
                                    {contact.cadD1}, {contact.cadD2}, {contact.cadD3}
                                </td>
                                <td className="border p-3">{contact.ctel}</td>
                                <td className="border p-3">{contact.cfax}</td>
                                <td className="border p-3 text-blue-600 hover:underline cursor-pointer">
                                    {contact.ceml}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactDetails;