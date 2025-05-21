 import React, { useEffect, useState } from 'react';

const ElectricityTable = () => {
  const [electricityData, setElectricityData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setElectricityData(data.electricityList || []))
      .catch((err) => console.error('Error loading electricity data:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        3) Electricity Requirements
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium"></th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">
                At Commencement of Operation
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium">
                At Capacity
              </th>
            </tr>
          </thead>
          <tbody>
            {electricityData.length > 0 ? (
              electricityData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">
                    {index === 0 ? (
                      <span>
                         <br />
                        A. <span>{item.erCode}</span>
                      </span>
                    ) : (
                      <span>B. {item.erCode}</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">
                    {item.commenceProduction}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-700">
                    {item.erCapacity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5 text-gray-500">
                  No electricity data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectricityTable;
