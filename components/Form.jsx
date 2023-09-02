"use client";
import React, { useState } from "react";

const Form = ({ onChange, onSubmit }) => {
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

          <button
            type="submit"
            onClick={onSubmit}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
