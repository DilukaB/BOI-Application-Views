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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-10">
      <h2 className="text-2xl font-semibold text-gray-800">5) Environmental Examination</h2>

      {/* 5.1 Waste Water */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">5.1 Waste Water</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
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
      </section>

      {/* 5.2 Solid Waste */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">5.2 (a) Solid Waste</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Nature</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Kg/Day</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Treatment</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Disposal Method</th>
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
      </section>

      {/* 5.3 Air Emissions */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">5.3 Air Emissions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Air Emission Envisaged</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Methodology Proposed for Control</th>
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
      </section>

      {/* 5.4 Sewage */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">5.4 Sewage</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Nature of Effluent</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Treatment</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Method of Disposal</th>
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
      </section>
    </div>
  );
};

export default EnvironmentalExamination;
