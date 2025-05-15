import React from 'react';

const ProjectDetails = ({ data }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Project Details
            </h2>
            <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                    <span className="font-medium w-40">Project Type:</span>
                    <span>{data.projectType || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="font-medium w-40">Description:</span>
                    <span>{data.projectDes || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
