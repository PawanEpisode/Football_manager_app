import React from "react";

const PlayerCard = ({
  jerseyNumber,
  playerId,
  currentId,
  playerName,
  handleCurrentPlayer,
}) => {
  return (
    <div className="flex flex-col justify-start gap-1">
      <div className="flex justify-center">
        <div
          onClick={handleCurrentPlayer}
          className={`w-8 h-8 cursor-pointer
            border-[#cbcbcb] rounded-full 
            ${
              playerId === currentId ? "bg-[#FEA013]" : "bg-[#2d2d2d] border-2"
            } flex justify-center items-center`}
        >
          <span className="text-[#f8f8f8] text-base font-semibold">
            {jerseyNumber}
          </span>
        </div>
      </div>
      <p className="text-[#f8f8f8] text-sm drop-shadow-2xl font-medium">
        {playerName}
      </p>
    </div>
  );
};

export default PlayerCard;
