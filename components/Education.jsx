import React from "react";

const Education = ({ education }) => {
  if (education) {
    return (
      <div className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-9/12 rounded-3xl ml-10 my-3 px-6 py-3">
        <span className="font-satoshi font-semibold text-xl ml-2">
          Education
        </span>

        <p className="ml-3 mt-3 font-satoshi font-semibold text-lg text-black">
          {education.collegeName}
        </p>
        <div className="flex justify-between ml-3">
          <span className="font-satoshi font-semibold text-md text-slate-500">
            ({education.startingYear} - {education.endingYear})
          </span>
          <span className="font-satoshi font-semibold text-md text-slate-500">
            {education.courseName}
          </span>
        </div>
        <p className="ml-3 mt-3 font-satoshi text-md text-slate-400">
          {education.description}
        </p>
      </div>
    );
  }
};

export default Education;
