import React from "react";

function Navbar() {
  return (
    <div className="bg-cc-element w-64 h-screen flex flex-wrap content-start shadow-2xl">
      <h1 className="text-center w-full mt-8 text-gray-500 text-xl font-bold">
        SFL7<br></br> Parts Map
      </h1>
      <hr className="border-gray-500 w-full mt-2 mx-4" />
      <ul>
        <li>Map</li>
        <li>All Parts</li>
      </ul>
    </div>
  );
}

export default Navbar;
