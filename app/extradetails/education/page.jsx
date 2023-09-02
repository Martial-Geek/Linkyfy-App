"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const data = useSearchParams();
  return (
    <div>
      Education <br />
      {data}
    </div>
  );
};

export default page;
