"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const AboutMeRoute = () => {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const aboutDetails = event.target.about.value;
    const data = JSON.stringify({ aboutDetails });
    router.push(
      `/extradetails/skills?aboutDetails=${encodeURIComponent(data)}`
    );
  };

  return (
    <div>
      <h2>About Details</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-lg flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            About
          </span>
          <textarea className="form_textarea" name="about" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AboutMeRoute;
