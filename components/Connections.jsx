"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import MyConnections from "./MyConnections";
import NewConnection from "./NewConnection";
import Loading from "./Loading";

const Connections = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [isExist, setIsExist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch(`/api/details/all/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        const {
          aboutMeExists,
          certificationExists,
          educationExists,
          experienceExists,
          skillsExist,
        } = data;

        const isAllTrue =
          aboutMeExists &&
          certificationExists &&
          educationExists &&
          experienceExists &&
          skillsExist;

        setIsExist(isAllTrue);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, [id]);

  if (isExist && !loading) {
    return (
      <div>
        <div className="flex flex-col">
          <MyConnections />
          <NewConnection />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        {loading && <Loading size={35} />}
        <span className="font-satoshi text-2xl text-slate-600 mx-6 my-6">
          Complete your profile to view connections!
        </span>
        <Link
          href="/additionalinfo"
          className="px-5 py-1.5 mx-5 text-sm max-w-fit bg-primary-orange rounded-full text-white"
        >
          Provide Details
        </Link>
      </div>
    );
  }
};

export default Connections;
