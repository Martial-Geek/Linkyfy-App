"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

function page({ onChange, onSubmit }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignInInputChange = async (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    const signInResult = await signIn("credentials", {
      username: signInData.email,
      password: signInData.password,
      callbackUrl: "http://localhost:3000/profile",
    });
    if (signInResult?.error) {
      // Handle sign-in error
      console.log("Sign-in error:", signInResult.error);
    }
  };

  return (
    <div>
      {!session && (
        <div className="flex flex-col">
          <span className="head_text blue_gradient py-4 mx-auto">
            Sign In Form
          </span>
          <br />
          <form
            onSubmit={handleSignInSubmit}
            className="mt-10 w-56 flex flex-col gap-7 glassmorphism mx-auto"
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Email/Username
              </span>
              <input
                required
                type="text"
                name="email"
                placeholder="Email"
                className="form_input"
                onChange={handleSignInInputChange}
                value={signInData.email}
              />
            </label>

            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Password
              </span>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="form_input"
                onChange={handleSignInInputChange}
                value={signInData.password}
              />
            </label>

            <button
              type="submit"
              className="px-5 py-1.5 max-w-fit mx-auto text-sm bg-primary-orange rounded-full text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default page;
