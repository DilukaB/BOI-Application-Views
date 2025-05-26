 import React, { useEffect, useState } from 'react';

const EnvironmentalExamination = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-10">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          5. Environmental Examination
        </h2>

        {/* 5.1 Waste Water */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">5.1 Waste Water</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2 font-medium">Type</th>
                  <th className="border px-4 py-2 font-medium">Quantity (Ltrs/Day)</th>
                  <th className="border px-4 py-2 font-medium">Treatment</th>
                  <th className="border px-4 py-2 font-medium">Method for Disposal</th>
                </tr>
              </thead>
              <tbody>
                {data.wasteWaterList.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2">{displayValue(item.wwsno)}</td>
                    <td className="border px-4 py-2">{displayValue(item.wwVolume)}</td>
                    <td className="border px-4 py-2">{displayValue(item.wwTreatment)}</td>
                    <td className="border px-4 py-2">{displayValue(item.wwDisposalMode)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5.2 Solid Waste */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">5.2 (a) Solid Waste</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2 font-medium">Type</th>
                  <th className="border px-4 py-2 font-medium">Nature</th>
                  <th className="border px-4 py-2 font-medium">Kg/Day</th>
                  <th className="border px-4 py-2 font-medium">Treatment</th>
                  <th className="border px-4 py-2 font-medium">Disposal Method</th>
                </tr>
              </thead>
              <tbody>
                {data.solidWasteList.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2">{displayValue(item.swsno)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swNature)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swqty)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swTreatment)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swDisMode)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5.3 Air Emissions */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">5.3 Air Emissions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2 font-medium">Air Emission Envisaged</th>
                  <th className="border px-4 py-2 font-medium">Methodology Proposed for Control</th>
                </tr>
              </thead>
              <tbody>
                {data.airEmissionsDetails.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2">{displayValue(item.aEenvisagedSQNO)}</td>
                    <td className="border px-4 py-2">{displayValue(item.aeMethodologyControl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5.4 Sewage */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">5.4 Sewage</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2 font-medium">Nature of Effluent</th>
                  <th className="border px-4 py-2 font-medium">Treatment</th>
                  <th className="border px-4 py-2 font-medium">Method of Disposal</th>
                </tr>
              </thead>
              <tbody>
                {data.sewageList.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2">{displayValue(item.swNatureOfEffluent)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swTreatment)}</td>
                    <td className="border px-4 py-2">{displayValue(item.swMethDisposal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnvironmentalExamination;
