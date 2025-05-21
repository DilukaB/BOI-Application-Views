import React, { useEffect, useState } from 'react';

const WaterConsumptionTable = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Make sure data.json is in public/ folder
      .then((res) => res.json())
      .then((data) => setWaterData(data.waterConsumptions))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  return (
    <div>
      <h2>4.2 Water Use</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th></th>
            <th>At Commencement of Operation</th>
            <th>At Capacity</th>
          </tr>
        </thead>
        <tbody>
          {waterData.map((item, index) => (
            <tr key={index}>
              <td>{item.useOfWater} (Ltrs/day)</td>
              <td>{item.commenceProduction}</td>
              <td>{item.waterCapacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaterConsumptionTable;
