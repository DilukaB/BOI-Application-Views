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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          5.5 Noise & Vibration
        </h2>

        {noiseData.map((item) => (
          <div key={item.noiseCode} className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {getTitle(item.noiseCode)}
            </h3>
            <ol className="list-decimal pl-6 space-y-1 text-gray-800">
              {item.niceDescription.map((desc, index) => (
                <li key={index}>{desc.description || 'No Description'}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoiseVibration;
