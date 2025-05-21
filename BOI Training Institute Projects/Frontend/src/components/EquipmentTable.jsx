import React from 'react';

const EquipmentTable = ({ equipmentList = [] }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Equipment (Construction Related)
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">Item</th>
                            <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">No. of Items</th>
                            <th className="border-x border-gray-300 px-6 py-3 text-left text-sm font-medium">Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipmentList.length > 0 ? (
                            equipmentList.map((item, index) => (
                                <tr key={index} className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="border-x border-gray-300 px-6 py-4 text-gray-800">{item.eqpdes}</td>
                                    <td className="border-x border-gray-300 px-6 py-4 text-gray-700">{item.eqpcap}</td>
                                    <td className="border-x border-gray-300 px-6 py-4 text-gray-700">{item.eqpcnd}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-5 text-gray-500">
                                    No equipment added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentTable;
