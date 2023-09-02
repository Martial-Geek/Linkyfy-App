"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ExperienceForm = ({ afterSubmit }) => {
  const { data: session } = useSession();
  const id = session?.user.id;

  const [experiences, setExperiences] = useState([
    {
      duration: 0,
      startingYear: "",
      endingYear: "",
      companyName: "",
      jobType: "",
      jobStatus: "",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/details/experiences/${id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experiences), // Convert experiences array to JSON
      });

      if (response.ok) {
        afterSubmit();
        // The POST request was successful, handle the response here
        console.log("Experiences added successfully!");
      } else {
        // Handle error response
        console.error("Error adding experiences");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col px-14">
        {experiences.map((experience, index) => (
          <div className="flex flex-col w-full px-14" key={index}>
            <h2 className="desc">Experience {index + 1}</h2>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Duration (in months)
              </span>
              <input
                className="form_input"
                type="number"
                value={experience.duration}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    duration: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Starting Year
              </span>
              <input
                className="form_input"
                type="text"
                value={experience.startingYear}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    startingYear: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Ending Year
              </span>
              <input
                className="form_input"
                type="text"
                value={experience.endingYear}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    endingYear: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Company Name
              </span>
              <input
                className="form_input"
                type="text"
                value={experience.companyName}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    companyName: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Job Type
              </span>
              <input
                className="form_input"
                type="text"
                value={experience.jobType}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    jobType: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Job Status
              </span>
              <input
                className="form_input"
                type="text"
                value={experience.jobStatus}
                onChange={(e) => {
                  const updatedExperience = {
                    ...experience,
                    jobStatus: e.target.value,
                  };
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index] = updatedExperience;
                  setExperiences(updatedExperiences);
                }}
              />
            </label>
            <button
              className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
              type="button"
              onClick={() => {
                const updatedExperiences = [...experiences];
                updatedExperiences.splice(index, 1);
                updatedExperiences.length === 0
                  ? setExperiences([
                      {
                        duration: 0,
                        startingYear: "",
                        endingYear: "",
                        companyName: "",
                        jobType: "",
                        jobStatus: "",
                      },
                    ])
                  : setExperiences(updatedExperiences);
              }}
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button
          className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit s"
          type="button"
          onClick={(e) => {
            setExperiences([
              ...experiences,
              {
                duration: 0,
                startingYear: "",
                endingYear: "",
                companyName: "",
                jobType: "",
                jobStatus: "",
              },
            ]);
          }}
        >
          Add Experience
        </button>
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

export default ExperienceForm;
