 import React, { useEffect, useState } from 'react';

const FireRisk = () => {
  const [fireRisks, setFireRisks] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setFireRisks(data.fireRiskList || []);
      })
      .catch((error) => {
        console.error('Error fetching fire risk data:', error);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        <span className="font-bold">2.3 Fire Risk</span>{' '}
        <span className="text-red-500">(Other details)</span>
      </h2>

      <p className="text-gray-700 mb-4 font-medium">
        Potentially Inflammable or incendiary materials/ process
      </p>

      <ol className="list-decimal pl-6 text-gray-800 space-y-2">
        {fireRisks.length > 0 ? (
          fireRisks.map((item, index) => (
            <li key={index} className="ml-2">
              {item.fireRiskDescription}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No fire risk data available.</li>
        )}
      </ol>
    </div>
  );
};

export default FireRisk;
