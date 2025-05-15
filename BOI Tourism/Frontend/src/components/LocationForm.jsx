import React from "react";

const LocationForm = () => {
  return (
    <div className="space-y-8 text-gray-800 text-[15px] leading-relaxed print:text-black print:bg-white print:p-0 print:shadow-none print:rounded-none">
      <h2 className="text-xl font-semibold underline underline-offset-4">4). Location</h2>

      {/* 1.1 Address */}
      <div>
        <p className="font-medium">1.1 Address of Location <span className="font-normal">(Please attach a sketch)</span>:</p>
        <div className="mt-2 space-y-2">
          <div className="w-full h-6 border-b border-gray-700"></div>
          <div className="w-full h-6 border-b border-gray-700"></div>
        </div>
      </div>

      {/* 1.2 Location Details */}
      <div className="space-y-3">
        <p className="font-medium">1.2 Location details of the project:</p>

        <div className="ml-6">
          <p>
            <strong>1.2.1</strong> Extent of land (in acres):
            <span className="inline-block border-b border-gray-700 w-64 ml-2"></span>
          </p>

          <p className="mt-2">
            <strong>1.2.2</strong> Districts:
            <span className="inline-block border-b border-gray-700 w-40 ml-2"></span>
            <span className="ml-4">D S Division:
              <span className="inline-block border-b border-gray-700 w-40 ml-2"></span>
            </span>
          </p>

          <div className="mt-3 text-sm text-gray-700">
            <p><strong>1.2.3</strong> Whether land is already procured, if so please submit a copy of the deed</p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>If sale agreement is signed, please submit a copy of the agreement</li>
              <li>If the land is obtained on lease basis, submit a copy of the lease</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 1.3 Ownership */}
      <div>
        <p className="font-medium">1.3 Ownership of the land/lands:</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 ml-6 mt-2">
          <label className="flex items-center gap-2">
            <span className="border border-gray-700 w-4 h-4 inline-block"></span> Private
          </label>
          <label className="flex items-center gap-2">
            <span className="border border-gray-700 w-4 h-4 inline-block"></span> State
          </label>
          <label className="flex items-center gap-2">
            (Please specify):
            <span className="inline-block border-b border-gray-700 w-48"></span>
          </label>
        </div>
      </div>

      {/* 1.4 Covered space */}
      <div>
        <p className="font-medium">1.4 Covered space of buildings <span className="font-normal">(in sq.ft / sq. meters)</span>:</p>
        <div className="w-64 h-6 mt-2 border-b border-gray-700"></div>
      </div>
    </div>
  );
};

export default LocationForm;
