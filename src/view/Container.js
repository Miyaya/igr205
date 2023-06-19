
import React, { useState } from "react";
import ModeNav from "./ModeNav";

import "./../App.css";


function Container(props) {
  const [mode, setMode] = useState('select');

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="App">
    <ModeNav onModeChange={handleModeChange} />
      {props.children}
    </div>
  );
}

export default Container;