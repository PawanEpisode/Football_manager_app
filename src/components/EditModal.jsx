import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import close from "../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerData } from "../redux/playerSlice";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import { PositionOptions, getCustomPlayerInfo, getNationalityOptions, isTwoObjectDiffer } from "../constants/constants";

const MODAL_STYLES = {
  position: "fixed",
  top: "46%",
  left: "52%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#2D2D2D",
  zIndex: 1000,
  width: "480px",
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

const EditModal = ({ playerInfo, open, onClose }) => {
    if (!open) return null;

    const dispatch = useDispatch();
    const { playerData } = useSelector(state => state.player);
    const NationalityOptions = getNationalityOptions(playerData);
    const InitialPlayerInfo = {
        ["Player Name"]: playerInfo["Player Name"],
        ["Jersey Number"]: playerInfo["Jersey Number"],
        ["Height"]: playerInfo["Height"],
        ["Weight"]: playerInfo["Weight"],
        ["Nationality"]: playerInfo["Nationality"],
        ["Position"]: playerInfo["Position"],
        ["Starter"]: playerInfo["Starter"],
        _id: playerInfo._id,
    };

    const [editPlayerInfo, setEditPlayerInfo] = useState({...InitialPlayerInfo});

    const handlePlayerName =(event) => {
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Player Name"]: event.target.value,
        })
    }

    const handleEditPlayerButton =() => {
        
        const tempPlayerData = playerData.map(item => {
            if(item._id === editPlayerInfo._id) {
                const tempPlayerInfo = {
                    ...item,
                    ["Player Name"]: editPlayerInfo["Player Name"],
                    ["Jersey Number"]: editPlayerInfo["Jersey Number"],
                    ["Height"]: editPlayerInfo["Height"],
                    ["Weight"]: editPlayerInfo["Weight"],
                    ["Nationality"]: editPlayerInfo["Nationality"],
                    ["Position"]: editPlayerInfo["Position"],
                    ["Starter"]: editPlayerInfo["Starter"], 
                }
                delete tempPlayerInfo._id;
                tempPlayerInfo._id = JSON.stringify(Object.values(tempPlayerInfo));
                return tempPlayerInfo;
            }
            return item;
        })
        dispatch(setPlayerData(tempPlayerData));
        onClose();
    }


    const handleJerseyNumber =(event) => {
        let newValue = event.target.value;

        // Check if the new value is within the specified range
        if (newValue < 0) {
        newValue = "0";
        } else if (newValue >= 100) {
        newValue = '100';
        }
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Jersey Number"]: newValue,
        })
    }

    const handleHeight =(event) => {
        let newValue = event.target.value;

        // Check if the new value is within the specified range
        if (newValue < 0) {
        newValue = "0";
        } else if (newValue >= 300) {
        newValue = '300';
        }
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Height"]: newValue,
        })
    }

    const handleWeight =(event) => {
        let newValue = event.target.value;

        // Check if the new value is within the specified range
        if (newValue < 0) {
        newValue = "0";
        } else if (newValue >= 150) {
        newValue = '150';
        }
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Weight"]: newValue,
        })
    }

    const handleNationality =(event) => {
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Nationality"]: event.target.value,
        })
    }

    const handlePosition =(event) => {
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Position"]: event.target.value,
        })
    }

    const handleStarter =(event) => {
        setEditPlayerInfo({
            ...editPlayerInfo,
            ["Starter"]: event.target.value,
        })
    }
    const [isEdited, setIsEdited] = useState(false);

    useEffect(()=> {
        setIsEdited(!isTwoObjectDiffer(InitialPlayerInfo, editPlayerInfo));
    },[editPlayerInfo]);

    return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES} className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center py-4">
          <p className="text-[#f8f8f8] font-semibold text-lg">Edit Player</p>
          <button onClick={onClose}>
            <img src={close} />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <CommonInput label={"Player Name"} name={"Player Name"} width={270} type='text' value={editPlayerInfo["Player Name"]} onChange={handlePlayerName}/>
                <CommonInput label={"Jersey Number"} width={140} type={'number'} value={editPlayerInfo["Jersey Number"]} onChange={handleJerseyNumber}/>
            </div>
            <div className="flex gap-4">
                <CommonInput label={"Height (in cm)"} width={205} type={'number'} value={editPlayerInfo["Height"]} onChange={handleHeight}/>
                <CommonInput label={"Weight (in kg)"} width={205} type={'number'} value={editPlayerInfo["Weight"]} onChange={handleWeight}/>
            </div>

            {/* Select dropdowns */}

            <CommonSelect label={"Nationality"} width={430} value={editPlayerInfo["Nationality"]} options={NationalityOptions} onChange={handleNationality}/>
            <CommonSelect label={"Position"} width={430} value={editPlayerInfo["Position"]} options={PositionOptions} onChange={handlePosition}/>

            {/* Starter radio Button */}
            <div className="flex flex-col gap-4 items-start">
                <p className="text-[#fff] text-sm font-medium">Starter</p>
                <div className="flex gap-4" onChange={handleStarter}>
                    <div className="flex gap-3">
                        <label for="StartersNo" className="container text-sm text-[#cbcbcb] font-normal">No
                        <input className="radioStarter" type="radio" id="StartersNo" checked={editPlayerInfo["Starter"] ==="No"? "checked":""} name="Starter" value="No"/>
                        <span class="checkmark"></span>
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label for="StartersYes" className="container text-sm text-[#cbcbcb] font-normal">Yes
                        <input className="radioStarter" type="radio" id="StartersYes" checked={editPlayerInfo["Starter"] ==="Yes"? "checked":""} name="Starter" value="Yes"/>
                        <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-end">
            <button 
            onClick={(handleEditPlayerButton)}
            className={`px-5 py-3 ${isEdited 
            ? "text-[#f8f8f8] bg-[#FEA013] rounded-lg"
            : "text-[#707070]"}`}
            >
                Edit Player
            </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditModal;
