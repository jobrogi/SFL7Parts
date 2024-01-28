import { useState } from "react";
import Map from "./Components/Component-Map";
import Parts from "./Components/Component-Parts";

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
