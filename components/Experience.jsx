import React from "react";

const Experience = ({ experiences }) => {
  if (experiences.length != 0) {
    return (
      <div className="flex flex-col  w-10/12 rounded-3xl ml-6 my-5">
        <span className="font-satoshi font-semibold text-xl ml-4">
          Experience
        </span>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 rounded-3xl mx-6 my-3 px-6 py-3"
          >
            <div className="flex">
              <span className="font-satoshi text-xl">
                {experience.duration} months
              </span>
              <span className="font-satoshi font-semibold text-lg ml-4">
                ({experience.startingYear}-{experience.endingYear})
              </span>
              <span className="font-satoshi text-lg ml-auto">
                {experience.jobStatus}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span className="font-satoshi text-lg">
                {experience.companyName}
              </span>
              <span className="font-satoshi text-lg ml-4">
                {experience.jobType}
              </span>
            </div>
          </div>
        ))}

        <p className="desc ml-5"></p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Experience;
