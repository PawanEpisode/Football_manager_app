import React, { useImperativeHandle, useState } from "react";
import pengray from "../assets/pengray.png";
import trash from "../assets/trash.png";
import { forwardRef } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import CommonButtonWithImage from "./CommonButtonWithImage";

const ActionList = forwardRef((playerData, ref) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(false);

  // USE useImperativeHandle
  useImperativeHandle(ref, () => ({
    closeActive() {
      setActiveAction(false);
    },
    openActive() {
      setActiveAction(true);
    },
    getActiveAction() {
      return activeAction;
    },
  }));

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
    setActiveAction(false);
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
    setActiveAction(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const ActionMenuOptions = [
    {
      label: "Edit Player",
      icon: pengray,
      onClick: handleEditDialogOpen, // Assuming handleEditDialogOpen is a function
    },
    {
      label: "Delete Player",
      icon: trash,
      onClick: handleDeleteDialogOpen, // Assuming handleDeleteDialogOpen is a function
    },
  ];

  const ActionMenu = ({ options }) => {
    return (
      <ul className="flex flex-col gap-2">
        {options.map((option, index) => (
          <li key={index} className="cursor-pointer rounded-lg active:bg-red-800">
            <div onClick={option.onClick} className="flex justify-start items-center gap-2 p-2">
              <img src={option.icon} alt={`${option.label}-button`} />
              <p className="text-[#cbcbcb] text-sm font-medium">{option.label}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      {activeAction && (
        <div
        ref={ref}
          className="error-popup-shadow absolute w-[230px]
            bg-[#2d2d2d] rounded-lg flex right-10 -top-2
            flex-col px-4 py-5 gap-4 z-100"
        >
          <div className="flex justify-between">
            <p className="text-[#f8f8f8] text-lg font-semibold">Actions</p>
            <CommonButtonWithImage onClick={() => setActiveAction(false)} />
          </div>

          {<ActionMenu options={ActionMenuOptions}/>}
        </div>
      )}
      <EditModal
        playerInfo={playerData?.data}
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
      />
      <DeleteModal
        playerInfo={playerData?.data}
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
    </>
  );
});

export default ActionList;
