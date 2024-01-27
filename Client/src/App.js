import { useState } from "react";
import "./App.css";
import Map from "./Component-Map";
import Parts from "./Component-Parts";
import UI from "./UI";

// import Navbar from "./navbar";
function App() {
  const [equipmentID, setEquipmentID] = useState("");

  const updateEquipment = (newEquipmentID) => {
    console.log("Updating equipment ID to", newEquipmentID);

    setEquipmentID(newEquipmentID);
  };
  return (
    <div className="flex flex-nowrap bg-cc-dark ">
      {/* Side Navigation Bar. */}
      {/* <Navbar /> */}

      {/* Map Component */}
      {/* Passing the info from within Map to the hook. */}
      <Map onUpdate={updateEquipment} />

      {/* Side Panel Parts List */}
      {/* Passing the info from the hook to this component. */}
      <Parts equipmentID={equipmentID} />
    </div>
  );
}

export default App;
