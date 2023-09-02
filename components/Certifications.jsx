import React from "react";

const Certifications = ({ certifications }) => {
  if (certifications) {
    console.log(certifications);
    return (
      <div className="flex flex-col ml-6 w-10/12 my-3">
        <span className="font-satoshi font-semibold text-xl ml-6">
          Certifications
        </span>

        {certifications.map((certification, index) => (
          <div
            key={index}
            className="flex justify-around border border-1 border-slate-300 shadow-inner shadow-slate-200 rounded-3xl mx-6 my-3 px-6  text-center"
          >
            <img
              src="/certificate-solid.svg"
              width={40}
              height={40}
              alt="boom"
            />
            <div className="flex flex-col">
              <span className="font-satoshi font-semibold text-xl mx-4 my-4">
                {certification.skillName}
              </span>
              <span className="font-satoshi text-lg text-slate-600  mx-4 my-3">
                {certification.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Certifications;
