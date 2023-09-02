import React from "react";

const Loading = ({ size }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[50%] flex-center">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="animate-spin"
        >
          <div
            className="h-full w-full border-4 border-t-purple-500
                   border-b-purple-700 rounded-[50%]"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
