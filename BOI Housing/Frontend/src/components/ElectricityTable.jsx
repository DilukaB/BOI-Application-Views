import React from 'react';

const ElectricityTable = ({ electricityList }) => {
    if (!electricityList || electricityList.length === 0) {
        return <div className="text-center text-gray-600">No electricity data available.</div>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                5. Electricity Requirements
            </h2>
            <table className="w-full table-auto border border-gray-400 text-sm text-gray-800">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 text-left">Power (kVA)</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">At Commencement of Construction</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">At Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {electricityList.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2">{index === 0 ? 'a. ' : 'b. '}{item.erCode}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{item.commenceProduction}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{item.erCapacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ElectricityTable;
