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

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            {/* 4.3 Sewage Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4.3 Sewage</h2>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Nature of Effluent</th>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Treatment</th>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Method of Disposal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sewageList.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.swNatureOfEffluent}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.swTreatment}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.swMethDisposal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4.4 Noise/Vibration Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4.4 Noise/Vibration</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                    4.4.1 High intensity noise and or vibration generating machinery/equipment used during construction (Please specify)
                </p>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Noise Code</th>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noiseList.map((item, index) =>
                                item.niceDescription.map((desc, descIndex) => (
                                    <tr key={`${index}-${descIndex}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.noiseCode}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{desc.description}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4.5 Hazardous Materials Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4.5 Hazardous Materials</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                    Potentially dangerous injurious substance in process (Please specify)
                </p>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Hazardous Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hazardousList.map((hazard, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{hazard.hazardousDes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4.6 Fire Risk Section */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4.6 Fire Risk</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                    Potentially inflammable or incendiary materials in process
                </p>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left font-medium">Fire Risk Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fireRiskList.map((fireRisk, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-6 py-4 text-gray-700">{fireRisk.fireRiskDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default NoiseDescriptionComponent;
