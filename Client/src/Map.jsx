import PolyLine from "./PolyLine";
import { useEffect, useState } from "react";

// Context for component to component communication
// import { EquipmentContext } from "./EquipmentDataProvider";
export function Map({ onUpdate }) {
  // Pannning Variables
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Zooming Variables
  const [scale, setScale] = useState(1);
  const minZoom = 0.5;
  const maxZoom = 3;

  // Equipment Context
  // const { equipment, setEquipment } = useContext(EquipmentContext);
  // const updateEquipmentInfo = (equipmentId) => {
  //   setEquipment(equipmentId);
  // };
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
  const handleMouseMove = (e) => {
    if (isDragging === true) {
      const newX = e.clientX - delta.x;
      const newY = e.clientY - delta.y;

      setPos({ x: newX, y: newY });
    }
  };

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
  }, [isDragging]); // Re-run the effect if isDragging changes

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
      >
        {/* 1100 + last half of 1200 side. */}
        <g name="Line 1">
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
        <g name="Line 2">
          <PolyLine
            type="Short"
            style={{ transform: "translate(1565px, 655px) rotate(90deg)" }}
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
        <g name="Line 3">
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
            type="Short"
            style={{ transform: "translate(1750px,760px)  rotate(90deg)" }}
          />
        </g>
      </svg>
    </div>
  );
}
