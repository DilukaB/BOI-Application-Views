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
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">{title}</h2>
      {description && (
        <p className="text-sm text-gray-600 mb-5 pl-4 border-l-4 border-blue-500 italic">{description}</p>
      )}
      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            {children}
          </table>
        </div>
      </div>
    </section>
  );

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      {/* 4.3 Sewage */}
      <Section title="4.3 Sewage">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Nature of Effluent</th>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Treatment</th>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Method of Disposal</th>
          </tr>
        </thead>
        <tbody>
          {sewageList.map((item, index) => (
            <tr
              key={index}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
            >
              <td className="px-6 py-4 border border-gray-200">{item.swNatureOfEffluent}</td>
              <td className="px-6 py-4 border border-gray-200">{item.swTreatment}</td>
              <td className="px-6 py-4 border border-gray-200">{item.swMethDisposal}</td>
            </tr>
          ))}
        </tbody>
      </Section>

      {/* 4.4 Noise/Vibration */}
      <Section
        title="4.4 Noise/Vibration"
        description="4.4.1 High intensity noise and or vibration generating machinery/equipment used during construction (Please specify)"
      >
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Noise Code</th>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {noiseList.map((item, index) =>
            item.niceDescription.map((desc, descIndex) => (
              <tr
                key={`${index}-${descIndex}`}
                className={`border-t ${descIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
              >
                <td className="px-6 py-4 border border-gray-200">{item.noiseCode}</td>
                <td className="px-6 py-4 border border-gray-200">{desc.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </Section>

      {/* 4.5 Hazardous Materials */}
      <Section
        title="4.5 Hazardous Materials"
        description="Potentially dangerous injurious substance in process (Please specify)"
      >
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Hazardous Description</th>
          </tr>
        </thead>
        <tbody>
          {hazardousList.map((hazard, index) => (
            <tr
              key={index}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
            >
              <td className="px-6 py-4 border border-gray-200">{hazard.hazardousDes}</td>
            </tr>
          ))}
        </tbody>
      </Section>

      {/* 4.6 Fire Risk */}
      <Section
        title="4.6 Fire Risk"
        description="Potentially inflammable or incendiary materials in process"
      >
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border border-gray-300 font-semibold">Fire Risk Description</th>
          </tr>
        </thead>
        <tbody>
          {fireRiskList.map((fireRisk, index) => (
            <tr
              key={index}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
            >
              <td className="px-6 py-4 border border-gray-200">{fireRisk.fireRiskDescription}</td>
            </tr>
          ))}
        </tbody>
      </Section>
    </div>
  );
};

export default NoiseDescriptionComponent;
