import React from "react";

function PolyLine(props) {
  const handlePolyClick = () => {
    // console.log(props.EquipmentId);
  };
  // Using switch cases to easily create a polyline for every belt we have.
  // Then using the translate property to move the polyline where i need it.
  let points;
  switch (props.type) {
    case "Short":
      points = "0,0 25,0";
      break;
    case "Long":
      points = "0,0 300,0";
      break;
    case "Medium":
      points = "0,0 150,0";
      break;
    case "Segmented":
      points = "0,0 10,0";
      break;
    case "Portec":
      points = "0,10 0,0 10,0 ";
      break;
  }
  return (
    <polyline
      points={points}
      className={`${props.translate} stroke-cc-green fill-none stroke-6 hover:stroke-8 `}
      style={props.style}
      onClick={props.onClick}
      name={props.name}
    ></polyline>
  );
}

export default PolyLine;
