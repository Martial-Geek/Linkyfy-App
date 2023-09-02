"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams, useParams } from "next/navigation";

const SkillsRoute = () => {
  const router = useRouter();

  const data = useSearchParams();
  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    const skillDetails = event.target.skills.value;
    const newData = JSON.parse(data);
    newData.skillsDetails = skillDetails;
    router.push(
      `/extradetails/education?data=${encodeURIComponent(
        JSON.stringify(newData)
      )}`
    );
  };

  return (
    <div>
      Skills Page
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-lg flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Skills
          </span>
          <textarea className="form_textarea" name="skills" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillsRoute;
