import React, { useState } from "react";
import Modal from "../Modal";

const Button = ({ text, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className={`rounded-[8px] ${type === "secondary" && "text-[#FEA013]"} ${
          type === "primary" && "bg-[#FEA013] hover:bg-[#BA4A0C]"
        } flex justify-center items-center gap-2.5 px-5 py-3`}
      >
        {text}
      </button>
      <Modal 
        open={isOpen} 
        onClose={handleClose} 
      />
    </>
  );
};

export default Button;
