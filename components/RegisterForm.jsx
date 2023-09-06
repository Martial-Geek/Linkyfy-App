"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function RegisterForm({ onChange, onSubmit }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  const handleChange = async (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Register Request Successful");
        router.push("/signin");
      } else {
        console.log("Register request unsuccessful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!session && (
        <form className="mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form_input"
              onChange={handleChange}
              value={formData.name}
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Phone Number
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              className="form_input"
              onChange={handleChange}
              value={formData.phone}
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Email/Username
            </span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form_input"
              onChange={handleChange}
              value={formData.email}
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form_input"
              onChange={handleChange}
              value={formData.password}
            />
          </label>

          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="space-x-2">
            <span className="font-satoshi text-sm">Already a user?</span>{" "}
            <Link
              href="/signin"
              className="w-full bg-blue-400 rounded-xl text-white text-sm px-2 py-1"
            >
              Sign In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
