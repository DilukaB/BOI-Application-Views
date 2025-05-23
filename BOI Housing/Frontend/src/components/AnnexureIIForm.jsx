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
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Annexure II
      </h2>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
        Does the project wholly or partly fall within any of the following areas:
      </p>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border border-gray-300 font-semibold w-[65%]">Area</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-center">Yes</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-center">No</th>
                <th className="px-6 py-3 border border-gray-300 font-semibold text-center">Unaware</th>
              </tr>
            </thead>
            <tbody>
              {protectedAreas.map((area, idx) => (
                <tr
                  key={idx}
                  className={`border-t ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-150`}
                  style={{ verticalAlign: 'top', height: '56px' }}
                >
                  <td className="px-6 py-4 border border-gray-200">{area}</td>
                  <td className="px-6 py-4 border border-gray-200 text-center"></td>
                  <td className="px-6 py-4 border border-gray-200 text-center"></td>
                  <td className="px-6 py-4 border border-gray-200 text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnnexureIIForm;
