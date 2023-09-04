"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const NewConnection = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}/connections/dontexist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.length != 0) {
          const updatedUser = [
            { name: "", id: "", pfp: "", jobType: "", companyName: "" },
          ];
          // for (let i = 0; i < data.details.length; i++) {
          //   updatedUser[i].name = data.details[i].name;
          //   updatedUser[i].id = data.details[i]._id;
          // }
          // for (let i = 0; i < data.infos.length; i++) {
          //   updatedUser[i].jobType = data.infos[i].experiences[0].jobType;
          //   updatedUser[i].companyName =
          //     data.infos[i].experiences[0].companyName;
          // }
          // for (let i = 0; i < data.profile.length; i++) {
          //   updatedUser[i].pfp = data.profile[i].pfp;
          // }
          for (let i = 0; i < data.details.length; i++) {
            updatedUser[i].name = data.details[i].name;
            updatedUser[i].id = data.details[i]._id;
            updatedUser[i].jobType = data.infos[i].experiences[0].jobType;
            updatedUser[i].companyName =
              data.infos[i].experiences[0].companyName;
            updatedUser[i].pfp = data.profile[i].pfp;
          }
          setUsers(...users, updatedUser);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getUser();
  }, [id]);

  const handleConnect = async (receiverId) => {
    try {
      const response = await fetch(`/api/users/${id}/connect`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ id, receiverId }),
      });

      if (response.ok) {
        console.log("POST req successful");
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (users.length != 0) {
    return (
      <div className="flex flex-col my-9 ml-3">
        <p className="font-serif text-2xl text-slate-600">
          People you can also connect
        </p>
        {users.map((user, index) => (
          <div
            key={index}
            className="flex ml-3 mt-6 border border-slate-200 rounded-md shadow-sm max-w-fit font-satoshi"
          >
            <div className="flex flex-col px-3 py-3">
              <p className="ml-2 mb-4 font-semibold">{user.name}</p>
              <div className="text-slate-400 ml-2">
                <p>{user.jobType}</p>
                <p>{user.companyName}</p>
              </div>

              <button
                className="mt-4 px-3 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                type="submit"
                onClick={() => handleConnect(user.id)}
              >
                Connect
              </button>
            </div>

            <div className="flex px-3 py-3 self-center">
              <img
                src={user.pfp}
                alt="PFP"
                className="rounded-full w-28 h-28"
              />
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default NewConnection;
