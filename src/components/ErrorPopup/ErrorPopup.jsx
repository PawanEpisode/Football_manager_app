import React from "react";
import triangle from "../../assets/triangle.png";

const ErrorPopup = ({title, subtitle}) => {
  return (
    <div className="error-popup-shadow w-[350px] absolute top-[200px] left-[230px] 
    bg-[#2D2D2D] p-6 gap-2 rounded-lg">
      <div className="flex justify-center items-center flex-col gap-1">
      <div className="flex w-[330px] justify-center items-center gap-2">
          <img src={triangle} alt="error-icon"/>
          <span className="font-semibold text-[#f8f8f8] text-lg">
            {title}
          </span>
        </div>
        <p className="font-normal text-[#cbcbcb] text-sm leading-6">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ErrorPopup;
