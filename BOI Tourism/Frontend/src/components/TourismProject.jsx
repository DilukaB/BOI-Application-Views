import React, { useEffect, useState } from 'react';

function TourismProject() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setProject(data.typeOfTourismProjects);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  if (!project) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const selectedTypes = Array.isArray(project.tourismProjectType)
    ? project.tourismProjectType
    : [project.tourismProjectType].filter(Boolean);

  return (
    <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed print:text-black print:bg-white print:p-0 print:shadow-none print:rounded-none">
      <h2 className="text-xl font-semibold underline underline-offset-4">1). Tourism Project</h2>

      {/* 1.1 Type of the Project */}
      <div>
        <p className="font-medium mb-2">1.1 Type of the Project:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 ml-4">
          {[
            'Head',
            'Resort Head',
            'Basinger Head',
            'City Head',
            'Villa',
            'Clades',
            'Culture',
            'Lesage & recreation',
            'Airy other',
            'red courses',
          ].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <span className="border border-gray-700 w-4 h-4 inline-block bg-white">
                {selectedTypes.includes(type) && (
                  <span className="block w-full h-full bg-blue-600" />
                )}
              </span>
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* 1.2 No. of Rooms/Villas/Clades */}
      <div>
        <p className="font-medium mb-1">1.2 No. of Rooms/Villas/Clades:</p>
        <div className="border-b border-gray-700 w-64 h-6"></div>
        <div className="text-sm text-gray-500 mt-1 ml-1">(e.g. 50 rooms, 10 villas, etc.)</div>
      </div>

      {/* 1.3 Expected Star classification */}
      <div>
        <p className="font-medium mb-1">1.3 Expected Star classification:</p>
        <div className="flex items-center gap-4">
          <div className="border-b border-gray-700 w-24 h-6">
            <span className="sr-only">{project.expectedStar || ''}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < project.expectedStar ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourismProject;
