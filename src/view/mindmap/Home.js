import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "../SplitPane";
import OutlineContext from "../../model/OutlineContext";
import { useState } from "react";
import MindMap from "./MindMap";
import Outline from "./Outline";
import content from "../../res/content.json"

import "./../../App.css";

const outline = content.topics

function Home() {
  const [currTopic, setCurrTopic] = useState(1);

  return (
    <div className="App">
      <OutlineContext.Provider value={{ outline, currTopic, setCurrTopic }}>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <SplitPane className="split-pane-col">
              <SplitPaneTop><MindMap/></SplitPaneTop>
            </SplitPane>
          </SplitPaneLeft>
          <Divider className="separator-col" />

          <SplitPaneRight><Outline/></SplitPaneRight>
        </SplitPane>
      </OutlineContext.Provider>
    </div>
  );
}

export default Home;