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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b pb-2">
          2.3 Fire Risk
        </h2>

        <p className="text-gray-700 mb-6 font-medium">
          Potentially Inflammable or incendiary materials/process
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
    </div>
  );
};

export default FireRisk;
