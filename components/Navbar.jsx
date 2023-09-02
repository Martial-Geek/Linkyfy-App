"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DropdownMenu from "./DropdownMenu";

export default function Navbar({ handleSectionChange }) {
  const { data: session } = useSession();

  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(true);
  const [ImageSet, setImageSet] = useState(null);

  useEffect(() => {
    const updatePfp = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/profile`);
      const data = await response.json();
      console.log(data);

      if (data) setImageSet(data.pfp);
    };
    if (session?.user.id) updatePfp();
  }, []);

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  return (
    <section>
      {/* NAV */}
      <div className="flex justify-between md:justify-end border-b border-gray-200">
        {/* left icons small devices*/}
        <div className="flex md:hidden ml-6 mt-5 mb-5">
          <div className="self-center justify-items-center mr-5">
            <DropdownMenu handleSectionChange={handleSectionChange} />
          </div>
          <Image src="/bell-solid.svg" width={30} height={30} alt="Icon" />
        </div>

        {/* All devices right icons  */}
        <div className="flex my-6 mx-6">
          {/* Icon */}

          <div className="flex">
            <Image src="/bell-solid.svg" width={25} height={25} alt="Icon" />
          </div>

          <div className="flex md:border border-slate-100 border-1 shadow-inner shadow-slate-200 hover:shadow-slate-400 mx-4 px-3 items-start justify-between rounded-lg">
            {/* Image  */}

            <img
              src={session?.user ? ImageSet : "/icons8-user-48.png"}
              width={30}
              height={30}
              alt="Icon"
              className="rounded-full md:rounded-lg self-center"
            />
            <div className="flex-col px-6 py-1 hidden md:flex font-serif font-semibold text-slate-700">
              <h3>Welcome Back!</h3>
              <p>{session?.user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
