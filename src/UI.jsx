import React from "react";

function UI() {
  return (
    // The point of this Component is to dictate which part of the map is showing and what part isnt.
    // It is easier in my opinion to change the layers of map based off the line.
    // Changing layers based off the line will people help understand the flow of the building.
    
    <div className=" fixed w-fit h-fit top-0 left-0 z-200 p-2">
      <ul className="flex gap-2">
        <li>
          <button className="bg-red-500 p-2 hover:border border-red-500 ">
            Line 1
          </button>
        </li>

        <li>
          <button className="bg-red-500 p-2 hover:border border-red-500 ">
            Line 2
          </button>
        </li>
        <li>
          <button className="bg-red-500 p-2 hover:border border-red-500 ">
            Line 3
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UI;
