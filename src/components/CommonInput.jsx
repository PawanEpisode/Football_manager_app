import React from "react";

const CommonInput = ({label,width,name, type,value, onChange}) => {
    const handleKeyDown = (e) => {
        // Prevent manual typing of values outside the range
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }
      };
    
      const handleWheel = (e) => {
        // Prevent scrolling to change the value
        e.preventDefault();
      };
    return (
        <div 
        className={`flex flex-col gap-2`} 
        style={{width: `${width}px`}}
        >
        <label 
        className="text-[#fff] text-sm font-medium"
        htmlFor={label}
        >
            {label}
        </label>
        <div className={`flex items-center rounded-[8px]
        px-4 py-3 bg-inherit border border-[#494949]`} 
        style={{width: `${width}px`}}
        >
            <input
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                type={type}
                id={label}
                placeholder={name}
                className={`ml-1 text-[14px] text-[#999] font-normal`}
            />
        </div>
        </div>
    );
};

export default CommonInput;
