  import React, { useEffect, useState } from 'react';

const FuelConsumptions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setData(json.fuelConsumptions || []))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  const equipmentLabels = [
    'Electricity / Generator',
    'Furnace/s',
    'Boiler/s',
    'Others (Pl. specify)',
  ];

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          3. Fossil Fuel Consumption <span className="text-sm font-medium text-gray-500">(Ltrs/month)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th rowSpan="2" className="border px-4 py-2 font-semibold">#</th>
                <th rowSpan="2" className="border px-4 py-2 font-semibold">Equipment</th>
                <th rowSpan="2" className="border px-4 py-2 font-semibold">Capacity</th>
                <th rowSpan="2" className="border px-4 py-2 font-semibold">Qty.</th>
                <th colSpan="5" className="border px-4 py-2 text-center font-semibold">Type of fuel used</th>
              </tr>
              <tr>
                <th className="border px-4 py-2 font-semibold">Petrol</th>
                <th className="border px-4 py-2 font-semibold">Diesel</th>
                <th className="border px-4 py-2 font-semibold">Furnace Oil</th>
                <th className="border px-4 py-2 font-semibold">Kerosene Oil</th>
                <th className="border px-4 py-2 font-semibold">Biomass</th>
              </tr>
            </thead>
            <tbody>
              {equipmentLabels.map((label, index) => {
                const row = data.find(d => d.eqpcd === label) || {};
                return (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 font-medium text-gray-800">{label}</td>
                    <td className="border px-4 py-2">{displayValue(row.capacity)}</td>
                    <td className="border px-4 py-2">{displayValue(row.noeqp)}</td>
                    <td className="border px-4 py-2">{displayValue(row.plpermth)}</td>
                    <td className="border px-4 py-2">{displayValue(row.dlpermth)}</td>
                    <td className="border px-4 py-2">{displayValue(row.fulpermth)}</td>
                    <td className="border px-4 py-2">{displayValue(row.klpermth)}</td>
                    <td className="border px-4 py-2">{displayValue(row.biomas)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic text-gray-500 mt-4">
          Note: Specify other fuel types if applicable and include consumption estimates.
        </p>
      </div>
    </div>
  );
};

export default FuelConsumptions;
