import React, { useState, useEffect, useMemo } from 'react';

const InvestmentTable = () => {
    const [investmentData, setInvestmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [error, setError] = useState(null);

    const formatNumber = (num) => {
        if (num === undefined || num === null) return '-';
        if (isNaN(num)) {
            console.warn('Invalid number encountered:', num);
            return '-';
        }
        return num.toLocaleString();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`./data.json?t=${Date.now()}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || !Array.isArray(data.investment)) {
                throw new Error('Invalid data format received');
            }

            setInvestmentData(prev => {
                const newData = data.investment || [];
                return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
            });

            setLastUpdated(new Date().toLocaleTimeString());
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
            if (investmentData.length === 0) {
                setInvestmentData([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const { groupedData, projects, years } = useMemo(() => {
        if (!investmentData || investmentData.length === 0) {
            return { groupedData: {}, projects: [], years: [] };
        }

        const groups = {};
        const projs = new Set();
        const yrs = new Set();

        investmentData.forEach(item => {
            if (!item.project || !item.year || !item.halfInv) {
                console.warn('Invalid item missing required fields:', item);
                return;
            }

            projs.add(item.project);
            yrs.add(item.year);

            if (!groups[item.project]) groups[item.project] = {};
            if (!groups[item.project][item.year]) groups[item.project][item.year] = {};

            groups[item.project][item.year][item.halfInv] = {
                foreign: {
                    land: Number(item.fcptlndfor) || 0,
                    buildings: Number(item.fcptbldfor) || 0,
                    plantEquipment: Number(item.fcpteqpfor) || 0,
                    otherFixed: Number(item.fcptothfor) || 0,
                    stocks: Number(item.wkstockfor) || 0,
                    cash: Number(item.wkcashfor) || 0,
                    otherWorking: Number(item.wkothfor) || 0
                },
                local: {
                    land: Number(item.fcptlndloc) || 0,
                    buildings: Number(item.fcptbldloc) || 0,
                    plantEquipment: Number(item.fcpteqploc) || 0,
                    otherFixed: Number(item.fcptothloc) || 0,
                    stocks: Number(item.wkstockloc) || 0,
                    cash: Number(item.wkcashloc) || 0,
                    otherWorking: Number(item.wkothloc) || 0
                }
            };
        });

        return {
            groupedData: groups,
            projects: Array.from(projs).sort(),
            years: Array.from(yrs).sort((a, b) => a - b)
        };
    }, [investmentData]);

    const calculateTotals = (data) => {
        if (!data) return { fixedTotal: 0, workingTotal: 0, grandTotal: 0 };

        const fixedTotal = (Number(data.land) || 0) +
            (Number(data.buildings) || 0) +
            (Number(data.plantEquipment) || 0) +
            (Number(data.otherFixed) || 0);

        const workingTotal = (Number(data.stocks) || 0) +
            (Number(data.cash) || 0) +
            (Number(data.otherWorking) || 0);

        return {
            fixedTotal,
            workingTotal,
            grandTotal: fixedTotal + workingTotal
        };
    };

    const handleRefresh = () => {
        fetchData();
    };

    if (loading && investmentData.length === 0) {
        return (
            <div className="p-4 text-gray-600">Loading data...</div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">Error: {error}</div>
        );
    }

    if (projects.length === 0 && !loading) {
        return (
            <div className="p-4 text-gray-600">No data available</div>
        );
    }

    return (
        <div className="overflow-x-auto p-6 bg-white rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Investment Programme</h2>
                <div className="flex items-center gap-2">
                    {lastUpdated && (
                        <span className="text-sm text-gray-500">
                            Last updated: {lastUpdated}
                        </span>
                    )}
                    <button
                        onClick={handleRefresh}
                        className="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm"
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {projects.map(project => (
                    <div key={project} className="overflow-hidden">
                        <h3 className="text-lg font-medium mb-2 text-gray-700">{project}</h3>
                        <table className="min-w-full border border-gray-300 rounded-xl text-sm text-gray-700">
                            <thead className="bg-gray-100 sticky top-0 z-10 text-sm">
                                <tr>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3">Year</th>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3">Half</th>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3">Foreign/Local</th>
                                    <th colSpan="4" className="border border-gray-300 px-4 py-3">Fixed Capital</th>
                                    <th colSpan="3" className="border border-gray-300 px-4 py-3">Working Capital</th>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3">Total</th>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Land</th>
                                    <th className="border border-gray-300 px-4 py-2">Buildings</th>
                                    <th className="border border-gray-300 px-4 py-2">Plant & Equipment</th>
                                    <th className="border border-gray-300 px-4 py-2">Other</th>
                                    <th className="border border-gray-300 px-4 py-2">Stocks</th>
                                    <th className="border border-gray-300 px-4 py-2">Cash</th>
                                    <th className="border border-gray-300 px-4 py-2">Other</th>
                                </tr>
                            </thead>
                            <tbody>
                                {years.map(year => (
                                    groupedData[project]?.[year] && (
                                        <React.Fragment key={year}>
                                            {['1st Half', '2nd Half'].map((half, halfIndex) => (
                                                groupedData[project][year][half] ? (
                                                    <React.Fragment key={half}>
                                                        <tr className={`${halfIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-all duration-150`}>
                                                            {half === '1st Half' && (
                                                                <td rowSpan={4} className="border border-gray-300 px-4 py-2 align-top text-center">
                                                                    {year}
                                                                </td>
                                                            )}
                                                            <td rowSpan={2} className="border border-gray-300 px-4 py-2 align-top text-center">
                                                                {half}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center">Foreign</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.land)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.buildings)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.plantEquipment)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.otherFixed)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.stocks)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.cash)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].foreign.otherWorking)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold text-blue-900">
                                                                {formatNumber(calculateTotals(groupedData[project][year][half].foreign).grandTotal)}
                                                            </td>
                                                        </tr>
                                                        <tr className={`${halfIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-all duration-150`}>
                                                            <td className="border border-gray-300 px-4 py-2 text-center">Local</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.land)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.buildings)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.plantEquipment)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.otherFixed)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.stocks)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.cash)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right">{formatNumber(groupedData[project][year][half].local.otherWorking)}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-right font-semibold text-blue-900">
                                                                {formatNumber(calculateTotals(groupedData[project][year][half].local).grandTotal)}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                ) : (
                                                    <tr key={half} className={`${halfIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                        {half === '1st Half' && (
                                                            <td rowSpan={2} className="border border-gray-300 px-4 py-2 text-center">{year}</td>
                                                        )}
                                                        <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center text-gray-400 italic">
                                                            No data available for {half}
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                        </React.Fragment>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentTable;