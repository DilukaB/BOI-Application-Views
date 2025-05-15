import React, { useState, useEffect } from "react";

const ManpowerStats = () => {
    const [data, setData] = useState([]);
    const [totals, setTotals] = useState({
        initialForeign: 0,
        initialLocal: 0,
        capacityForeign: 0,
        capacityLocal: 0,
    });

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                setData(data.manpower || []);
                calculateTotals(data.manpower || []);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const calculateTotals = (updatedData) => {
        const totals = updatedData.reduce(
            (acc, item) => {
                acc.initialForeign += item.formgr || 0;
                acc.initialLocal += item.locmgr || 0;
                acc.capacityForeign += item.forCLR || 0;
                acc.capacityLocal += item.locclr || 0;
                return acc;
            },
            { initialForeign: 0, initialLocal: 0, capacityForeign: 0, capacityLocal: 0 }
        );
        setTotals(totals);
    };

    return (
        <div className="overflow-x-auto p-6 bg-white border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Manpower Requirements</h2>
            <table className="min-w-full table-auto border-collapse bg-white">
                {/* Table Header */}
                <thead className="bg-gray-100 text-gray-700">
                    <tr className="text-left uppercase tracking-wider text-sm">
                        <th className="border border-gray-200 px-6 py-3">Category</th>
                        <th className="border border-gray-200 px-6 py-3" colSpan="2">Initial Requirement</th>
                        <th className="border border-gray-200 px-6 py-3" colSpan="2">Capacity Requirement</th>
                    </tr>
                    <tr className="text-left uppercase bg-gray-50 text-sm">
                        <th className="border border-gray-200 px-6 py-2"></th>
                        <th className="border border-gray-200 px-6 py-2">Foreign</th>
                        <th className="border border-gray-200 px-6 py-2">Local</th>
                        <th className="border border-gray-200 px-6 py-2">Foreign</th>
                        <th className="border border-gray-200 px-6 py-2">Local</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 || index !== 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                        >
                            {/* Category */}
                            <td className="border border-gray-200 px-6 py-4 text-left text-sm">{item.isinicap}</td>

                            {/* Initial Requirements */}
                            <td className="border border-gray-200 px-6 py-4 text-center text-sm">{item.formgr}</td>
                            <td className="border border-gray-200 px-6 py-4 text-center text-sm">{item.locmgr}</td>

                            {/* Capacity Requirements */}
                            <td className="border border-gray-200 px-6 py-4 text-center text-sm">{item.forCLR}</td>
                            <td className="border border-gray-200 px-6 py-4 text-center text-sm">{item.locclr}</td>
                        </tr>
                    ))}

                    {/* Totals Row */}
                    <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-200 px-6 py-4 text-center text-sm">Total</td>
                        <td className="border border-gray-200 px-6 py-4 text-center text-sm">{totals.initialForeign}</td>
                        <td className="border border-gray-200 px-6 py-4 text-center text-sm">{totals.initialLocal}</td>
                        <td className="border border-gray-200 px-6 py-4 text-center text-sm">{totals.capacityForeign}</td>
                        <td className="border border-gray-200 px-6 py-4 text-center text-sm">{totals.capacityLocal}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManpowerStats;