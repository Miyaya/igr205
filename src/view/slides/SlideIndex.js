import React, { useState, useContext } from 'react';
import OutlineContext from "../../model/OutlineContext";

const SlideIndex = () => {
  const { outline, setCurrTopic } = useContext(OutlineContext);

  return (
    <div>
      {/* <h1>Slide Index:</h1> */}
      <div>
        {outline.map((el, i) => {
          return (
            <div className="thumbnail" key={i}>
              {/* TODO: create a thumbnail of the canvas */}
              <a href="#" onClick={() => setCurrTopic(el.id)}>
                {el.title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideIndex;
