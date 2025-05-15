import React, { useState, useEffect } from 'react';

const Proposed_Financing = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./data.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const jsonData = await response.json();

                // Extract only the investment array
                const investments = jsonData.investment || [];

                // Transform the data to include only financing-related fields
                const transformedData = investments.flatMap(item => [
                    {
                        year: item.year,
                        half: item.halfInv,
                        foreignLocal: 'Foreign',
                        shareCapital: item.shcptfor,
                        loanCapital: item.lncptfor,
                        others: item.othinvfor,
                        reinvestment: item.re_inv_for
                    },
                    {
                        year: item.year,
                        half: item.halfInv,
                        foreignLocal: 'Local',
                        shareCapital: item.shcptloc,
                        loanCapital: item.lncptloc,
                        others: item.othinvloc,
                        reinvestment: item.re_inv_loc
                    }
                ]);

                setData(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num) => {
        if (num === undefined || num === null) return '-';
        return num.toLocaleString();
    };

    const calculateTotal = (item) => {
        return (item.shareCapital || 0) + (item.loanCapital || 0) + (item.others || 0);
    };

    if (loading) return <div className="p-4 text-gray-600">Loading data...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (data.length === 0) return <div className="p-4 text-gray-600">No data available</div>;

    // Group data by year > half
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.year]) acc[item.year] = {};
        if (!acc[item.year][item.half]) acc[item.year][item.half] = [];
        acc[item.year][item.half].push(item);
        return acc;
    }, {});

    return (
        <div className="overflow-x-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Proposed Financing Overview</h2>
            <table className="min-w-full border border-gray-300 rounded-xl text-sm text-gray-700">
                <thead className="bg-gray-100 sticky top-0 z-10 text-sm">
                    <tr>
                        <th rowSpan="2" className="border border-gray-300 px-4 py-3">Year</th>
                        <th rowSpan="2" className="border border-gray-300 px-4 py-3">Half</th>
                        <th rowSpan="2" className="border border-gray-300 px-4 py-3">Foreign / Local</th>
                        <th colSpan="3" className="border border-gray-300 px-4 py-3">Type of Financing</th>
                        <th rowSpan="2" className="border border-gray-300 px-4 py-3 font-semibold">Total</th>
                        <th rowSpan="2" className="border border-gray-300 px-4 py-3">Reinvestment</th>
                    </tr>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Share Capital</th>
                        <th className="border border-gray-300 px-4 py-2">Loan Capital</th>
                        <th className="border border-gray-300 px-4 py-2">Others</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedData).map(([year, halves], yearIndex) => {
                        const halfEntries = Object.entries(halves);
                        const totalYearRows = halfEntries.reduce((sum, items) => sum + items[1].length, 0);

                        return halfEntries.map(([half, items], halfIndex) => (
                            <React.Fragment key={`${year}-${half}`}>
                                {items.map((item, itemIndex) => {
                                    const total = calculateTotal(item);
                                    return (
                                        <tr key={`${year}-${half}-${itemIndex}`} className={`${yearIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-all duration-150`}>
                                            {/* Year cell */}
                                            {halfIndex === 0 && itemIndex === 0 && (
                                                <td rowSpan={totalYearRows} className="border border-gray-300 px-4 py-2 font-medium">
                                                    {year}
                                                </td>
                                            )}

                                            {/* Half cell */}
                                            {itemIndex === 0 && (
                                                <td rowSpan={items.length} className="border border-gray-300 px-4 py-2">
                                                    {half}
                                                </td>
                                            )}

                                            {/* Financing data */}
                                            <td className="border border-gray-300 px-4 py-2">{item.foreignLocal}</td>
                                            <td className="border border-gray-300 px-4 py-2">{formatNumber(item.shareCapital)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{formatNumber(item.loanCapital)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{formatNumber(item.others)}</td>
                                            <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-900">
                                                {formatNumber(total)}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {formatNumber(item.reinvestment)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        ));
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Proposed_Financing;