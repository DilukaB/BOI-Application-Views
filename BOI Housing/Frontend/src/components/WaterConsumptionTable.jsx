import React from 'react';

const WaterConsumptionTable = ({ waterConsumptions }) => {
    if (!waterConsumptions || waterConsumptions.length === 0) {
        return (
            <div className="text-center text-gray-600">
                No water consumption data available.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                3. Water Use (Ltrs/day)
            </h2>
            <table className="w-full table-auto border border-gray-400 text-sm text-gray-800">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 text-left"> </th>
                        <th className="border border-gray-400 px-4 py-2 text-center">At Commencement of Construction</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">At Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {waterConsumptions.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2">{item.useOfWater}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{item.commenceProduction}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{item.waterCapacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WaterConsumptionTable;
