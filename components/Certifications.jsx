import React, { useState, useRef } from "react";

import { useSession } from "next-auth/react";
const Certifications = ({ certifications }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCertifications, setEditedCertifications] = useState([
    ...certifications,
  ]);
  const { data: session } = useSession();
  const id = session?.user.id;
  const skillNameRefs = useRef(certifications.map(() => React.createRef()));
  const platformRefs = useRef(certifications.map(() => React.createRef()));

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Update the education object with the edited values
    const updatedCertificationsArray = certifications.map(
      (certification, index) => ({
        skillName: skillNameRefs.current[index].current.value,
        platform: platformRefs.current[index].current.value,
      })
    );

    console.log(updatedCertificationsArray);

    try {
      const response = await fetch(`/api/details/certifications/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCertificationsArray),
      });

      if (response.ok) {
        console.log("Certifications updated Successfully");
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("Error updating certifications", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the editedEducation object to its original values
    setEditedCertifications([...certifications]);
  };

  // console.log(editedCertifications);

  if (certifications.length != 0) {
    return (
      <div className="flex flex-col ml-6 w-10/12 my-3">
        <div className="flex justify-between">
          <span className="font-satoshi font-semibold text-xl ml-6">
            Certifications
          </span>
          <button
            className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col">
          {certifications.map((certification, index) =>
            !isEditing ? (
              <div
                className="flex justify-around border border-1 border-slate-300 shadow-inner shadow-slate-200 rounded-3xl mx-6 my-3 px-6  text-center"
                key={index}
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
            ) : (
              <div
                className="flex justify-around border border-1 border-slate-300 shadow-inner shadow-slate-200 rounded-3xl mx-6 my-3 px-6  text-center"
                key={index}
              >
                <img
                  src="/certificate-solid.svg"
                  width={40}
                  height={40}
                  alt="boom"
                />
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={skillNameRefs.current[index]}
                    defaultValue={editedCertifications[index].skillName}
                  />
                  <input
                    type="text"
                    className="my-3 border border-slate-200"
                    ref={platformRefs.current[index]}
                    defaultValue={editedCertifications[index].platform}
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
      </div>
    );
  } else {
    return <></>;
  }
};

export default Certifications;
