import React from "react";

const ProfessionalDetails = () => {
  return (
    <div className="flex justify-between border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-9 px-6 py-3">
      <div className="flex flex-col mr-6">
        <span className="font-satoshi font-semibold text-xl">
          Professional Details
        </span>
        <p className="font-satoshi text-lg text-slate-600">
          This are the professional details shown to users in the app
        </p>
      </div>
      <div className="flex relative align-middle">
        <img
          src="/bluestar.svg"
          alt="Logo"
          width={45}
          height={45}
          className="absolute top-2.5 rotate-180"
        />
        <img src="/blackstar.svg" alt="Logo" width={45} height={45} />
      </div>
    </div>
  );
};

export default ProfessionalDetails;
