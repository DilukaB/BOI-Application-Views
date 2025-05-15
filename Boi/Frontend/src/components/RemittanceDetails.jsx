import React, { useState } from 'react';

const RemittanceDetails = ({ data }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    const handleBack = () => {
        setSelectedRow(null);
    };

    const calculateTotal = (row) => {
        return (
            Number(row.rmtramtyR1 || 0) +
            Number(row.rmtramtyR2 || 0) +
            Number(row.rmtramtyR3 || 0) +
            Number(row.rmtramtyR4 || 0) +
            Number(row.rmtramtyR5 || 0)
        ).toFixed(2);
    };

    // Detail view for one row
    if (selectedRow) {
        return (
            <div className="p-6 bg-white max-w-4xl mx-auto">
                <button
                    onClick={handleBack}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    ← Back to Table
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Remittance Detail</h2>

                <div className="grid grid-cols-2 gap-6 text-gray-700 text-base bg-gray-50 p-6 border">
                    <div><strong>Remitter Origin:</strong> {selectedRow.remitterOrigin}</div>
                    <div><strong>Remittance Type:</strong> {selectedRow.rmtrort}</div>
                    <div><strong>Company:</strong> {selectedRow.rmtrcmp}</div>
                    <div><strong>Period:</strong> {selectedRow.rmtrprd}</div>
                    <div><strong>Amount R1:</strong> {selectedRow.rmtramtyR1}</div>
                    <div><strong>Amount R2:</strong> {selectedRow.rmtramtyR2}</div>
                    <div><strong>Amount R3:</strong> {selectedRow.rmtramtyR3}</div>
                    <div><strong>Amount R4:</strong> {selectedRow.rmtramtyR4}</div>
                    <div><strong>Amount R5:</strong> {selectedRow.rmtramtyR5}</div>
                    <div><strong>Total Amount:</strong> {calculateTotal(selectedRow)}</div>
                </div>
            </div>
        );
    }

    // Table view
    return (
        <div className="p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Remittable Liabilities</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border p-3" rowSpan="2">Remitter Origin</th>
                            <th className="border p-3" rowSpan="2">Remittance Type</th>
                            <th className="border p-3" rowSpan="2">Company</th>
                            <th className="border p-3" rowSpan="2">Period</th>
                            <th className="border p-3 text-center" colSpan="5">Amount per Year</th>
                            <th className="border p-3" rowSpan="2">Total</th>
                        </tr>
                        <tr>
                            <th className="border p-3">R1</th>
                            <th className="border p-3">R2</th>
                            <th className="border p-3">R3</th>
                            <th className="border p-3">R4</th>
                            <th className="border p-3">R5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((remittance, index) => {
                            const total = calculateTotal(remittance);
                            return (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(remittance)}
                                    className={`cursor-pointer ${index % 2 === 0 || index !== 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors`}
                                >
                                    <td className="border p-3">{remittance.remitterOrigin}</td>
                                    <td className="border p-3">{remittance.rmtrort}</td>
                                    <td className="border p-3">{remittance.rmtrcmp}</td>
                                    <td className="border p-3">{remittance.rmtrprd}</td>
                                    <td className="border p-3 text-right text-green-700 font-medium">{remittance.rmtramtyR1}</td>
                                    <td className="border p-3 text-right text-green-700 font-medium">{remittance.rmtramtyR2}</td>
                                    <td className="border p-3 text-right text-green-700 font-medium">{remittance.rmtramtyR3}</td>
                                    <td className="border p-3 text-right text-green-700 font-medium">{remittance.rmtramtyR4}</td>
                                    <td className="border p-3 text-right text-green-700 font-medium">{remittance.rmtramtyR5}</td>
                                    <td className="border p-3 text-right text-blue-700 font-semibold">{total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RemittanceDetails;