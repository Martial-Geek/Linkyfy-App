import React, { useState, useRef } from "react";

import { useSession } from "next-auth/react";

const Experience = ({ experiences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperiences, setEditedExperiences] = useState([...experiences]);
  const { data: session } = useSession();
  const id = session?.user.id;
  const durationRefs = useRef(experiences.map(() => React.createRef()));
  const startingYearRefs = useRef(experiences.map(() => React.createRef()));
  const endingYearRefs = useRef(experiences.map(() => React.createRef()));
  const companyNameRefs = useRef(experiences.map(() => React.createRef()));
  const jobTypeRefs = useRef(experiences.map(() => React.createRef()));
  const jobStatusRefs = useRef(experiences.map(() => React.createRef()));

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Update the education object with the edited values
    const updatedExperiencesArray = experiences.map((experience, index) => ({
      duration: durationRefs.current[index].current.value,
      startingYear: startingYearRefs.current[index].current.value,
      endingYear: endingYearRefs.current[index].current.value,
      companyName: companyNameRefs.current[index].current.value,
      jobType: jobTypeRefs.current[index].current.value,
      jobStatus: jobStatusRefs.current[index].current.value,
    }));

    console.log(updatedExperiencesArray);

    try {
      const response = await fetch(`/api/details/experiences/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExperiencesArray),
      });

      if (response.ok) {
        console.log("Experiences updated Successfully");
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("Error updating experiences", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the editedEducation object to its original values
    setEditedExperiences([...experiences]);
  };

  if (experiences.length != 0) {
    return (
      <div className="flex flex-col  w-10/12 rounded-3xl ml-6 my-5">
        <div className="flex justify-between">
          <span className="font-satoshi font-semibold text-xl ml-4">
            Experience
          </span>
          <button
            className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col ">
          {experiences.map((experience, index) =>
            !isEditing ? (
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
            ) : (
              <div
                key={index}
                className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 rounded-3xl mx-6 my-3 px-6 py-3"
              >
                <div className="flex">
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={durationRefs.current[index]}
                    defaultValue={editedExperiences[index].duration}
                  />
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={startingYearRefs.current[index]}
                    defaultValue={editedExperiences[index].startingYear}
                  />
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={endingYearRefs.current[index]}
                    defaultValue={editedExperiences[index].endingYear}
                  />
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={companyNameRefs.current[index]}
                    defaultValue={editedExperiences[index].companyName}
                  />
                </div>
                <div className="flex justify-between text-slate-400">
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={jobTypeRefs.current[index]}
                    defaultValue={editedExperiences[index].jobType}
                  />
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={jobStatusRefs.current[index]}
                    defaultValue={editedExperiences[index].jobStatus}
                  />
                </div>
              </div>
            )
          )}
        </div>
        {isEditing && (
          <div className="flex justify-between">
            <button
              className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        )}

        <p className="desc ml-5"></p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Experience;
