"use client";

import React from "react";
import { useState, useEffect } from "react";
import AboutForm from "@components/AboutForm";
import SkillsForm from "@components/SkillsForm";
import EducationForm from "@components/EducationForm";
import ExperienceForm from "@components/ExperienceForm";
import CertificationsForm from "@components/CertificationsForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@components/Loading";
import Link from "next/link";

const page = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [activeForm, setActiveForm] = useState(0);
  const [dataExists, setDataExists] = useState({
    about: false,
    skills: false,
    education: false,
    experience: false,
    certifications: false,
  });
  const [allExist, setAllExist] = useState(false);
  const { data: session } = useSession();
  const id = session?.user.id;

  console.log(dataExists);

  const doAllExist = () => {
    const areAllFieldsTrue = Object.values(dataExists).every(
      (value) => value === true
    );
    if (areAllFieldsTrue) {
      setAllExist(true);

      //POST-REQ to set true
      const setTrueFalse = async () => {
        try {
          const response = await fetch(`/api/details/exist/${id}/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(areAllFieldsTrue), // Convert experiences array to JSON
          });

          if (response.ok) {
            console.log("Truth/False added successfully!");
          } else {
            console.error("Error adding truth/false");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      setTrueFalse();
    }
  };

  useEffect(() => {
    const fetchAboutInfo = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/details/all/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const {
              aboutMeExists,
              skillsExist,
              educationExists,
              experienceExists,
              certificationExists,
            } = await response.json();
            console.log(educationExists);
            setDataExists((prevState) => ({
              ...prevState,
              about: aboutMeExists,
              skills: skillsExist,
              education: educationExists,
              experience: experienceExists,
              certifications: certificationExists,
            }));
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      }
    };
    fetchAboutInfo();
  }, [id]);

  useEffect(() => {
    doAllExist(); // Call it initially

    // Watch for changes in dataExists
    // const areAllFieldsTrue = Object.values(dataExists).every(
    //   (value) => value === true
    // );
    // if (!areAllFieldsTrue) {
    //   doAllExist();
    // }
  }, [dataExists]);

  const handleSubmit = async () => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
        setTimeout(() => setActiveForm((prev) => prev + 1), 500);
      }, 500);
    }, 500);
  };

  if (loading) {
    return <Loading size={35} />;
  }
  return (
    <div>
      {allExist ? (
        <div className="flex flex-col text-center">
          <h1 className="head_text">The Form is completed!</h1>
          <Link
            className="px-5 py-1.5 my-5 max-w-fit text-sm bg-primary-orange rounded-full text-white mx-auto"
            href="/profile"
          >
            Back to Profile
          </Link>
        </div>
      ) : (
        <h1 className="head_text">Welcome!</h1>
      )}

      {/* Buttons */}
      <div className="flex">
        {!dataExists.about && (
          <button
            className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
            onClick={() => setActiveForm(1)}
          >
            About
          </button>
        )}

        {!dataExists.skills && (
          <button
            className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
            onClick={() => setActiveForm(2)}
          >
            Skills
          </button>
        )}

        {!dataExists.education && (
          <button
            className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
            onClick={() => setActiveForm(3)}
          >
            Education
          </button>
        )}

        {!dataExists.experience && (
          <button
            className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
            onClick={() => setActiveForm(4)}
          >
            Experience
          </button>
        )}

        {!dataExists.certifications && (
          <button
            className="px-5 py-1.5 mx-5 my-5 text-sm bg-primary-orange rounded-full text-white"
            onClick={() => setActiveForm(5)}
          >
            Certifications
          </button>
        )}
      </div>

      {/* Forms  */}

      <div className="flex">
        {!dataExists.about && activeForm == 1 && (
          <AboutForm afterSubmit={handleSubmit} />
        )}
      </div>
      <div className="flex">
        {!dataExists.skills && activeForm == 2 && (
          <SkillsForm afterSubmit={handleSubmit} />
        )}
      </div>
      <div className="flex">
        {!dataExists.education && activeForm == 3 && (
          <EducationForm afterSubmit={handleSubmit} />
        )}
      </div>
      <div className="flex">
        {!dataExists.experience && activeForm == 4 && (
          <ExperienceForm afterSubmit={handleSubmit} />
        )}
      </div>
      <div className="flex">
        {!dataExists.certifications && activeForm == 5 && (
          <CertificationsForm afterSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default page;
