import React from 'react';

const DeclarationForm = () => {
  return (
    <div className="space-y-6 text-gray-800 text-[15px] leading-relaxed print:text-black print:bg-white print:p-0 print:shadow-none print:rounded-none">
      <h3 className="text-xl font-semibold underline underline-offset-4">5). Declaration</h3>

      <p className="text-justify">
        I declare that the information furnished above in this application, attachments and otherwise
        represented are true and correct and undertake to inform the BOI immediately if any change in
        the information given above.
      </p>

      {/* Name */}
      <div className="flex items-start gap-3">
        <span className="min-w-[80px] font-medium">Name:</span>
        <div className="flex-grow border-b border-gray-700 h-6"></div>
      </div>

      {/* Designation and Signature */}
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex items-start gap-3 flex-1">
          <span className="min-w-[100px] font-medium">Designation:</span>
          <div className="flex-grow border-b border-gray-700 h-6"></div>
        </div>

        <div className="border border-gray-700 w-40 h-20 flex items-center justify-center">
        Signature
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex flex-wrap gap-x-10 gap-y-4 mt-2">
        <div className="flex items-start gap-2">
          <span className="min-w-[40px] font-medium">Tel:</span>
          <div className="w-40 border-b border-gray-700 h-6"></div>
        </div>

        <div className="flex items-start gap-2">
          <span className="min-w-[40px] font-medium">Fax:</span>
          <div className="w-40 border-b border-gray-700 h-6"></div>
        </div>

        <div className="flex items-start gap-2">
          <span className="min-w-[50px] font-medium">Email:</span>
          <div className="w-64 border-b border-gray-700 h-6"></div>
        </div>

        <div className="flex items-start gap-2">
          <span className="min-w-[50px] font-medium">Date:</span>
          <div className="w-40 border-b border-gray-700 h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationForm;
