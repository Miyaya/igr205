import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import OutlineContext from "../../model/OutlineContext";
import SplitPaneContext from "../../model/SplitPaneContext";

const SplitPaneSlides = ({ children, ...props }) => {
    const [clientHeight, setClientHeight] = useState(null);
    const [clientWidth, setClientWidth] = useState(null);
    const yDividerPos = useRef(null);
    const xDividerPos = useRef(null);

    const onMouseHoldDown = (e) => {
        yDividerPos.current = e.clientY;
        xDividerPos.current = e.clientX;
    };

    const onMouseHoldUp = () => {
        yDividerPos.current = null;
        xDividerPos.current = null;
    };

    const onMouseHoldMove = (e) => {
        if (!yDividerPos.current && !xDividerPos.current) {
            return;
        }

        setClientHeight(clientHeight + e.clientY - yDividerPos.current);
        setClientWidth(clientWidth + e.clientX - xDividerPos.current);

        yDividerPos.current = e.clientY;
        xDividerPos.current = e.clientX;
    };

    useEffect(() => {
        document.addEventListener("mouseup", onMouseHoldUp);
        document.addEventListener("mousemove", onMouseHoldMove);

        return () => {
            document.removeEventListener("mouseup", onMouseHoldUp);
            document.removeEventListener("mousemove", onMouseHoldMove);
        };
    });

    return (
        <div {...props}>
            <SplitPaneContext.Provider
                value={{
                    clientHeight,
                    setClientHeight,
                    clientWidth,
                    setClientWidth,
                    onMouseHoldDown,
                }}
            >
                {children}
            </SplitPaneContext.Provider>
        </div>
    );
};


export const Divider = (props) => {
    const { onMouseHoldDown } = useContext(SplitPaneContext);

    return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneMain = (props) => {
    const mainRef = createRef();
    const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
    const { outline, setCurrTopic } = useContext(OutlineContext);


    useEffect(() => {
        if (!clientHeight) {
            setClientHeight(mainRef.current.clientHeight);
            return;
        }

        mainRef.current.style.minHeight = clientHeight + "px";
        mainRef.current.style.maxHeight = clientHeight + "px";
    }, [clientHeight]);

    return (
        <div {...props} className="split-pane-main" ref={mainRef}>
            <div className="slide-container">
                {props.children}
            </div>
        </div>
    );
};

export const SplitPaneBottom = (props) => {
    return (
        <div {...props} className="split-pane-bottom">
            {props.children}
        </div>
    );
};

export const SplitPaneThumbnail = (props) => {
    const mainRef = createRef();
    const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

    useEffect(() => {
        if (!clientWidth) {
            setClientWidth(mainRef.current.clientWidth);
            return;
        }

        mainRef.current.style.minWidth = clientWidth + "px";
        mainRef.current.style.maxWidth = clientWidth + "px";
    }, [clientWidth]);

    return <div {...props} className="split-pane-thumbnail" ref={mainRef} />;
};

export const SplitPaneSlide = (props) => {
    const { outline, currTopic } = useContext(OutlineContext);
    const topic = outline.find((el) => el.id === currTopic);

    return (
        <div {...props} className="split-pane-main-slide">
            {props.children}
        </div>
    );
};

export default SplitPaneSlides;