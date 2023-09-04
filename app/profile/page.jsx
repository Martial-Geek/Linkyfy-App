"use client";
import React from "react";
import Nav from "@components/Navbar";
import Link from "next/link";
// import AdditionalDetailsModal from "@components/AdditionalDetailsModal";
import Dashboard from "@components/Dashboard";
import Connections from "@components/Connections";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@components/Sidebar";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user.id;

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div>
      {session ? <div></div> : <></>}
      {/* <AdditionalDetailsModal isOpen={isModalOpen} onClose={closeModal} /> */}

      <div className="flex">
        <div className="hidden md:flex">
          <Sidebar
            handleSectionChange={handleSectionChange}
            activeSection={activeSection}
          />
        </div>

        <div className="min-h-screen w-full bg-slate-100 overflow-auto">
          <Nav handleSectionChange={handleSectionChange} />
          {activeSection === "dashboard" ? <Dashboard /> : null}
          {activeSection === "connections" ? <Connections /> : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
