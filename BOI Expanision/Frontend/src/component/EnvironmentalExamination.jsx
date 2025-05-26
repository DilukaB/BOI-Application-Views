 import React, { useEffect, useState } from 'react';

const EnvironmentalExamination = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [machineryLists, setMachineryLists] = useState([]);
  const [fuelConsumptions, setFuelConsumptions] = useState([]);
  const [chemicalDetails, setChemicalDetails] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setRawMaterials(data.rawMaterials || []);
        setMachineryLists(data.machineryLists || []);
        setFuelConsumptions(data.fuelConsumptions || []);
        setChemicalDetails(data.chemicalDetails || []);
      })
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-10">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          2). Environmental Examination
        </h2>

        {/* 2.1 Raw - material usage */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">2.1 Raw - material usage</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2 font-medium text-center">#</th>
                  <th className="border px-4 py-2 font-medium text-center">Item</th>
                  <th className="border px-4 py-2 font-medium text-center">Kg. Per Month</th>
                  <th className="border px-4 py-2 font-medium text-center" colSpan={2}>Source</th>
                </tr>
                <tr className="bg-gray-50">
                  <th colSpan={3}></th>
                  <th className="border px-4 py-2 font-medium text-center">Local</th>
                  <th className="border px-4 py-2 font-medium text-center">Imported</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => {
                  const item = rawMaterials[i];
                  return (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                      <td className="border px-4 py-2 text-center">{i + 1}</td>
                      <td className="border px-4 py-2">{displayValue(item?.itemDescription)}</td>
                      <td className="border px-4 py-2 text-center">
                        {item ? `${displayValue(item.quantityPerMonth)} ${displayValue(item.unitPerMonth)}` : ''}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item?.source === 'Local' ? '✔' : ''}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item?.source === 'Imported' ? '✔' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2.2 Machinery */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">2.2 Machinery</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Capacity</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Used</th>
                  <th className="border px-4 py-2">New</th>
                </tr>
              </thead>
              <tbody>
                {machineryLists.map((item, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2 text-center">{i + 1}</td>
                    <td className="border px-4 py-2">{displayValue(item.machineDescription)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.horsePower)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.quantity)}</td>
                    <td className="border px-4 py-2 text-center">{item.condition === 'Used' ? '✔' : ''}</td>
                    <td className="border px-4 py-2 text-center">{item.condition === 'New' ? '✔' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2.4 Fossil Fuel Consumption */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">2.4 Fossil Fuel Consumption</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Equipment</th>
                  <th className="border px-4 py-2">Qty</th>
                  <th className="border px-4 py-2">Petrol</th>
                  <th className="border px-4 py-2">Diesel</th>
                  <th className="border px-4 py-2">Furnace Oil</th>
                  <th className="border px-4 py-2">Kerosene Oil</th>
                </tr>
              </thead>
              <tbody>
                {fuelConsumptions.map((item, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2 text-center">{i + 1}</td>
                    <td className="border px-4 py-2">{displayValue(item.eqpcd)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.noeqp)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.plpermth)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.dlpermth)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.fulpermth)}</td>
                    <td className="border px-4 py-2 text-center">{displayValue(item.klpermth)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2.5 Chemicals / Fertilizer */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">2.5 Chemicals / Fertilizer</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Chemical Name</th>
                  <th className="border px-4 py-2">Purpose</th>
                  <th className="border px-4 py-2">Qty / Month</th>
                </tr>
              </thead>
              <tbody>
                {chemicalDetails.map((item, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                    <td className="border px-4 py-2 text-center">{i + 1}</td>
                    <td className="border px-4 py-2">{displayValue(item.chemicalName)}</td>
                    <td className="border px-4 py-2">{displayValue(item.chPurpose)}</td>
                    <td className="border px-4 py-2 text-center">
                      {item ? `${displayValue(item.chQuentity)} ${displayValue(item.chuom)}` : ''}
                    </td>
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
