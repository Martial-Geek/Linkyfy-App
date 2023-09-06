"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const SkillsForm = ({ afterSubmit }) => {
  const [skills, setSkills] = useState([""]);
  const { data: session } = useSession();
  const id = session?.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/details/skills/${id}/new`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillsUser: skills, userId: session?.user.id }),
      });

      if (response.ok) {
        console.log("POST request successful");
        afterSubmit();
      } else {
        console.error("POST request failed");
        // Handle error scenario here
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network or other errors here
    }
  };

  console.log(skills);
  return (
    <form
      className="mt-10 sm:w-full sm:max-w-2xl flex flex-col gap-7 glassmorphism mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Skills
          </span>
        </label>

        {skills.map((skill, index) => (
          <div className="flex flex-col" key={index}>
            <input
              className="form_input w-6/12"
              type="text"
              value={skill}
              onChange={(e) => {
                const updatedSkills = [...skills];
                updatedSkills[index] = e.target.value;
                setSkills(updatedSkills);
              }}
            />

            <button
              className="px-5 py-1.5 my-5 text-sm bg-primary-orange rounded-full text-white max-w-fit self-end"
              type="button"
              onClick={() => {
                const updatedSkills = [...skills];
                updatedSkills.splice(index, 1);
                index === 0 ? setSkills([""]) : setSkills(updatedSkills);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
          onClick={() => {
            setSkills([...skills, ""]);
          }}
        >
          Add Skill
        </button>
      </div>
      <button
        className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
        type="submit"
      >
        Submit and Continue
      </button>
    </form>
  );
};

export default SkillsForm;
