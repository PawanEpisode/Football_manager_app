import React, { useState } from "react";
import ReactDOM from "react-dom";
import RosterDetails from "./RosterDetails";
import FormationOverview from "./FormationOverview";
import {
  FORMATION_OVERVIEW,
  MODAL_STYLES,
  OVERLAY_STYLES,
  ROSTER_DETAILS,
} from "../constants/constants";
import CommonButtonWithText from "./CommonButtonWithText";
import CommonButtonWithImage from "./CommonButtonWithImage";

const NEW_MODAL_STYLES = {
  ...MODAL_STYLES,
  padding: "24px",
  width: "800px",
  height: "600px",
};

const ApplicationOverviewModal = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const handleClose = () => {
    setCurrentSlide(1);
    onClose();
  };

  const getButton = (onClick, title) => {
    return (
      <CommonButtonWithText 
        onClick={onClick}
        title={title}
      />
    );
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={handleClose} />
      <div style={NEW_MODAL_STYLES}>
        <div className="flex justify-between items-center border-[#494949] border-b-2 py-4 mb-6">
          <p className="text-[#f8f8f8] font-semibold text-lg">
            {currentSlide === 1 ? "Roster Details" : "Formation Overview"}
          </p>
          <CommonButtonWithImage onClick={handleClose} />
        </div>

        {/* Content based on current slide */}
        {currentSlide === 1 && (
          <div className="flex flex-col gap-10 justify-center items-center">
            <RosterDetails features={ROSTER_DETAILS} />
            {getButton(handleNextSlide, "Next Slide")}
          </div>
        )}

        {currentSlide === 2 && (
          <div className="flex flex-col gap-10 justify-center items-center">
            <FormationOverview features={FORMATION_OVERVIEW} />
            {getButton(handleClose, "Close")}
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ApplicationOverviewModal;
