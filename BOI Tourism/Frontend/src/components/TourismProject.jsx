 import React, { useEffect, useState } from 'react';

const TourismForm = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setProject(data.typeOfTourismProjects);
      })
      .catch((err) => console.error('Failed to fetch data:', err));
  }, []);

  if (!project) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading tourism project data...
        </p>
      </div>
    );
  }

  const projectTypes = [
    'Hotel',
    'Resort Hotel',
    'Boutique Hotel',
    'City Hotel',
    'Villas',
    'Chalets',
    'Cabans',
    'Leisure & recreation',
    'Any other'
  ];

  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 5: Tourism Project Details
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6">
        {/* 1. Type of the Project */}
        <div>
          <h3 className="text-lg font-bold text-indigo-700 mb-2">1). Type of the Project</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 pl-4 text-sm">
            {projectTypes.map((type, index) => (
              <label key={type} className="flex items-center gap-2">
                <span className="w-5 h-5 border border-gray-500 flex items-center justify-center bg-gray-100 text-green-600 font-bold">
                  {project.tourismProjectType.includes(type) ? "✔" : ""}
                </span>
                ({String.fromCharCode(97 + index)}) {type}
              </label>
            ))}
          </div>
        </div>

        {/* 2. No. of Rooms/villas/chalets */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            2). No. of Rooms / Villas / Chalets
          </h4>
          <p className="mt-1 text-blue-800 font-medium">{project.noRoom}</p>
        </div>

        {/* 3. Expected Star classification */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            3). Expected Star Classification
          </h4>
          <p className="mt-1 text-blue-800 font-medium">{project.expectedStar} ★</p>
        </div>
      </div>
    </div>
  );
};

export default TourismForm;
