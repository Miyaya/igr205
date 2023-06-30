import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "../SplitPane";
import { useState, useEffect } from "react";
import Container from "./../Container"
import DnDFlow from './MindMap';

import "./../../App.css";

function Home(props) {

  const [currTopic, setCurrTopic] = useState(1);
  const [outline, setOutline] = useState([]);

  return (
    <Container navigation={props.navigation}>
      <h1>Mindmap Tool</h1>
      <div style={{ height: 600 }}>
      <DnDFlow/>
      </div>
    </Container>

    
  );
}

export default Home;