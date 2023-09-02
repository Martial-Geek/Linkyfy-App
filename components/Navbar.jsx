"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(true);

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  return (
    <section>
      <div className="flex">
        <div className="h-screen w-64 bg-white">Hi</div>
        <div className="h-screen w-full bg-slate-200">
          {/* NAV */}
          <div className="flex flex-end border-b border-gray-300">
            <div className="flex my-6 mx-6">
              <div className="flex">
                <Image
                  src="/bell-solid.svg"
                  width={30}
                  height={30}
                  alt="Icon"
                ></Image>
              </div>
              <div className="flex border border-black border-1 mx-4">
                <Image
                  src="/icons8-user-48.png"
                  width={36}
                  height={36}
                  alt="Icon"
                ></Image>
                <div className="flex flex-col">
                  <h3 className="px-6">Welcome Back!</h3>
                  <p className="px-6">Vishnu Swarup!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="parent relative w-11/12">
            <div className="flex flex-start w-full bg-sky-600 rounded-md mt-2 h-48">
              <p className="text-white">MY PROFILE</p>
            </div>
            <div className="absolute bg-white top-2/4 left-1/2 transform -translate-x-1/2 w-10/12 rounded-md h-96 flex">
              <div className="w-1/2">
                <div className="flex justify-between">
                  <Image
                    src="/icons8-user-48.png"
                    width={120}
                    height={120}
                    alt="Icon"
                    className="mx-4 my-4 "
                  ></Image>
                  <button
                    className="
                  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 my-4 px-4 rounded-lg shadow-md"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
              <div className="w-1/2">Hi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
