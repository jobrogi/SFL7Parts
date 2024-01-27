import React, { useState } from "react";

function UI({ onAction }) {
  // Active and Not int for button states.
  // 0 = None, 1 = Line 1, 2 = line 2, 3 = line 3, 4 = all lines
  const [isActive, setActive] = useState(1);

  if (typeof onAction !== "function") {
    console.log(onAction);
    return;
  }

  return (
    // The point of this Component is to dictate which part of the map is showing and what part isnt.
    // It is easier in my opinion to change the layers of map based off the line.
    // Changing layers based off the line will people help understand the flow of the building.

    <div className=" fixed w-fit h-fit top-0 left-0 z-200 p-2">
      <ul className="flex gap-2">
        <li>
          <button
            onClick={() => {
              setActive(1);
              onAction(1);
            }}
            className={
              isActive === 1
                ? "bg-green-500 p-2 hover:border border-green-500 "
                : "bg-red-500 p-2 hover:border border-red-500 "
            }
          >
            Line 1
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              setActive(2);
              onAction(2);
            }}
            className={
              isActive === 2
                ? "bg-green-500 p-2 hover:border border-green-500 "
                : "bg-red-500 p-2 hover:border border-red-500 "
            }
          >
            Line 2
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActive(3);
              onAction(3);
            }}
            className={
              isActive === 3
                ? "bg-green-500 p-2 hover:border border-green-500 "
                : "bg-red-500 p-2 hover:border border-red-500 "
            }
          >
            Line 3
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              setActive(4);
              onAction(4);
            }}
            className={
              isActive === 4
                ? "bg-green-500 p-2 hover:border border-green-500 "
                : "bg-red-500 p-2 hover:border border-red-500 "
            }
          >
            All Lines
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UI;
