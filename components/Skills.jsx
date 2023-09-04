import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Skills = ({ skills }) => {
  const [isEditing, setIsEditing] = useState([]);
  const [editedSkills, setEditedSkills] = useState([...skills]); // Copy the skills to editedSkills
  const { data: session } = useSession();
  const id = session?.user.id;

  const handleEditClick = (index) => {
    setIsEditing((prevIsEditing) => {
      const updatedEditing = [...prevIsEditing];
      updatedEditing[index] = true;
      return updatedEditing;
    });
  };

  const handleSaveClick = async () => {
    // setIsEditing((prevIsEditing) => {
    //   const updatedEditing = [...prevIsEditing];
    //   updatedEditing[index] = false;
    //   return updatedEditing;
    // });
    setIsEditing(Array.from({ length: isEditing.length }, () => false));

    try {
      const response = await fetch(`/api/details/skills/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillsUser: editedSkills }),
      });

      if (response.ok) {
        console.log("Skills updated Successfully");
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("Error updating skills", error);
    }
  };

  const handleCancelClick = (index) => {
    setIsEditing((prevIsEditing) => {
      const updatedEditing = [...prevIsEditing];
      updatedEditing[index] = false;
      return updatedEditing;
    });

    // Reset the edited skill to its original value
    setEditedSkills((prevEditedSkills) => {
      const updatedSkills = [...prevEditedSkills];
      updatedSkills[index] = skills[index];
      return updatedSkills;
    });
  };

  const handleInputChange = (index, e) => {
    const newValue = e.target.value;

    setEditedSkills((prevEditedSkills) => {
      const updatedSkills = [...prevEditedSkills];
      updatedSkills[index] = newValue;
      return updatedSkills;
    });
  };

  if (skills.length != 0) {
    return (
      <div className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-9 px-2 py-3">
        <span className="font-satoshi font-semibold text-xl ml-4">Skills</span>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col ml-4 mt-3 px-3 py-2 rounded-lg border transition-border hover:border-cyan-500"
          >
            {isEditing[index] ? (
              <div>
                <input
                  className="border border-slate-200"
                  type="text"
                  value={editedSkills[index]}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {/* <button
                  className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
                  onClick={() => handleSaveClick(index)}
                >
                  Save
                </button> */}
                <button
                  className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
                  onClick={() => handleCancelClick(index)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <p className="font-satoshi text-slate-600 text-lg">{skill}</p>
                <button
                  className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
        {isEditing != false && (
          <button
            className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
            onClick={() => handleSaveClick()}
          >
            Save
          </button>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Skills;
