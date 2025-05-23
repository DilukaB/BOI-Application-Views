 import React, { useEffect, useState } from 'react';

const EnvironmentalExamination_ii = () => {
  const [data, setData] = useState({
    solidWasteList: [],
    sewageList: [],
    electricityList: [],
  });

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load environmental data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-10 text-sm">
      
      {/* 3.5 Waste Products - Solid Waste */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3.5 Waste Products</h2>
        <h3 className="text-lg font-medium text-gray-700 mb-2">(a) Solid Waste</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Nature of Waste</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Nature</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">K.g. per day</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Method for Disposal</th>
              </tr>
            </thead>
            <tbody>
              {data.solidWasteList.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swNature)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swTreatment)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swqty)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swDisMode)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.5 Waste Products - Sewage */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">(b) Sewage</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Nature of Effluents</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Treatment</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Method of Disposal</th>
              </tr>
            </thead>
            <tbody>
              {data.sewageList.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swNatureOfEffluent)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swTreatment)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.swMethDisposal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Electricity Requirements */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Electricity Requirements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium"></th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Commencement of Production</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {data.electricityList.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.erCode)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.commenceProduction)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.erCapacity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default EnvironmentalExamination_ii;
