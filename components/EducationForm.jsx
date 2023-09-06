"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const EducationForm = ({ afterSubmit }) => {
  const [educationUser, setEducationUser] = useState({
    collegeName: "",
    startingYear: "",
    endingYear: "",
    courseName: "",
    description: "",
  });

  const { data: session } = useSession();
  const id = session?.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/details/education/${id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(educationUser),
      });

      if (response.ok) {
        afterSubmit();
        console.log("Education information submitted successfully");
        // Handle success scenario here
      } else {
        console.error("Education information submission failed");
        // Handle error scenario here
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network or other errors here
    }
  };

  return (
    <form
      className="mt-10 sm:w-full sm:max-w-2xl flex flex-col gap-7 glassmorphism mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <h2 className="desc">Education</h2>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            College Name
          </span>
          <input
            className="form_input"
            type="text"
            value={educationUser.collegeName}
            onChange={(e) =>
              setEducationUser({
                ...educationUser,
                collegeName: e.target.value,
              })
            }
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Starting Year
          </span>
          <input
            className="form_input"
            type="text"
            value={educationUser.startingYear}
            onChange={(e) =>
              setEducationUser({
                ...educationUser,
                startingYear: e.target.value,
              })
            }
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Ending Year
          </span>
          <input
            className="form_input"
            type="text"
            value={educationUser.endingYear}
            onChange={(e) =>
              setEducationUser({ ...educationUser, endingYear: e.target.value })
            }
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Course Name
          </span>
          <input
            className="form_input"
            type="text"
            value={educationUser.courseName}
            onChange={(e) =>
              setEducationUser({ ...educationUser, courseName: e.target.value })
            }
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            className="form_textarea"
            value={educationUser.description}
            onChange={(e) =>
              setEducationUser({
                ...educationUser,
                description: e.target.value,
              })
            }
          />
        </label>
      </div>
      <button
        type="submit"
        className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
      >
        Submit and Continue
      </button>
    </form>
  );
};

export default EducationForm;
