import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerData } from "../redux/playerSlice";
import { MODAL_STYLES, OVERLAY_STYLES } from "../constants/constants";
import CommonButtonWithText from "./CommonButtonWithText";
import CommonButtonWithImage from "./CommonButtonWithImage";

const NEW_MODAL_STYLES = {
  ...MODAL_STYLES,
  padding: "18px 24px 24px 24px",
  width: "380px",
  height: "190px",
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
      <div style={NEW_MODAL_STYLES} className="flex flex-col gap-7">
        <div className="flex justify-between items-center mt-4.5">
          <p className="text-[#f8f8f8] font-semibold text-lg">Are you sure?</p>
          <CommonButtonWithImage onClick={onClose} />
        </div>
        <p className="text-[#cbcbcb] font-normal text-sm">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          
          <CommonButtonWithText 
          onClick={onClose}
          className="py-3 px-5 rounded-lg 
          text-[#cbcbcb] text-sm font-medium 
          border border-[#494949]"
          title={"Cancel"}
          />
          
          <CommonButtonWithText
            onClick={handleDeletePlayer}
            className="py-3 px-5 rounded-lg 
          text-[#f8f8f8] text-sm font-medium bg-[#D23131]"
          title={"Delete"}
          />
          
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteModal;
