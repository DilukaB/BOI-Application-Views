 // src/components/ElectricityTable.js
import React, { useState, useEffect } from 'react';

const ElectricityTable = () => {
  const [electricityList, setElectricityList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setElectricityList(data.electricityList))
      .catch(console.error);
  }, []);

  if (!electricityList.length) return <p>Loading…</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Commence Production</th>
            <th className="border px-4 py-2">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {electricityList.map((row, idx) => (
            <tr key={idx} className={idx % 2 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{row.erCode}</td>
              <td className="border px-4 py-2">{row.commenceProduction}</td>
              <td className="border px-4 py-2">{row.erCapacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectricityTable;

  