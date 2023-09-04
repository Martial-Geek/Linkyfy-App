"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import MyConnections from "./MyConnections";
import NewConnection from "./NewConnection";

const Connections = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${id}/details`);
        if (response.ok) {
          const data = await response.json();
          setDetails(data);
        } else {
          console.error("Failed to fetch details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <MyConnections />
        <NewConnection />
      </div>
    </div>
  );
};

export default Connections;
