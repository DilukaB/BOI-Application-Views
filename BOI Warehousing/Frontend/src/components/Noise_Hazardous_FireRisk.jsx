 import React, { useEffect, useState } from 'react';

const Noise_Hazardous_FireRisk = () => {
  const [noiseList, setNoiseList] = useState([]);
  const [hazardousList, setHazardousList] = useState([]);
  const [fireRiskList, setFireRiskList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setNoiseList(data.noiseList || []);
        setHazardousList(data.hazardousList || []);
        setFireRiskList(data.fireRiskList || []);
      })
      .catch((err) => console.error('Failed to load data.json:', err));
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-sm text-gray-800">
      <h2 className="text-2xl font-semibold mb-6">3.4 Noise / Vibration</h2>
      <p className="mb-4 text-gray-700">
        High intensity noise and/or vibration generating machinery/equipment <span className="italic">(Please specify)</span>
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1">
        {noiseList.flatMap((noise, noiseIdx) =>
          noise.niceDescription.map((desc, idx) => (
            <li key={`noise-${noiseIdx}-${idx}`}>{desc.description}</li>
          ))
        )}
        {noiseList.length === 0 && <li className="text-gray-500">No data available</li>}
      </ol>

      <h2 className="text-2xl font-semibold mb-6 mt-10">3.5 Hazardous Materials</h2>
      <p className="mb-4 text-gray-700">
        Potentially dangerous injurious substances/processed <span className="italic">(Please specify)</span>
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1">
        {hazardousList.map((hazard, index) => (
          <li key={`hazard-${index}`}>{hazard.hazardousDes}</li>
        ))}
        {hazardousList.length === 0 && <li className="text-gray-500">No data available</li>}
      </ol>

      <h2 className="text-2xl font-semibold mb-6 mt-10">3.6 Fire Risk</h2>
      <p className="mb-4 text-gray-700">
        Potentially inflammable or incendiary materials/process
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        {fireRiskList.map((fire, index) => (
          <li key={`fire-${index}`}>{fire.fireRiskDescription}</li>
        ))}
        {fireRiskList.length === 0 && <li className="text-gray-500">No data available</li>}
      </ol>
    </div>
  );
};

export default Noise_Hazardous_FireRisk;
