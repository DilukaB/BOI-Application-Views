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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Noise Section */}
        <h2 className="text-2xl font-bold text-indigo-800 border-b border-indigo-300 pb-2 mb-6">
          3.4 Noise / Vibration
        </h2>
        <p className="mb-4 text-gray-700">
          High intensity noise and/or vibration generating machinery/equipment{' '}
          <span className="italic">(Please specify)</span>
        </p>
        <ol className="list-decimal pl-6 mb-8 space-y-2">
          {noiseList.length > 0 ? (
            noiseList.flatMap((noise, noiseIdx) =>
              noise.niceDescription.map((desc, idx) => (
                <li key={`noise-${noiseIdx}-${idx}`} className="text-gray-900">
                  {desc.description}
                </li>
              ))
            )
          ) : (
            <li className="text-gray-500 italic">No data available.</li>
          )}
        </ol>

        {/* Hazardous Materials Section */}
        <h2 className="text-2xl font-bold text-indigo-800 border-b border-indigo-300 pb-2 mb-6">
          3.5 Hazardous Materials
        </h2>
        <p className="mb-4 text-gray-700">
          Potentially dangerous injurious substances/processed{' '}
          <span className="italic">(Please specify)</span>
        </p>
        <ol className="list-decimal pl-6 mb-8 space-y-2">
          {hazardousList.length > 0 ? (
            hazardousList.map((hazard, index) => (
              <li key={`hazard-${index}`} className="text-gray-900">
                {hazard.hazardousDes}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No data available.</li>
          )}
        </ol>

        {/* Fire Risk Section */}
        <h2 className="text-2xl font-bold text-indigo-800 border-b border-indigo-300 pb-2 mb-6">
          3.6 Fire Risk
        </h2>
        <p className="mb-4 text-gray-700">
          Potentially inflammable or incendiary materials/process
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          {fireRiskList.length > 0 ? (
            fireRiskList.map((fire, index) => (
              <li key={`fire-${index}`} className="text-gray-900">
                {fire.fireRiskDescription}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No data available.</li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Noise_Hazardous_FireRisk;
