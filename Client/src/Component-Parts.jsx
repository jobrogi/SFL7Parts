import { useCallback, useEffect, useState } from "react";
import React from "react";
import Data from "./EquipmentParts.json";

//extra comment
// Context for component to component communication
// import { EquipmentContext } from "./EquipmentDataProvider";

function Parts(props) {
  const [isActive, setIsActive] = useState(true);

  const [currentEquipment, setCurrentEquipment] = useState({
    Parts: [],
  });

  const FindEquipment = useCallback(() => {
    // console.log(Data.Equipment);
    //

    setCurrentEquipment(
      Data.Equipment.find(
        (equipment) => equipment.EquipmentId === props.equipmentID
      )
    );
  }, [props.equipmentID]);

  useEffect(() => {
    // setCurrentEquipment(props.equipmentID);
    // console.log("Effect runs: Equipment has changed to", props.equipmentID);
    FindEquipment();
  }, [props.equipmentID, FindEquipment]);

  return (
    <div className="">
      <button
        className={
          isActive
            ? "w-12 h-12 absolute top-0 bg-gray-300 transform-all duration-700 -translate-x-12 z-1 focus-visible:none"
            : "w-12 h-12 absolute top-0 bg-gray-300 transform-all duration-700 -translate-x-108 z-1"
        }
        onClick={() => {
          if (isActive === true) {
            setIsActive(false);
          } else {
            setIsActive(true);
          }
        }}
      >
        <i
          className={
            isActive
              ? "fa-solid fa-caret-left text-3xl text-center w-full rotate-180 transform-all "
              : "fa-solid fa-caret-left text-3xl text-center w-full transform-all "
          }
        ></i>
      </button>
      {isActive ? (
        <div className="">
          {/* // Needed to put animation in parent div to get overflow effect. //{" "} */}
          <div className="absolute overflow-hidden top-0 right-0 pointer-events-none">
            <div className="bg-cc-element bg-opacity-60 w-96 h-screen p-2 relative right-0 transition-translate -translate-x-96 duration-700 ">
              <table className="w-full table-auto text-left">
                <thead className="text-gray-400">
                  <tr>
                    <th>Part Name</th>
                    <th>APN</th>
                    <th>Part Description</th>
                  </tr>
                </thead>
                <tbody className="text-white"></tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute overflow-hidden top-0 right-0 ">
          {" "}
          <div className="bg-cc-element bg-opacity-60 w-96 h-screen p-2 relative right-0 transition-translate translate-x-0 duration-700 ">
            <table className="w-full table-auto text-left">
              <thead className="text-gray-400">
                <tr>
                  <th>Part Name</th>
                  <th>APN</th>
                  <th>Part Description</th>
                </tr>
              </thead>
              {/* The conditional statement makes the entire reading and updating JSON files do-able. */}
              {currentEquipment === undefined ? (
                <tbody className="text-gray-400 text-2xl mt-8 "></tbody> // or null if you don't want to render anything
              ) : (
                <tbody className="text-white">
                  {currentEquipment.Parts.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.partNumber}</td>
                      <td>{e.name}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Parts;
