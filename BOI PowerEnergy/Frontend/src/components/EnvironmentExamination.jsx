 import React, { useEffect, useState } from 'react';

const EnvironmentExamination = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  if (!data) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        5) Environment Examination
      </h2>

      {/* 5.1 Waste Water */}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">5.1 Waste Water</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Quantity (Ltrs/Day)</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Treatment</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Method for Disposal</th>
            </tr>
          </thead>
          <tbody>
            {data.wasteWaterList.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.wwsno)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.wwVolume)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.wwTreatment)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.wwDisposalMode)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5.2 Solid Waste */}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">5.2 (a) Solid Waste</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Nature</th>
              <th className="border border-gray-300 px-4 py-2">Kg. per day</th>
              <th className="border border-gray-300 px-4 py-2">Treatment</th>
              <th className="border border-gray-300 px-4 py-2">Method for Disposal</th>
            </tr>
          </thead>
          <tbody>
            {data.solidWasteList.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swsno)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swNature)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swqty)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swTreatment)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swDisMode)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Air Emissions */}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Air Emissions Envisaged</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Air Emission Envisaged</th>
              <th className="border border-gray-300 px-4 py-2">Methodology Proposed for Control</th>
            </tr>
          </thead>
          <tbody>
            {data.airEmissionsDetails.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.aEenvisagedSQNO)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.aeMethodologyControl)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5.4 Sewage */}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">5.4 Sewage</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nature of Effluent</th>
              <th className="border border-gray-300 px-4 py-2">Treatment</th>
              <th className="border border-gray-300 px-4 py-2">Method of Disposal</th>
            </tr>
          </thead>
          <tbody>
            {data.sewageList.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swNatureOfEffluent)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swTreatment)}</td>
                <td className="border border-gray-300 px-4 py-2">{displayValue(item.swMethDisposal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnvironmentExamination;
