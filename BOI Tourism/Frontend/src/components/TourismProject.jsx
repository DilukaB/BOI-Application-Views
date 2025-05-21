 import React, { useEffect, useState } from 'react';

function TourismForm() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setProject(data.typeOfTourismProjects);
      })
      .catch((err) => console.error('Failed to fetch data:', err));
  }, []);

  if (!project) return <div>Loading...</div>;

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
    <div className="p-6 text-gray-900 space-y-6 text-[15px] font-serif">
      {/* 1. Type of the Project */}
      <div>
        <p className="font-bold">1). Type of the Project</p>
        <div className="grid grid-cols-3 gap-y-2 pl-4">
          {projectTypes.map((type, index) => (
            <label key={type} className="flex items-center gap-2">
              <div className="w-4 h-4 border border-black flex items-center justify-center">
                {project.tourismProjectType.includes(type) && (
                  <div className="w-3 h-3 bg-black" />
                )}
              </div>
              ({String.fromCharCode(97 + index)}) {type}
            </label>
          ))}
        </div>
      </div>

      {/* 2. No. of Rooms/villas/chalets */}
      <div>
        <p className="font-bold">
          2). No. of Rooms/ villas/ chalets:
          <span className="inline-block ml-4 border-b border-black w-32">{project.noRoom}</span>
        </p>
      </div>

      {/* 3. Expected Star classification */}
      <div>
        <p className="font-bold">
          3). Expected Star classification:
          <span className="inline-block ml-4 border-b border-black w-16 text-center">{project.expectedStar} ★</span>
        </p>
      </div>
    </div>
  );
}

export default TourismForm;
