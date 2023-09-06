import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const About = ({ about }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAboutContent, setEditedAboutContent] = useState(about);
  const { data: session } = useSession();
  const id = session?.user.id;

  const handleAboutChange = async (e) => {
    setEditedAboutContent(e.target.value);
  };

  const handleCancel = async () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (editedAboutContent.trim() === "") {
      alert("About cannot be empty!");
      console.error("About content cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`/api/details/about/${id}/update`, {
        method: "POST",
        body: JSON.stringify({ aboutMe: editedAboutContent }),
      });

      if (response.ok) {
        console.log("About updated Successfully");
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error("Error updating about", error);
    }
  };

  if (about) {
    return (
      <div className="flex flex-col relative border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-3 px-5 py-3">
        <span className="font-satoshi font-semibold text-xl ml-2 mb-4 max-w-fit">
          About
        </span>
        {!isEditing ? (
          <>
            <button
              className="px-5 py-1.5 mx-5 my-2 max-w-fit text-sm bg-sky-500 rounded-full text-white absolute top-0.5 right-0.5"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <p className="font-satoshi text-slate-600 text-lg ml-3 mt-5">
              {about}
            </p>
          </>
        ) : (
          <div className="flex flex-col">
            <textarea
              required
              value={editedAboutContent}
              cols="30"
              rows="10"
              className="border border-slate-200"
              onChange={handleAboutChange}
            />
            <div className="flex justify-between">
              <button
                className="px-5 py-1.5 mx-5 my-4 max-w-fit text-sm bg-sky-500 rounded-full text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-5 py-1.5 mx-5 my-4 max-w-fit text-sm bg-sky-500 rounded-full text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default About;
