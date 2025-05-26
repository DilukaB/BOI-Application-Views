 import React, { useEffect, useState } from 'react';

const ElectricityTable = () => {
  const [electricityData, setElectricityData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setElectricityData(data.electricityList || []))
      .catch((err) => console.error('Error loading electricity data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          3) Electricity Requirements
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left font-medium w-1/3"></th>
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
                    <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">
                      {index === 0 ? (
                        <>
                          <span>A. {displayValue(item.erCode)}</span>
                        </>
                      ) : (
                        <span>B. {displayValue(item.erCode)}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {displayValue(item.commenceProduction)}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {displayValue(item.erCapacity)}
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
    </div>
  );
};

export default ElectricityTable;
