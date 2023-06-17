import React, {useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const MindMap = () => {
    const { outline, setCurrTopic } = useContext(OutlineContext);

  return (
    <div>
        <h1>Mind Map:</h1>
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

export default MindMap;
