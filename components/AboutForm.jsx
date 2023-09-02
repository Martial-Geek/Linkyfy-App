"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AboutForm = ({ afterSubmit }) => {
  const [aboutMe, setAboutMe] = useState("");

  const { data: session } = useSession();
  const id = session?.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(aboutMe);
      const response = await fetch(`/api/details/about/${id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aboutMe: aboutMe, userId: session?.user.id }),
      });

      if (response.ok) {
        console.log("About POST request successful");
        afterSubmit();
      } else {
        console.error("About POST request failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network or other errors here
    }
  };

  return (
    <form
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            About
          </span>
        </label>
        <textarea
          required
          className="form_textarea"
          value={aboutMe}
          onChange={(e) => {
            setAboutMe(e.target.value);
          }}
        />
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

export default AboutForm;
