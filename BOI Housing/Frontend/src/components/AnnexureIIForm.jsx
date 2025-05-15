import React from 'react';

const protectedAreas = [
    "100m from the boundaries of or within any area declared under the National Heritage Wilderness Act No 4 of 1988.",
    "100m from the boundaries of or within any area declared under the Forest Ordinance (Chapter 451).",
    "Coastal zone as defined in the Coast Conservation Act no 57 of 1981.",
    "Any erodible area declared under the Soil Conservation Act (Chapter 450).",
    "Any Flood area declared under the Flood Protection Ordinance (Chapter 449).",
    "Any Flood protection areas declared under the Sri Lanka Land Reclamation and Development Corporation Act 15 of 1986 as amended by Act No 52 of 1982.",
    "60m area from the bank of a public stream as defined in the Crown Lands Ordinance (Chapter 454) and having width of more than 25 meters at any point of its course.",
    "Any reservations beyond the full supply level of a reservoir.",
    "Any archaeological reserve, ancient or protected monument as defined or declared under the Antiquities Ordinance (Chapter 188).",
    "Any area declared under the Botanic Gardens Ordinance (Chapter 446).",
    "Within 100 meters from the boundaries of or within any area declared as a Sanctuary under the Fauna and Flora Protection Ordinance (Chapter 469).",
    "100 meter from the high flood level contour of, or within a public lake as defined in the Crown Lands Ordinance (Chapter 454) including those declared under section 71 of the said Ordinance.",
    "Within a distance of one mile of the boundary of a National Reserve declared under the Fauna and Flora Protection Ordinance."
];

const AnnexureIIForm = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Annexure II</h2>
            <p className="text-gray-700 font-medium mb-4">
                Does the project wholly or partly fall within any of the following areas:
            </p>

            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100 text-gray-800">
                    <tr>
                        <th className="border px-4 py-2 text-left w-[65%]">Area</th>
                        <th className="border px-2 py-2 text-center">Yes</th>
                        <th className="border px-2 py-2 text-center">No</th>
                        <th className="border px-2 py-2 text-center">Unaware</th>
                    </tr>
                </thead>
                <tbody>
                    {protectedAreas.map((area, idx) => (
                        <tr key={idx} className="h-14 align-top">
                            <td className="border px-4 py-2">{area}</td>
                            <td className="border px-2 py-2 text-center"></td>
                            <td className="border px-2 py-2 text-center"></td>
                            <td className="border px-2 py-2 text-center"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnexureIIForm;
