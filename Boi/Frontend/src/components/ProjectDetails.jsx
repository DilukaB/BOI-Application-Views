 import React from 'react';

const ProjectDetails = ({ data }) => {
    return (
        <div className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                Project Details
            </h2>
            <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                    <span className="text-gray-500 font-medium w-40 flex-shrink-0">Project Type:</span>
                    <span>{data.projectType || 'N/A'}</span>
                </div>
                <div className="flex items-start">
                    <span className="text-gray-500 font-medium w-40 flex-shrink-0">Description:</span>
                    <span>{data.projectDes || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
