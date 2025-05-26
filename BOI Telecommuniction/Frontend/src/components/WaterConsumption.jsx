  import React, { useEffect, useState } from 'react';
 
 const WaterConsumption = () => {
   const [waterData, setWaterData] = useState([]);
 
   useEffect(() => {
     fetch('/data.json')
       .then(res => res.json())
       .then(json => setWaterData(json.waterConsumptions || []))
       .catch(err => console.error('Failed to load water data:', err));
   }, []);
 
   const displayValue = (val) => {
     if (val === 0) return '0';
     if (val === undefined || val === null || val === '') return 'No Data';
     return val;
   };
 
   return (
     <div className="p-6 bg-white shadow-lg rounded-lg">
       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
         4) Water Use (If applicable) (Ltrs/day)
       </h2>
 
       <div className="overflow-x-auto">
         <table className="min-w-full table-auto border-collapse text-sm">
           <thead>
             <tr className="bg-gray-100 text-gray-700">
               <th className="border border-gray-300 px-4 py-2 text-left font-medium">#</th>
               <th className="border border-gray-300 px-4 py-2 text-left font-medium">Type of Use</th>
               <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Commencement or Production</th>
               <th className="border border-gray-300 px-4 py-2 text-left font-medium">At Capacity</th>
             </tr>
           </thead>
           <tbody>
             {waterData.map((item, index) => (
               <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                 <td className="border border-gray-300 px-4 py-2 text-gray-800">{index + 1}</td>
                 <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.useOfWater)}</td>
                 <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.commenceProduction)}</td>
                 <td className="border border-gray-300 px-4 py-2 text-gray-800">{displayValue(item.waterCapacity)}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
 };
 
 export default WaterConsumption;
 