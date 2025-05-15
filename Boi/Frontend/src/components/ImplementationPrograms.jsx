import React from 'react';

const ImplementationPrograms = ({ data }) => {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Programme of Implementation</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border p-3 text-left">Investor ID</th>
                            <th className="border p-3 text-left">Activity</th>
                            <th className="border p-3 text-left">Months After Agreement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((program, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 || index !== 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-colors`}
                            >
                                <td className="border p-3">{program.investorID}</td>
                                <td className="border p-3">{program.lvlimplcd}</td>
                                <td className="border p-3">{program.mthaftagr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ImplementationPrograms;