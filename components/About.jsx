import React from "react";

const About = ({ about }) => {
  return (
    <div className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-3 px-5 py-3">
      <span className="font-satoshi font-semibold text-xl ml-2">About</span>

      <p className="font-satoshi text-slate-600 text-lg ml-3 mt-5">{about}</p>
    </div>
  );
};

export default About;
