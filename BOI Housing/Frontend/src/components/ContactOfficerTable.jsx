 import React from 'react';

const ContactOfficerTable = ({ contactOfficerList }) => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 7: Contact Officers
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        {(!contactOfficerList || contactOfficerList.length === 0) ? (
          <div className="text-center text-gray-500 py-6">
            No contact officer data available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 border border-gray-300 font-semibold">Name</th>
                  <th className="px-6 py-3 border border-gray-300 font-semibold">Address</th>
                  <th className="px-6 py-3 border border-gray-300 font-semibold">Telephone</th>
                  <th className="px-6 py-3 border border-gray-300 font-semibold">Email</th>
                  <th className="px-6 py-3 border border-gray-300 font-semibold">Fax</th>
                </tr>
              </thead>
              <tbody>
                {contactOfficerList.map((officer, index) => (
                  <tr
                    key={index}
                    className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                  >
                    <td className="px-6 py-4 border border-gray-200">{officer.cntname}</td>
                    <td className="px-6 py-4 border border-gray-200">{officer.cntAddress}</td>
                    <td className="px-6 py-4 border border-gray-200">{officer.cntTel}</td>
                    <td className="px-6 py-4 border border-gray-200">{officer.cntEmail}</td>
                    <td className="px-6 py-4 border border-gray-200">{officer.cntFax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactOfficerTable;
