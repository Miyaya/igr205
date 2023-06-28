import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "../SplitPane";
import OutlineContext from "../../model/OutlineContext";
import { useState } from "react";
import Outline from "./Outline";
import content from "../../res/content.json"
import Container from "./../Container"
import DnDFlow from './MindMap';

import "./../../App.css";

const outline = content.topics

function Home() {
  const [currTopic, setCurrTopic] = useState(1);

  return (
    <div>
      <h1>Mindmap Tool</h1>
      <div style={{ height: 600 }}>
      <DnDFlow />
      </div>
    </div>

    
  );
}

export default Home;