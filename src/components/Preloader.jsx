import React from "react";

const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-80 bg-white z-50">
      <div className="border-4 border-opacity-10 w-9 h-9 rounded-full border-blue-500 animate-spin"></div>
    </div>
  );
};

export default Preloader;