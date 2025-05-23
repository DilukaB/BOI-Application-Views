 import React, { useEffect, useState } from 'react';

const EnvironmentalExamination = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [waterUse, setWaterUse] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setRawMaterials(data.rawMaterials || []);
        setMachinery(data.machineryLists || []);
        setWaterUse(data.waterConsumptions || []);
      })
      .catch((err) => console.error('Failed to load environmental data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-10">
      {/* 3.1 Raw - Material Usage */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3.1 Raw - Material Usage
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Item</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Kg Per Month</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Source (Local/Imported)</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.itemDescription)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.quantityPerMonth)} {item.unitPerMonth}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.source)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.2 Machinery & Equipment */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3.2 Machinery & Equipment
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Item</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">HP</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">No. of Items</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Condition (Used/New)</th>
              </tr>
            </thead>
            <tbody>
              {machinery.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.machineDescription)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.horsePower)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.quantity)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.condition)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.4 Water Use (Ltrs/Day) */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          3.4 Water Use (Ltrs/Day)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Item</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Commencement of Production</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Capacity</th>
              </tr>
            </thead>
            <tbody>
              {waterUse.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.useOfWater)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.commenceProduction)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.waterCapacity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalExamination;
