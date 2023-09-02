"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const CertificationsForm = ({ afterSubmit }) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [certifications, setCertifications] = useState([
    {
      skillName: "",
      platform: "",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/details/certifications/${id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certifications),
      });

      if (response.ok) {
        afterSubmit();
        console.log("Certifications added successfully!");
      } else {
        console.error("Error adding certifications");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(certifications);
  return (
    <form
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col px-14">
        {certifications.map((certification, index) => (
          <div className="flex flex-col w-full px-14" key={index}>
            <h2 className="desc">Certification {index + 1}</h2>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Skill Name
              </span>
              <input
                className="form_input"
                type="text"
                value={certification.skillName}
                onChange={(e) => {
                  const updatedExperience = {
                    ...certification,
                    skillName: e.target.value,
                  };
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index] = updatedExperience;
                  setCertifications(updatedCertifications);
                }}
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Platform
              </span>
              <input
                className="form_input"
                type="text"
                value={certification.platform}
                onChange={(e) => {
                  const updatedExperience = {
                    ...certification,
                    platform: e.target.value,
                  };
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index] = updatedExperience;
                  setCertifications(updatedCertifications);
                }}
              />
            </label>
            <button
              className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
              type="button"
              onClick={() => {
                const updatedCertifications = [...certifications];
                updatedCertifications.splice(index, 1);
                updatedCertifications.length === 0
                  ? setCertifications([
                      {
                        skillName: "",
                        platform: "",
                      },
                    ])
                  : setCertifications(updatedCertifications);
              }}
            >
              Remove Certification
            </button>
          </div>
        ))}
        <button
          className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit s"
          type="button"
          onClick={(e) => {
            setCertifications([
              ...certifications,
              {
                skillName: "",
                platform: "",
              },
            ]);
          }}
        >
          Add Certification
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

export default CertificationsForm;
