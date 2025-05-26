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

  // Function to display 0 as '0', undefined/null/empty as 'No Data'
  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        3) Fossil Fuel Consumption (Ltrs/month)
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th rowSpan="2" className="border border-gray-300 px-4 py-2 text-left font-medium">#</th>
              <th rowSpan="2" className="border border-gray-300 px-4 py-2 text-left font-medium">Equipment</th>
              <th rowSpan="2" className="border border-gray-300 px-4 py-2 text-left font-medium">Capacity</th> {/* Added Capacity */}
              <th rowSpan="2" className="border border-gray-300 px-4 py-2 text-left font-medium">Qty.</th>
              <th colSpan="5" className="border border-gray-300 px-4 py-2 text-center font-medium">Type of fuel used</th>
            </tr>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Petrol</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Diesel</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Furnace Oil</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Kerosene Oil</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Biomass</th>
            </tr>
          </thead>
          <tbody>
            {equipmentLabels.map((label, index) => {
              const row = data.find(d => d.eqpcd === label) || {};
              return (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{label}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.capacity)}</td> {/* Capacity */}
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.noeqp)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.plpermth)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.dlpermth)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.fulpermth)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.klpermth)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(row.biomas)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelConsumptions;
