import React, { useState , useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const SlideIndex = () => {
    const { outline, setCurrTopic } = useContext(OutlineContext);

  return (
    <div>
        <h1>Slide Index:</h1>
        <ul>
          {outline.map((el, i) => {
            return (
              <li key={i}>
                <a href="#" onClick={() => setCurrTopic(el.id)}>
                  {el.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default SlideIndex;
