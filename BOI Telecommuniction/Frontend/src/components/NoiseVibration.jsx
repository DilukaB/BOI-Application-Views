 import React, { useEffect, useState } from 'react';

const NoiseVibration = () => {
  const [noiseData, setNoiseData] = useState([]);

  useEffect(() => {
    fetch('/data.json') // assuming data.json is in the public folder
      .then((res) => res.json())
      .then((data) => setNoiseData(data.noiseList))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const getTitle = (code) => {
    switch (code) {
      case '5.5.1':
        return '5.5.1 High intensity noise and/or vibration generating machinery / equipment (Please specify)';
      case '5.5.2':
        return '5.5.2 Methodology proposed for mitigation';
      case '5.5.3':
        return '5.5.3 Plan for controlling fire';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        5.5 Noise Vibration
      </h2>

      {noiseData.map((item) => (
        <div key={item.noiseCode} className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">
            {getTitle(item.noiseCode)}
          </h3>
          <ol className="list-decimal pl-6 space-y-1 text-gray-800">
            {item.niceDescription.map((desc, index) => (
              <li key={index}>{desc.description}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default NoiseVibration;
