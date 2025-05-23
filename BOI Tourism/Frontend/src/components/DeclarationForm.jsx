 import React from 'react';

const DeclarationForm = () => {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Section 6: Declaration
      </h2>

      <div className="border rounded-xl p-6 transition-all duration-300 border-gray-200 shadow-md hover:shadow-lg bg-white space-y-6 text-[15px] leading-relaxed print:text-black print:bg-white print:p-0 print:shadow-none print:rounded-none">
        <p className="text-justify">
          I declare that the information furnished above in this application, attachments and otherwise
          represented are true and correct and undertake to inform the BOI immediately if any change in
          the information given above.
        </p>

        {/* Name */}
        <div className="flex items-start gap-3">
          <span className="min-w-[80px] font-semibold text-gray-600">Name:</span>
          <div className="flex-grow border-b border-gray-400 h-6"></div>
        </div>

        {/* Designation and Signature */}
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex items-start gap-3 flex-1">
            <span className="min-w-[100px] font-semibold text-gray-600">Designation:</span>
            <div className="flex-grow border-b border-gray-400 h-6"></div>
          </div>

          <div className="border border-gray-400 w-40 h-20 flex items-center justify-center text-gray-500">
            Signature
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-2">
          <div className="flex items-start gap-2">
            <span className="min-w-[40px] font-semibold text-gray-600">Tel:</span>
            <div className="flex-grow border-b border-gray-400 h-6 w-40"></div>
          </div>

          <div className="flex items-start gap-2">
            <span className="min-w-[40px] font-semibold text-gray-600">Fax:</span>
            <div className="flex-grow border-b border-gray-400 h-6 w-40"></div>
          </div>

          <div className="flex items-start gap-2">
            <span className="min-w-[50px] font-semibold text-gray-600">Email:</span>
            <div className="flex-grow border-b border-gray-400 h-6 w-64"></div>
          </div>

          <div className="flex items-start gap-2">
            <span className="min-w-[50px] font-semibold text-gray-600">Date:</span>
            <div className="flex-grow border-b border-gray-400 h-6 w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationForm;
