import React, { useState , useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const Slide = () => {
    const { outline, currTopic } = useContext(OutlineContext);
    const topic = outline.find((el) => el.id === currTopic);

    return (
      <div
      style={{
        height: "400px",
        width: "800px",
        position: "relative",
        // overflow: "hidden",
        backgroundColor:"darkslateblue",
        padding:'5%'
        
      }}>
      <h1 style={{color:"floralwhite"}}>{topic.title}</h1>
      <h2 style={{color:"floralwhite"}}>{topic.text}</h2>
    </div>
    );
};

export default Slide;
