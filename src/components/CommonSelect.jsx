import React from "react";

const CommonSelect = ({ label, width,value, options, onChange }) => {
  return (
    <div className={`flex flex-col gap-2`} style={{ width: `${width}px` }}>
      <label className="text-[#fff] text-sm font-medium" htmlFor={label}>
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-[8px]
        px-4 py-3 border border-[#494949]`}
        style={{ width: `${width}px` }}
      >
        <select
          className={`ml-1 text-[14px] bg-[#2d2d2d] 
          w-[430px] outline-none text-[#f8f8f8] 
          cursor-pointer font-normal`}
          id={label}
          onChange={onChange}
          value={value}
        >
          {options.map((item, index) => (
            <option
                key={index}
                value={item}
              >
                {item}
              </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CommonSelect;
