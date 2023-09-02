"use client";

import React from "react";
import ProfilePic from "./ProfilePic";
import PersonalInfo from "./PersonalInfo";
import About from "./About";
import Skills from "./Skills";
import ProfessionalDetails from "./ProfessionalDetails";
import Certifications from "./Certifications";
import Experience from "./Experience";
import Education from "./Education";
import Loading from "./Loading";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [userInformation, setUserInformation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/details/all/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserInformation(data.info);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchInfo();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loading size={35} />
      </div>
    );
  }
  if (userInformation) {
    return (
      <div className="parent relative mx-3 my-3 md:w-11/12 md:mx-0 md:my-0">
        <div className="flex flex-start w-full bg-indigo-900 rounded-lg mt-6 ml-3 h-56">
          <p className="text-white rounded-xl px-6 py-6">MY PROFILE</p>
        </div>
        <div className="absolute bg-white top-32 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md  flex">
          {/* left half */}
          <div className="hidden md:flex flex-col w-1/2">
            <ProfilePic />
            <PersonalInfo />
            <About about={userInformation.about} />
            <Skills skills={userInformation.skills} />
          </div>
          {/* right half */}
          <div className="hidden md:flex flex-col w-1/2">
            <ProfessionalDetails />
            <Certifications certifications={userInformation.certifications} />
            <Experience experiences={userInformation.experiences} />
            <Education education={userInformation.education} />
          </div>
          <div className="md:hidden flex flex-col ">
            <ProfilePic />
            <PersonalInfo />
            <About about={userInformation.about} />
            <Skills skills={userInformation.skills} />
            <ProfessionalDetails />
            <Certifications certifications={userInformation.certifications} />
            <Experience experiences={userInformation.experiences} />
            <Education education={userInformation.education} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="hidden md:flex flex-col w-1/2">
          <ProfilePic />
          <PersonalInfo />
        </div>
        <div className="md:hidden flex flex-col ">
          <ProfilePic />
          <PersonalInfo />
        </div>
      </div>
    );
  }
};

export default Dashboard;
