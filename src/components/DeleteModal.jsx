import React, { useState } from "react";
import ReactDOM from "react-dom";
import close from "../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerData } from "../redux/playerSlice";

const MODAL_STYLES = {
  position: "fixed",
  top: "46%",
  left: "52%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#2D2D2D",
  padding: "18px 24px 24px 24px",
  zIndex: 1000,
  width: "380px",
  height: "190px",
  borderRadius: "8px",
  boxShadow: "0px 2px 12px 0px rgba(22, 22, 22, 0.50)",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

const DeleteModal = ({ playerInfo, open, onClose }) => {
  if (!open) return null;
  const dispatch = useDispatch();
  const { playerData } = useSelector((state) => state.player);
  const handleDeletePlayer = () => {
    const playersRemaining = playerData?.filter(
      (item) => item["Jersey Number"] !== playerInfo["Jersey Number"]
    );
    dispatch(setPlayerData(playersRemaining));
    onClose();
  };
  
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES} className="flex flex-col gap-7">
        <div className="flex justify-between items-center mt-4.5">
          <p className="text-[#f8f8f8] font-semibold text-lg">Are you sure?</p>
          <button onClick={onClose}>
            <img src={close} />
          </button>
        </div>
        <p className="text-[#cbcbcb] font-normal text-sm">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-lg 
          text-[#cbcbcb] text-sm font-medium 
          border border-[#494949]"
          >
            Cancel
          </button>
          <button
            onClick={handleDeletePlayer}
            className="py-3 px-5 rounded-lg 
          text-[#f8f8f8] text-sm font-medium bg-[#D23131]"
          >
            Delete
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteModal;
