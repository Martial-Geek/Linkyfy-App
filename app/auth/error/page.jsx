"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [errorInfo, setErrorInfo] = useState({ path: "", buttonContent: "" });
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  useEffect(() => {
    if (error === "Incorrect Password!") {
      setErrorInfo({ path: "/signin", buttonContent: "Sign In Again" });
    } else if (error === "No User Found!") {
      setErrorInfo({ path: "/", buttonContent: "Register Yourself" });
    }
  }, [error]);

  console.log(error);
  return (
    <div className="flex flex-col max-w-fit mx-auto text-center px-11 py-11 mt-72 border border-slate-300 shadow-lg rounded-lg">
      <span className="head_text ">Error</span>
      <span className="text-2xl font-semibold font-sans my-6 text-slate-500">
        {error}
      </span>
      <Link
        href={errorInfo.path}
        className="max-w-fit px-3 py-3 my-3 mx-auto bg-blue-500 rounded-xl text-white font-satoshi"
      >
        {errorInfo.buttonContent}
      </Link>
    </div>
  );
};

export default page;
