import React from "react";

const CommonButtonWithText = ({ onClick, title, className = "" ,disabled=false}) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${
        className.length
          ? className
          : "bg-[#FEA013] text-white px-4 py-2 rounded-lg text-lg font-normal cursor-pointer hover:bg-orange-600"
      } `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CommonButtonWithText;
