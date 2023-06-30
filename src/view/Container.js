
import React, { useState } from "react";
import ModeNav from "./MenuBar/ModeNav";
import {routes} from './../res/constants'

import "./../App.css";


function Container(props) {
  const [mode, setMode] = useState('select');

  const handleModeChange = (newMode) => {
    setMode(newMode);
    let nav = props.navigation
    nav.navigate(nav.state.routeName == routes.slides ? routes.home : routes.slides)
  };

  return (
    <div className="App">
    <ModeNav onModeChange={handleModeChange} />
      {props.children}
    </div>
  );
}

export default Container;