"use client";
import Form from "../components/Form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import SignInForm from "@components/SignInForm";

const Home = () => {
  // const { data: session } = useSession();
  // useEffect(() => {
  //   if (session) {
  //     router.push("/profile");
  //   }
  // }, []);

  const handleSignInInputChange = async (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    const signInResult = await signIn("credentials", {
      username: signInData.email,
      password: signInData.password,
      name: signInData.name,
      phone: signInData.phone,
      callbackUrl: "http://localhost:3000/profile",
    });
    if (signInResult?.error) {
      // Handle sign-in error
      console.log("Sign-in error:", signInResult.error);
    }
  };

  const [signInData, setSignInData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Linkyfy
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Connect to professionals
        </span>
      </h1>
      <p className="desc text-center">
        Linkyfy is a place where you can customize your resume and connect with
        other professionals
      </p>
      <SignInForm
        onChange={handleSignInInputChange}
        onSubmit={handleSignInSubmit}
      />
    </section>
  );
};
export default Home;
