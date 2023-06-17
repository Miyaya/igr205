import React, { useState , useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const Slide = () => {
    const { outline, currTopic } = useContext(OutlineContext);
    const topic = outline.find((el) => el.id === currTopic);

    return (
      <div className="title">
          <h1>{topic.title}</h1>
          <blockquote>{topic.text}</blockquote>
      </div>
    );
};

export default Slide;
