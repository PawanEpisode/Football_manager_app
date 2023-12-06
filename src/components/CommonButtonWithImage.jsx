import React from "react";
import close from "../assets/close.png";

const CommonButtonWithImage = ({onClick}) => {
  return (
    <button onClick={onClick}>
        <img src={close} width={10} alt={"close-icon"} />
    </button>
  );
};

export default CommonButtonWithImage;
