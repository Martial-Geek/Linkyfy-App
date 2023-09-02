"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const AdditionalDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    aboutMe: "",
    skills: [],
    education: {
      collegeName: "",
      startingDate: "",
      endingDate: "",
      courseName: "",
      description: "",
    },
    experiences: [],
  });

  const { aboutMe } = formData;

  console.log(aboutMe);

  useEffect(() => {
    if (searchParams) {
      const aboutDetails = searchParams.get("aboutDetails");
      if (aboutDetails) {
        handleAboutMeSubmit(aboutDetails);
      }
    }
  }, []);

  const handleAboutMeSubmit = (aboutMeData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      aboutMe: aboutMeData,
    }));
  };

  const handleSkillsSubmit = (skillsData) => {
    setFormData({ ...formData, skills: skillsData });
  };

  const handleEducationSubmit = (educationData) => {
    setFormData({ ...formData, education: educationData });
  };

  const handleExperienceSubmit = (experienceData) => {
    setFormData({ ...formData, experiences: experienceData });
  };

  const handleSubmitAll = (e) => {
    e.preventDefault();
    // Here you can send formData to your backend
    // console.log("Submitting data:", formData);
  };

  return (
    <div>
      <h1 className="head_text">Welcome User!</h1>
      <button
        className="w-auto px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-2"
        onClick={() => router.push("/extradetails/about")}
      >
        Continue
      </button>
    </div>
  );
};

export default AdditionalDetails;
