 import React, { useEffect, useState } from 'react';

const ContactOfficer = () => {
  const [contactOfficers, setContactOfficers] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.contactOfficerList) {
          setContactOfficers(data.contactOfficerList);
        }
      })
      .catch((err) => console.error('Failed to fetch data:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        4) Contact Officers
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
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
            {contactOfficers.length > 0 ? (
              contactOfficers.map((officer, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntname}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntAddress}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntTel}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntEmail}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{officer.cntFax}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No contact officer data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactOfficer;
