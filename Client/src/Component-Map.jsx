import PolyLine from "./PolyLine";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import UI from "./UI";

function Map({ onUpdate }) {
  // Pannning Variables
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Zooming Variables
  const [scale, setScale] = useState(1);
  const minZoom = 0.5;
  const maxZoom = 3;

  // Layers Variables
  const [activeLayer, setActiveLayer] = useState(0);

  const updateMapLayers = (activeLayer) => {
    setActiveLayer(activeLayer);
  };

  // SVG PANNING -----------------------------------------------------------------------------------------------------------------------------
  // Sets the newX and newY const variables. Also allows for dragging.
  const handleMouseDown = (e) => {
    setDelta({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });

    setIsDragging(true);
  };

  // While the mouse is held down it will constantly update the newX and newY to the difference of the mouse pos and delta pos.
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging === true) {
        const newX = e.clientX - delta.x;
        const newY = e.clientY - delta.y;

        setPos({ x: newX, y: newY });
      }
    },
    [isDragging, delta.x, delta.y]
  );

  // When the mouse button is let up it stops the dragging.
  const handleMouseUp = (e) => {
    setTimeout(() => {
      setIsDragging(false);
    }, 0);
  };

  // Needed for window mouse events to ensure its smooth when moving.
  // Use effect will run once every time the page loads. Then it will re run if the hook isDragging changes.
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]); // Re-run the effect if isDragging changes
  //------------------------------------------------------------------------------------------------------------------------------------------

  // SVG ZOOMING -----------------------------------------------------------------------------------------------------------------------------
  // Negative Delta Y is zooming in and opposite for positive Delta Y
  const handleWheel = (e) => {
    let newScale = scale;
    if (e.deltaY < 0) {
      // Zoom in
      newScale = Math.min(scale * 1.1, maxZoom);
    } else {
      // Zoom out
      newScale = Math.max(scale * 0.9, minZoom);
    }

    setScale(newScale);
  };
  //------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="w-screen h-screen bg-cc-dark overflow-hidden ">
      {/* SVG */}
      {/* On Mouse Down will call the handleMouseDown event. and the style will update the position of the entire SVG  */}
      <svg
        className=" w-full h-full text-white border-2 bg-cc-light-gray cursor-pointer shadow-2xl"
        // Event Handlers
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        }}
        viewBox="350 0 1500 1000"
      >
        {/* 1100 + last half of 1200 side. */}
        <g
          name="Line 1"
          className={activeLayer === 1 || activeLayer === 4 ? "" : "hidden"}
        >
          <PolyLine
            type="Medium"
            style={{ transform: "translate(625px, 425px) rotate(90deg)" }}
            onClick={() => onUpdate("02345")}
            name="02345"
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(625px,590px) rotate(270deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(1250px, 590px" }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(945px,590px)" }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(640px,590px)" }}
          />

          {/* AutoSAL 1 */}
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1565px,590px) rotate(90deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Short"
            style={{ transform: "translate(1565px, 605px) rotate(90deg)" }}
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1565px,645px) rotate(180deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(1250px,645px)" }}
          />
          {/* BEGIN SEGMENTS */}

          {/* Loops in order to get rid of repetitive code.  */}
          {Array.from({ length: 15 }, (_, index) => (
            <PolyLine
              key={index}
              type="Segmented"
              style={{ transform: `translate(${1235 - index * 15}px, 645px)` }}
            />
          ))}
        </g>

        {/* 1300 + first half of 1200 side */}
        {/* CHANGE ALERT, need to change between the two portecs how long that belt is on the map.  */}
        <g
          name="Line 2"
          className={activeLayer === 2 || activeLayer === 4 ? "" : "hidden"}
        >
          <PolyLine
            type="Long"
            style={{
              transform: "translate(1250px, 100px",
            }}
            onClick={() => onUpdate("02300")}
            name="02300"
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(945px,100px" }}
            onClick={() => onUpdate("02310")}
            name="02310"
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(640px,100px" }}
            onClick={() => onUpdate("02320")}
            name="02320"
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(625px,100px",
              strokeLinejoin: "bevel",
            }}
            onClick={() => onUpdate("02325")}
            name="02325"
          />
          <PolyLine
            type="Medium"
            style={{ transform: "translate(625px, 115px) rotate(90deg)" }}
            onClick={() => onUpdate("02330")}
            name="02330"
          />
          <PolyLine
            type="Medium"
            style={{ transform: "translate(625px, 270px) rotate(90deg)" }}
            onClick={() => onUpdate("02340")}
            name="02340"
          />
          <PolyLine
            type="Medium"
            style={{ transform: "translate(625px, 425px) rotate(90deg)" }}
            onClick={() => onUpdate("02345")}
            name="02345"
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(625px,590px) rotate(270deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(1250px, 590px" }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(945px,590px)" }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(640px,590px)" }}
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1565px,590px) rotate(90deg)",
              strokeLinejoin: "bevel",
            }}
          />
          s
          <PolyLine
            type="Medium-Long"
            style={{ transform: "translate(1565px, 605px) rotate(90deg)" }}
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1565px,695px) rotate(180deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Long"
            style={{ transform: "translate(1250px,695px)" }}
          />
          {/* BEGIN SEGMENTS */}
          {/* Loops in order to get rid of repetitive code.  */}
          {Array.from({ length: 15 }, (_, index) => (
            <PolyLine
              key={index}
              type="Segmented"
              style={{ transform: `translate(${1235 - index * 15}px, 695px)` }}
            />
          ))}
        </g>

        {/* Injection Line */}
        <g
          name="Line 3"
          className={activeLayer === 3 || activeLayer === 4 ? "" : "hidden"}
        >
          <PolyLine
            type="Long"
            style={{ transform: "translate(1250px,745px)" }}
          />

          {/* BEGIN SEGMENTS */}

          {/* Loops in order to get rid of repetitive code.  */}
          {Array.from({ length: 15 }, (_, index) => (
            <PolyLine
              key={index}
              type="Segmented"
              style={{ transform: `translate(${1235 - index * 15}px, 745px)` }}
            />
          ))}

          <PolyLine
            type="Medium"
            style={{ transform: "translate(1555px,745px)" }}
          />
          {/* Merger */}
          <PolyLine
            type="Short"
            style={{ transform: "translate(1655px,745px) rotate(-35deg)" }}
          />
          <PolyLine
            type="Short"
            style={{ transform: "translate(1675px,731px) rotate(-35deg)" }}
          />
          <PolyLine
            type="Short"
            style={{ transform: "translate(1694px,717px)" }}
          />
          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1734px,717px) rotate(180deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Short"
            style={{ transform: "translate(1710px,745px)" }}
          />

          <PolyLine
            type="Portec"
            style={{
              transform: "translate(1750px,745px) rotate(90deg)",
              strokeLinejoin: "bevel",
            }}
          />
          <PolyLine
            type="Medium"
            style={{ transform: "translate(1734px,550px) rotate(90deg)" }}
          />
          <PolyLine
            type="Medium"
            style={{ transform: "translate(1734px,395px) rotate(90deg)" }}
          />

          <PolyLine
            type="Short"
            style={{ transform: "translate(1750px,760px)  rotate(90deg)" }}
          />
        </g>
      </svg>

      {/* Overlay UI. */}
      <UI onAction={updateMapLayers}></UI>
    </div>
  );
}
export default Map;
