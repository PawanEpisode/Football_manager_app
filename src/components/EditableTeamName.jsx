import React, { useRef, useState } from "react";
import pen from "../assets/pen.png";

const EditableTeamName = ({ defaultName }) => {
  const [teamName, setTeamName] = useState(defaultName);
  const nameRef = useRef(defaultName);
  const [iconVisible, setIconVisible] = useState(true);

  const handleNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleBlur =() => {
    setIconVisible(false);
  }

  const inputWidth =() => `${teamName.length*10 + 10}px`;


  return (
    <div className="flex flex-col items-start">
      <span className="roster">Roster Details</span>
      <div className="flex gap-2 items-center py-3 rounded-md">
        <input
          value={teamName}
          onChange={handleNameChange}
          style={{ width: inputWidth() }}
          className="text-[14px] text-[#999]-400"
          onBlur={handleBlur}
        />
        <img
            src={pen}
            className={`w-4 h-4 cursor-pointer ${iconVisible ? "opacity-100": "opacity-0 hover:opacity-100"}`}
            alt="pen-icon"
          />
      </div>
    </div>
  );
};

export default EditableTeamName