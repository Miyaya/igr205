import React, { useState , useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const Outline = () => {
    const { outline, currTopic } = useContext(OutlineContext);
    const topic = outline.find((el) => el.id === currTopic);

    return (
        <div className="split-pane-right">
        <h1>Topic Outline</h1>
        <div className="title">
          <h2>{topic.title}</h2>
          <p>{topic.text}</p>
          <blockquote>{topic.note}</blockquote>
        </div>
      </div>
    );
};

export default Outline;
