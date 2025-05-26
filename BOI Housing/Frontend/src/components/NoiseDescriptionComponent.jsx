 import React, { useState, useEffect } from 'react';

const NoiseDescriptionComponent = () => {
  const [noiseList, setNoiseList] = useState([]);
  const [hazardousList, setHazardousList] = useState([]);
  const [fireRiskList, setFireRiskList] = useState([]);
  const [sewageList, setSewageList] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setNoiseList(data.noiseList || []);
        setHazardousList(data.hazardousList || []);
        setFireRiskList(data.fireRiskList || []);
        setSewageList(data.sewageList || []);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const Section = ({ title, description, children }) => (
    <section className="mb-12">
      {title && (
        <h2 className="text-lg font-semibold mt-4 mb-1 text-gray-800">{title}</h2>
      )}
      {description && (
        <p className="italic text-sm text-gray-500 mb-4 ml-8">
          {description}
        </p>
      )}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            {children}
          </table>
        </div>
        <p className="text-xs italic text-gray-500 mt-4">
          Note: Please ensure the data reflects project-specific risk and control measures.
        </p>
      </div>
    </section>
  );

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      {/* 4.3 Sewage */}
      <Section
        title=" "
        description="(b) Sewage"
      >
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border px-4 py-2 font-semibold">Nature of Effluent</th>
            <th className="border px-4 py-2 font-semibold">Treatment</th>
            <th className="border px-4 py-2 font-semibold">Method of Disposal</th>
          </tr>
        </thead>
        <tbody>
          {sewageList.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
            >
              <td className="border px-4 py-2">{item.swNatureOfEffluent}</td>
              <td className="border px-4 py-2">{item.swTreatment}</td>
              <td className="border px-4 py-2">{item.swMethDisposal}</td>
            </tr>
          ))}
        </tbody>
      </Section>

      {/* 4.4 Noise/Vibration */}
      <Section
        title="3.4 Noise/Vibration"
        description="High intensity noise and/or vibration generating machinery/equipment used during construction (Please specify)"
      >
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border px-4 py-2 font-semibold">Noise Code</th>
            <th className="border px-4 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {noiseList.map((item, index) =>
            item.niceDescription.map((desc, descIndex) => (
              <tr
                key={`${index}-${descIndex}`}
                className={`${descIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
              >
                <td className="border px-4 py-2">{item.noiseCode}</td>
                <td className="border px-4 py-2">{desc.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </Section>

      {/* 4.5 Hazardous Materials */}
      <Section
        title="3.5 Hazardous Materials"
        description="Potentially dangerous injurious substances in process (Please specify)"
      >
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border px-4 py-2 font-semibold">Hazardous Description</th>
          </tr>
        </thead>
        <tbody>
          {hazardousList.map((hazard, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
            >
              <td className="border px-4 py-2">{hazard.hazardousDes}</td>
            </tr>
          ))}
        </tbody>
      </Section>

      {/* 4.6 Fire Risk */}
      <Section
        title="3.6 Fire Risk"
        description="Potentially inflammable or incendiary materials in process"
      >
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border px-4 py-2 font-semibold">Fire Risk Description</th>
          </tr>
        </thead>
        <tbody>
          {fireRiskList.map((fireRisk, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}
            >
              <td className="border px-4 py-2">{fireRisk.fireRiskDescription}</td>
            </tr>
          ))}
        </tbody>
      </Section>
    </div>
  );
};

export default NoiseDescriptionComponent;
