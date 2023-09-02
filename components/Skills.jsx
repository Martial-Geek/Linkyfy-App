import React from "react";

const Skills = ({ skills }) => {
  if (skills.length != 0) {
    return (
      <div className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-9 px-2 py-3">
        <span className="font-satoshi font-semibold text-xl ml-4">Skills</span>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col ml-4 mt-3 px-3 py-2 rounded-lg border transition-border hover:border-cyan-500"
          >
            <p className="font-satoshi text-slate-600 text-lg">{skill}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Skills;
