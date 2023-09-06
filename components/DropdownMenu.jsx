"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const DropdownMenu = ({ handleSectionChange }) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [hideButton, setHideButton] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex p-4">
      <button
        onClick={toggleDropdown}
        className="hamburger-menu focus:outline-none"
      >
        <Image src="/hamburger.png" width={35} height={35} alt="icon" />
      </button>

      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } mt-2 bg-white border rounded shadow-md absolute z-10 top-16 left-10`}
      >
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border border-b-1"
          onClick={() => handleSectionChange("dashboard")}
        >
          My Dashboard
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border border-b-1"
          onClick={() => handleSectionChange("connections")}
        >
          My Connections
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border border-b-1"
          onClick={() => signOut()}
        >
          Log Out
        </a>
        {session && !hideButton && (
          <a
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border border-b-1"
            href="/additionalinfo"
          >
            Provide Details
          </a>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
