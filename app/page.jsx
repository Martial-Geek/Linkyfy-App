"use client";
import Form from "../components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const handleSignUpInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.status === 201) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Form onChange={handleSignUpInputChange} onSubmit={handleSignUpSubmit} />
    </section>
  );
};
export default Home;
