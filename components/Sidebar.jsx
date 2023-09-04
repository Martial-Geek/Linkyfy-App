"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Sidebar = ({ handleSectionChange, activeSection }) => {
  const [hideButton, setHideButton] = useState(false);
  const { data: session } = useSession();
  const id = session?.user.id;

  useEffect(() => {
    const fetchIsAllTrue = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/details/all/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const { info } = await response.json();
            setHideButton(info.exist);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };
    fetchIsAllTrue();
  }, [id]);

  return (
    <div className="flex-col flex h-screen w-64 bg-white border border-r-slate-200 justify-between">
      {/* FIRST TWO BUTTONS */}
      <div className="flex flex-col items-center mt-2">
        <button
          className={`w-3/4 inline-block px-3 py-1 text-sm rounded-full mb-2 ${
            activeSection === "dashboard"
              ? "bg-gray-300 text-gray-600 shadow-md"
              : "bg-primary-orange text-white"
          }`}
          onClick={() => handleSectionChange("dashboard")}
        >
          My Dashboard
        </button>
        <button
          className={`w-3/4 inline-block px-3 py-1 text-sm rounded-full mb-2 ${
            activeSection === "connections"
              ? "bg-gray-300 text-gray-600 shadow-md"
              : "bg-primary-orange text-white"
          }`}
          onClick={() => handleSectionChange("connections")}
        >
          My Connections
        </button>
      </div>
      {/* LAST TWO BUTTONS */}
      <div className="flex flex-col items-center">
        {session && (
          <button
            className="w-3/4 px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-2"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Sign out
          </button>
        )}

        {/* {session && (
          <button className="w-auto4 px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-2">
            Provide Additional Details
          </button>
        )} */}

        {session && !hideButton && (
          <Link
            className="w-auto px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-2"
            href="/additionalinfo"
          >
            <span>Provide Details</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
