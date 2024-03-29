import React, {useContext} from 'react';
import OutlineContext from "../../model/OutlineContext";

const PresenterNote = () => {
    const {outline, currTopic } = useContext(OutlineContext);
    const topic = outline.find((el) => el.id === currTopic);

    return (
      <div>
        <b>Presenter note</b>: {topic.note}
      </div>
    );
};

export default PresenterNote;
