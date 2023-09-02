"use client";
import React, { useState } from "react";

const Form = ({ onChange, onSubmit }) => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  // });

  // const [userEmail, setUserEmail] = useState("");

  // const router = useRouter();

  // const handleSubmitSign = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/signin", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: userEmail,
  //       }),
  //     });

  //     if (response.status === 201) {
  //       router.push("/profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/submit-form", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         phone: formData.phone,
  //       }),
  //     });

  //     if (response.status === 201) {
  //       router.push("/profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleInputChangeSign = (e) => {
  //   const { value } = e.target;
  //   setUserEmail(value);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  return (
    <div className="flex space-x-64">
      <div className="flex flex-col">
        <h1 className="head_text">Signup Form</h1>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          {/* Name */}
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Name{" "}
            </span>
            <input
              onChange={onChange}
              name="name"
              type="text"
              placeholder="Name"
              required
              className="form_input"
            />
          </label>

          {/* Email */}

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Email{" "}
            </span>
            <input
              onChange={onChange}
              name="email"
              type="text"
              placeholder="Email"
              required
              className="form_input"
            />
          </label>

          {/* Phone No */}

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Phone No{" "}
            </span>
            <input
              onChange={onChange}
              name="phone"
              type="text"
              placeholder="Phone No"
              required
              className="form_input"
            />
          </label>

          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>

      {/* <div className="flex flex-col">
        <h1 className="head_text">Signin Form</h1>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Email{" "}
            </span>
            <input
              onChange={handleInputChangeSign}
              name="useremail"
              type="text"
              placeholder="Email"
              required
              className="form_input"
            />
          </label>

          <button type="submit" onClick={handleSubmitSign}>
            Sign In
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Form;
