import React, { useRef } from "react";
import threedot from "../assets/threedot.png";
import ActionList from "./ActionList";
import useClickOutside from "../hooks/useClickOutside";

const ActionButton = ({data}) => {
    const clickRef = useRef();
    const outsideRef = useRef();

    const closeActive =() => {
        clickRef.current?.closeActive();
    }
    const openActive =() => {
        clickRef.current?.openActive();
    }
    useClickOutside(outsideRef, closeActive);
    return (
        <div className="relative" ref={outsideRef}>
            <div
            className="cursor-pointer flex 
            justify-center items-center"
            onClick={openActive}
            >
                <img src={threedot} alt="action-button" />
            </div>
            <ActionList ref={clickRef} data={data}/>
        </div>
    );
};

export default ActionButton;
