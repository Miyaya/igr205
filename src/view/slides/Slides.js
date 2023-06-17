
import { useState } from "react";
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "../SplitPane";
import Slide from "./Slide";
import SlideIndex from "./SlideIndex";
import content from "../../res/content.json"
import PresenterNote from "./PresenterNote";
import OutlineContext from "../../model/OutlineContext";


import "./../../App.css";

const outline = content.topics

function Slides() {
  const [currTopic, setCurrTopic] = useState(1);

  return (
    <div className="App">
      <OutlineContext.Provider value={{ outline, currTopic, setCurrTopic }}>
        <SplitPane className="split-pane-row">
          <SplitPaneRight><SlideIndex/></SplitPaneRight>
          <Divider className="separator-col" />
          <SplitPaneLeft>
            <SplitPane className="split-pane-col">
              <SplitPaneTop><Slide/></SplitPaneTop>
              <Divider className="separator-row" />
              <SplitPaneBottom><PresenterNote/></SplitPaneBottom>
            </SplitPane>
          </SplitPaneLeft>

        </SplitPane>
      </OutlineContext.Provider>
    </div>
  );
}

export default Slides;