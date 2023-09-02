import React from "react";
import { useSession } from "next-auth/react";

const PersonalInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col border border-1 border-slate-300 shadow-inner shadow-slate-200 w-10/12 rounded-lg ml-6 my-9 px-5 py-3">
      <span className="text-xl ml-2 mt-2 font-satoshi font-semibold">Name</span>
      <p className="text-lg text-slate-600 ml-3 my-3 font-satoshi">
        {session?.user.name}
      </p>
      <span className="text-xl ml-2 mt-2 font-satoshi font-semibold">
        Email
      </span>
      <p className="text-lg text-slate-600 ml-3 my-3 font-satoshi">
        {session?.user.email}
      </p>
      <span className="text-xl ml-2 mt-2 font-satoshi font-semibold">
        Phone Number
      </span>
      <p className="text-lg text-slate-600 ml-3 my-3 font-satoshi">
        {session?.user.phone}
      </p>
    </div>
  );
};

export default PersonalInfo;
