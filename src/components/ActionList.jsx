import React, { useImperativeHandle, useState } from "react";
import pengray from "../assets/pengray.png";
import trash from "../assets/trash.png";
import close from "../assets/close.png";
import { forwardRef } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const ActionList = forwardRef((playerData, ref) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(false);

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
            <button onClick={() => setActiveAction(false)}>
              <img src={close} alt="close-button" />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer rounded-lg active:bg-red-800">
              <div
                onClick={handleEditDialogOpen}
                className="flex justify-start items-center gap-2 p-2"
              >
                <img src={pengray} alt="edit-button" />
                <p className="text-[#cbcbcb] text-sm font-medium">
                  Edit Player
                </p>
              </div>
            </li>
            <li className="cursor-pointer rounded-lg active:bg-red-800">
              <div
                onClick={handleDeleteDialogOpen}
                className="flex justify-start items-center gap-2 p-2"
              >
                <img src={trash} alt="delete-button" />
                <p className="text-[#cbcbcb] text-sm font-medium">
                  Delete Player
                </p>
              </div>
            </li>
          </ul>
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
