import React from 'react';

const ProductsTable = ({ data }) => {
    return (
        <div className="overflow-x-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Marketing Programme for One Year</h2>
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                    <tr className="text-left text-gray-600 uppercase text-xs tracking-wider">
                        <th className="border-b border-r border-gray-200 px-6 py-3">Product/Service</th>
                        <th className="border-b border-r border-gray-200 px-6 py-3">Unit Measure</th>
                        <th className="border-b border-r border-gray-200 px-6 py-3 text-center" colSpan="3">Exports</th>
                        <th className="border-b border-r border-gray-200 px-6 py-3 text-center" colSpan="3">Local Sales</th>
                        <th className="border-b border-r border-gray-200 px-6 py-3 text-center" colSpan="2">Total</th>
                    </tr>
                    <tr className="text-left text-gray-600 uppercase text-xs bg-gray-50">
                        <th className="border-b border-r border-gray-200 px-6 py-2"></th>
                        <th className="border-b border-r border-gray-200 px-6 py-2"></th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">QT</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">VL</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">%</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">QT</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">VL</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">%</th>
                        <th className="border-b border-r border-gray-200 px-6 py-2 text-center">QT</th>
                        <th className="border-b border-gray-200 px-6 py-2 text-center">VL</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((product, index) => {
                        const totalqt = Number(product.expqtymrk) + Number(product.qtylocsle);
                        const totalvt = Number(product.expvlumrk) + Number(product.locslevlu);

                        return (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="border-b border-r border-gray-200 px-6 py-4">{product.prodserv}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4">{product.unitmeasure}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.expqtymrk}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.expvlumrk}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.exppercentage}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.qtylocsle}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.locslevlu}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{product.locpercentage}</td>
                                <td className="border-b border-r border-gray-200 px-6 py-4 text-center">{totalqt}</td>
                                <td className="border-b border-gray-200 px-6 py-4 text-center">{totalvt}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
