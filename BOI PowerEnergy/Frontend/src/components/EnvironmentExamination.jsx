 import React, { useEffect, useState } from 'react';

const EnvironmentExamination = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  const displayValue = (val) => {
    if (val === 0) return '0';
    if (val === undefined || val === null || val === '') return 'No Data';
    return val;
  };

  const getNoiseTitle = (code) => {
    switch (code) {
      case '5.5.1':
        return 'High intensity noise and/or vibration generating machinery/equipment';
      case '5.5.2':
        return 'Methodology proposed for mitigation';
      case '5.5.3':
        return 'Plan for controlling fire';
      default:
        return '';
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading environmental data...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2">
          5. Environmental Examination
        </h2>

        {/* Utility Section Component for Tables */}
        {[
          {
            title: '5.1 Waste Water',
            dataList: data.wasteWaterList,
            headers: ['Type', 'Quantity (Ltrs/Day)', 'Treatment', 'Method for Disposal'],
            keys: ['wwsno', 'wwVolume', 'wwTreatment', 'wwDisposalMode'],
          },
          {
            title: '5.2 (a) Solid Waste',
            dataList: data.solidWasteList,
            headers: ['Type', 'Nature', 'Kg/Day', 'Treatment', 'Disposal Method'],
            keys: ['swsno', 'swNature', 'swqty', 'swTreatment', 'swDisMode'],
          },
          {
            title: '5.3 Air Emissions',
            dataList: data.airEmissionsDetails,
            headers: ['Air Emission Envisaged', 'Methodology Proposed for Control'],
            keys: ['aEenvisagedSQNO', 'aeMethodologyControl'],
          },
          {
            title: '5.4 Sewage',
            dataList: data.sewageList,
            headers: ['Nature of Effluent', 'Treatment', 'Method of Disposal'],
            keys: ['swNatureOfEffluent', 'swTreatment', 'swMethDisposal'],
          },
        ].map((section, idx) => (
          <section key={idx}>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {section.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    {section.headers.map((head, i) => (
                      <th key={i} className="border px-4 py-2 font-medium">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.dataList.map((item, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={`${
                        rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-indigo-50`}
                    >
                      {section.keys.map((key, colIdx) => (
                        <td key={colIdx} className="border px-4 py-2">
                          {displayValue(item[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* 5.5 Noise / Vibration */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            5.5 Noise / Vibration
          </h3>
          {data.noiseList.map((section, idx) => (
            <div
              key={idx}
              className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6"
            >
              <h4 className="text-lg font-medium text-indigo-800 mb-2">
                {section.noiseCode} – {getNoiseTitle(section.noiseCode)}
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 pl-4">
                {section.niceDescription.map((item, i) => (
                  <li key={i} className="ml-2">
                    {displayValue(item.description)}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <p className="text-xs italic text-gray-500 pt-4">
          Note: Please ensure all proposed mitigation strategies comply with environmental regulations and standards.
        </p>
      </div>
    </div>
  );
};

export default EnvironmentExamination;
