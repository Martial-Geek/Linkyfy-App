// components/DropdownMenu.js
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const DropdownMenu = ({ handleSectionChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex p-4">
      <button
        onClick={toggleDropdown}
        className="hamburger-menu focus:outline-none"
      >
        {/* <span className="bar">1</span>
        <span className="bar">2</span>
        <span className="bar">3</span> */}
        <Image src="/hamburger.png" width={35} height={35} alt="icon" />
      </button>

      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } mt-2 bg-white border rounded shadow-md absolute z-10`}
      >
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          onClick={() => handleSectionChange("dashboard")}
        >
          My Dashboard
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          onClick={() => handleSectionChange("connections")}
        >
          My Connections
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          onClick={() => signOut()}
        >
          Log Out
        </a>
      </div>
    </div>
  );
};

export default DropdownMenu;
