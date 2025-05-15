import React from 'react';

const SiteLocationsForm = ({ siteLocations = [] }) => {
    if (siteLocations.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                    Location Details
                </h2>
                <p className="text-lg text-gray-600 mb-6">No location data available</p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    + Add Location
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
                Location Details
            </h2>

            <div className="space-y-8">
                {siteLocations.map((location, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
                    >
                        <div className="flex items-center mb-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold mr-4">
                                {index + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Location Details</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Address Section */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                                <div className="flex items-center mb-3">
                                    <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h4 className="text-lg font-semibold text-gray-700">Address</h4>
                                </div>
                                <div className="space-y-2 pl-8">
                                    <p className="text-gray-600">{location.facadD1}</p>
                                    <p className="text-gray-600">{location.facadD2}</p>
                                    <p className="text-gray-600">{location.facadD3}</p>
                                    <div className="flex items-center mt-3">
                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                        <p className="text-gray-600">Province: {location.facprvcd}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                        <p className="text-gray-600">District: {location.facdistcd}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                        <p className="text-gray-600">Divisional Secretariat: {location.facagacd}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Coordinates Section */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                                <div className="flex items-center mb-3">
                                    <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    <h4 className="text-lg font-semibold text-gray-700">Map Coordinates</h4>
                                </div>
                                <div className="pl-8">
                                    <div className="flex items-center mb-2">
                                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                        <p className="text-gray-600">Longitude: <span className="font-medium">{location.longitude}</span></p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                        <p className="text-gray-600">Latitude: <span className="font-medium">{location.latitude}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 mb-6">
                            <div className="flex items-center mb-3">
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <h4 className="text-lg font-semibold text-gray-700">Contact Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                <div>
                                    <p className="text-gray-600 flex items-center">
                                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>Tel: <span className="font-medium">{location.factel}</span></span>
                                    </p>
                                    <p className="text-gray-600 flex items-center mt-2">
                                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        <span>Fax: <span className="font-medium">{location.facfax}</span></span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600 flex items-center">
                                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>Email: <span className="font-medium text-blue-600">{location.faceml}</span></span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Land Details Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                            <div className="flex items-center mb-3">
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 className="text-lg font-semibold text-gray-700">Land Details</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-8">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Ownership</p>
                                    <p className="font-medium">{location.ownership}</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Units</p>
                                    <p className="font-medium">{location.numberOfUnits}</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-500">Extent</p>
                                    <p className="font-medium">{location.lndacr} Acres</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

          
        </div>
    );
};

export default SiteLocationsForm;
