import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerData } from "../redux/playerSlice";
import CommonInput from "./CommonInput";
import CommonSelect from "./CommonSelect";
import {
  OVERLAY_STYLES,
  MODAL_STYLES,
  PositionOptions,
  getCustomPlayerInfo,
  getNationalityOptions,
  isTwoObjectDiffer,
  EDIT_INPUT_FIELDS_DATA,
  EDIT_SELECT_FIELDS_DATA,
  EDIT_RADIO_FIELDS_DATA,
} from "../constants/constants";
import CommonButtonWithText from "./CommonButtonWithText";
import CommonButtonWithImage from "./CommonButtonWithImage";

const NEW_MODAL_STYLES = {
  ...MODAL_STYLES,
  width: "500px",
};

const EditModal = ({ playerInfo, open, onClose }) => {
  const dispatch = useDispatch();
  const { playerData } = useSelector((state) => state.player);
  const NationalityOptions = getNationalityOptions(playerData);
  const InitialPlayerInfo = getCustomPlayerInfo(playerInfo);

  const [editPlayerInfo, setEditPlayerInfo] = useState({
    ...InitialPlayerInfo,
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(!isTwoObjectDiffer(InitialPlayerInfo, editPlayerInfo));
  }, [editPlayerInfo]);
  1;

  if (!open) return null;

  const handleInputChange = (property, event) => {
    let newValue = event.target.value;

    // Check if the new value is within the specified range
    if (newValue < 0) {
      newValue = "0";
    } else if (property === "Jersey Number" && newValue >= 100) {
      newValue = "100";
    } else if (property === "Height" && newValue >= 300) {
      newValue = "300";
    } else if (property === "Weight" && newValue >= 150) {
      newValue = "150";
    }

    setEditPlayerInfo({
      ...editPlayerInfo,
      [property]: newValue,
    });
  };

  const handleStarter = (value) => {
    setEditPlayerInfo({
      ...editPlayerInfo,
      ["Starter"]: value,
    });
  };

  const handleEditPlayerButton = () => {
    const tempPlayerData = playerData.map((item) => {
      if (item._id === editPlayerInfo._id) {
        const tempPlayerInfo = {
          ...item,
          ...getCustomPlayerInfo(editPlayerInfo),
        };
        delete tempPlayerInfo._id;
        tempPlayerInfo._id = JSON.stringify(Object.values(tempPlayerInfo));
        return tempPlayerInfo;
      }
      return item;
    });
    dispatch(setPlayerData(tempPlayerData));
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={NEW_MODAL_STYLES} className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center py-4">
          <p className="text-[#f8f8f8] font-semibold text-lg">Edit Player</p>
          <CommonButtonWithImage onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {EDIT_INPUT_FIELDS_DATA.slice(0, 2).map((field) => (
              <div key={field.key} className="flex gap-4">
                <CommonInput
                  label={field.label}
                  name={field.name || field.label}
                  width={field.width}
                  type={field.type}
                  value={editPlayerInfo[field.key]}
                  onChange={(e) => handleInputChange(field.key, e)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {EDIT_INPUT_FIELDS_DATA.slice(2).map((field) => (
              <div key={field.key} className="flex gap-4">
                <CommonInput
                  label={field.label}
                  name={field.name || field.label}
                  width={field.width}
                  type={field.type}
                  value={editPlayerInfo[field.key]}
                  onChange={(e) => handleInputChange(field.key, e)}
                />
              </div>
            ))}
          </div>

          {/* Select dropdowns */}

          {EDIT_SELECT_FIELDS_DATA.map((field) => (
            <CommonSelect
              label={field.label}
              width={field.width}
              value={editPlayerInfo[field.key]}
              options={
                field.label === "Nationality"
                  ? NationalityOptions
                  : PositionOptions
              }
              onChange={(e) => handleInputChange(field.key, e)}
            />
          ))}

          {/* Starter radio Button */}
          <div className="flex flex-col gap-4 items-start">
            <p className="text-[#fff] text-sm font-medium">Starter</p>
            <div
              className="flex gap-4"
              onChange={(e) => handleStarter(e.target.value)}
            >
              {EDIT_RADIO_FIELDS_DATA.map((option) => (
                <div key={option.id} className="flex gap-3">
                  <label
                    htmlFor={option.id}
                    className="container text-sm text-[#cbcbcb] font-normal"
                  >
                    {option.label}
                    <input
                      className="radioStarter"
                      type="radio"
                      id={option.id}
                      checked={editPlayerInfo["Starter"] === option.value}
                      name="Starter"
                      value={option.value}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <CommonButtonWithText
            disabled={!isEdited}
            title="Edit Player"
            onClick={handleEditPlayerButton}
            className={`px-5 py-3 ${
              isEdited
                ? "text-[#f8f8f8] bg-[#FEA013] rounded-lg"
                : "text-[#707070]"
            }`}
          />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditModal;
