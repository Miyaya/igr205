
import { useState, useEffect } from "react";
import SplitPane, { Divider, SplitPaneBottom, SplitPaneLeft, SplitPaneRight, SplitPaneTop, } from "../SplitPane";
import Slide2 from "./Slide";
import SlideIndex from "./SlideIndex";
import PresenterNote from "./PresenterNote";
import OutlineContext from "../../model/OutlineContext";
import Container from "./../Container"
import {getTopics, updateTopic} from "../../api"


import "./../../App.css";

// const outline = content.topics

function Slides(props) {
  const [currTopic, setCurrTopic] = useState(1);
  const [outline, setOutline] = useState([]);

  useEffect(() => {
    getTopics(res => setOutline(res.sort((a,b) => a.index - b.index)));
  }, []);

  return (
    <Container navigation={props.navigation}>
      {/* <p>Current mode: {mode}</p> */}
      {
        outline.length > 0 && <OutlineContext.Provider value={{ outline, currTopic, setCurrTopic }}>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <SlideIndex />
          </SplitPaneLeft>

          <Divider className="separator-col" />
          <SplitPaneRight>
              <SplitPaneTop>
                <Slide2 />
              </SplitPaneTop>
              <Divider className="separator-row" />
              <SplitPaneBottom>
                <PresenterNote />
              </SplitPaneBottom>
          </SplitPaneRight>

        </SplitPane>
      </OutlineContext.Provider>
      }
      
    </Container>
  );
}

export default Slides;