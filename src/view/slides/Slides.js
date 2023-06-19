
import { useState } from "react";
import SplitPaneSlides, { Divider, SplitPaneBottom, SplitPaneSlide, SplitPaneThumbnail, SplitPaneMain, } from "./SplitPaneSlides";
import Slide from "./Slide";
import SlideIndex from "./SlideIndex";
import content from "../../res/content.json"
import PresenterNote from "./PresenterNote";
import OutlineContext from "../../model/OutlineContext";
import Container from "./../Container"


import "./../../App.css";

const outline = content.topics

function Slides() {
  const [currTopic, setCurrTopic] = useState(1);

  return (
    <Container>
      {/* <p>Current mode: {mode}</p> */}
      <OutlineContext.Provider value={{ outline, currTopic, setCurrTopic }}>
        <SplitPaneSlides className="split-pane-row">
          <SplitPaneThumbnail>
            <SlideIndex />
          </SplitPaneThumbnail>

          <Divider className="separator-col" />
          <SplitPaneSlide>
            <SplitPaneSlides className="">
              <SplitPaneMain>
                <Slide />
              </SplitPaneMain>
              <Divider className="separator-row" />

              <SplitPaneBottom>
                <PresenterNote />
              </SplitPaneBottom>
            </SplitPaneSlides>
          </SplitPaneSlide>

        </SplitPaneSlides>
      </OutlineContext.Provider>
    </Container>
  );
}

export default Slides;