import React, { useState, useRef } from "react";

import { useSession } from "next-auth/react";

const Education = ({ education, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEducation, setEditedEducation] = useState({ ...education });
  const { data: session } = useSession();
  const id = session?.user.id;
  const collegeNameRef = useRef(null);
  const startingYearRef = useRef(null);
  const endingYearRef = useRef(null);
  const courseNameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (
      !collegeNameRef.current.value ||
      !startingYearRef.current.value ||
      !endingYearRef.current.value ||
      !courseNameRef.current.value ||
      !descriptionRef.current.value
    ) {
      // Display an error message or prevent saving if any field is empty.
      alert("Field cannot be empty!");
      console.error("All fields must be filled in.");
      return;
    }

    // Update the education object with the edited values
    const updatedEducation = {
      collegeName: collegeNameRef.current.value,
      startingYear: startingYearRef.current.value,
      endingYear: endingYearRef.current.value,
      courseName: courseNameRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      const response = await fetch(`/api/details/education/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEducation),
      });

      if (response.ok) {
        console.log("Education updated Successfully");
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("Error updating education", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the editedEducation object to its original values
    setEditedEducation({ ...education });
  };

  if (education) {
    return (
      <div
        key={index}
        className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-9/12 rounded-3xl ml-10 my-3 px-6 py-3"
      >
        <div className="flex justify-between">
          <span className="font-satoshi font-semibold text-xl ml-2">
            Education
          </span>
          <button
            className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
        {isEditing ? (
          <div className="flex flex-col">
            <input
              required
              className="border border-slate-200"
              type="text"
              ref={collegeNameRef}
              defaultValue={editedEducation.collegeName}
            />
            <div className="flex flex-col sm:flex-row justify-between my-3 space-y-3">
              <input
                required
                className="border border-slate-200"
                type="text"
                ref={startingYearRef}
                defaultValue={editedEducation.startingYear}
              />
              <input
                required
                className="border border-slate-200"
                type="text"
                ref={endingYearRef}
                defaultValue={editedEducation.endingYear}
              />
            </div>
            <input
              required
              className="border border-slate-200"
              type="text"
              ref={courseNameRef}
              defaultValue={editedEducation.courseName}
            />
            <input
              required
              type="text"
              className="my-3 border border-slate-200"
              ref={descriptionRef}
              defaultValue={editedEducation.description}
            />
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
          </div>
        ) : (
          <div>
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
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Education;
