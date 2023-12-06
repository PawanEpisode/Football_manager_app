import React, { useState } from "react";
import field from "../../assets/field.png";
import ErrorPopup from "../ErrorPopup";
import { useSelector } from "react-redux";
import {
  PLAYER_CARD_DETAILS,
  getErrorMessage,
  getPlayerDataCategoryPosition,
} from "../../constants/constants";
import ImageSource from "../ImageSource";
import PlayerCard from "../PlayerCard";
import DataTableHeight from "../DataTableHeight";
import DataTableWeight from "../DataTableWeight";
import NameFlag from "../NameFlag";
import EditableTeamName from "../EditableTeamName";
import InstructionsButton from "../InstructionsButton";

import PlayerInfoHOC from "../PlayerInfoHOC";

import "./FieldPlayer.css";

const FieldPlayer = ({ teamName, setTeamName }) => {
  const { playerData } = useSelector((state) => state.player);

  const starterData = playerData?.filter((item) => item["Starter"] === "Yes");

  const playerDataCategoryPosition = getPlayerDataCategoryPosition(starterData);
  const [currentPlayer, setCurrentPlayer] = useState(
    () => playerDataCategoryPosition?.["Goalkeeper"]?.[0]
  );

  const countStarters = starterData?.length;

  const handleCurrentPlayer = (id) => {
    const currentPlayerClicked = starterData?.filter(
      (player) => player?._id === id
    );

    setCurrentPlayer(currentPlayerClicked[0]);
  };

  const showingPlayerCardInfo =
    countStarters === 11 &&
    [
      { Goalkeeper: 1 },
      { Defender: 4 },
      { Midfielder: 3 },
      { Forward: 3 },
    ].every(
      (position) =>
        playerDataCategoryPosition?.[Object.keys(position)[0]]?.length ===
        Object.values(position)[0]
    );

    const errorMessage = getErrorMessage(countStarters,showingPlayerCardInfo);

  // Applying the HOC to the components
  const DataTableFormattedHeight = PlayerInfoHOC(DataTableHeight);
  const DataTableFormattedWeight = PlayerInfoHOC(DataTableWeight);
  const DataTableFormattedNameFlag = PlayerInfoHOC(NameFlag);

  const getPlayerData = (field) => {
    return (
      <div className="flex flex-col gap-1 items-start">
        <p className="w-fit text-2xl text-[#FEA013] font-semibold">
          {currentPlayer?.[field]}
        </p>
        <p className="w-fit text-xs text-[#cbcbcb] font-normal">{field}</p>
      </div>
    );
  };

  const getPlayerStats = (position, key1, key2) => {
    return (
      <div className="flex flex-col gap-1 items-start">
        <p className="w-fit text-[#FEA013] font-semibold">
          {(currentPlayer[position] === "Goalkeeper"
            ? currentPlayer?.[key1]
            : currentPlayer?.[key2]) || "N/A"}
        </p>
        <p className="w-fit text-xs text-[#cbcbcb] font-normal">
          {currentPlayer[position] === "Goalkeeper"
            ? key1.trim()
            : key2.trim()}
        </p>
      </div>
    );
  };

  return (
    <div className="field-container w-screen text-white">
      <div className="flex justify-between mb-6">
        <EditableTeamName
          defaultName={"My Team"}
          teamName={teamName}
          setTeamName={setTeamName}
          title={"Formation Overview"}
        />
        <InstructionsButton title={"Instructions To Follow"} />
      </div>

      <div className="bg-[#2D2D2D] flex gap-8 h-[620px] rounded-[8px] p-8">
        <div className="w-[808px] relative">
          <img src={field} alt="field" width={900} />
          {playerData ? (
            <>
              {showingPlayerCardInfo && playerDataCategoryPosition ? (
                <div className="absolute centered flex w-[800px] h-[500px]">
                  {PLAYER_CARD_DETAILS.map((position, index) => (
                    <div key={index} className={position.className}>
                      {playerDataCategoryPosition[position.title]?.map(
                        (player) => (
                          <PlayerCard
                            key={player?._id}
                            playerId={player?._id}
                            currentId={currentPlayer?._id}
                            jerseyNumber={player?.["Jersey Number"]}
                            playerName={player?.["Player Name"]}
                            handleCurrentPlayer={() =>
                              handleCurrentPlayer(player?._id)
                            }
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <ErrorPopup {...errorMessage} />
              )}
            </>
          ) : (
            <ErrorPopup
              title={"No player data found"}
              subtitle={"Please importer your roster first"}
            />
          )}
        </div>
        <div className="bg-[#222222] flex flex-col gap-6 p-6 w-[360px] rounded-[4px]">
          {starterData?.length === 11 && showingPlayerCardInfo && currentPlayer ? (
            <>
              <div className="relative w-full">
                <ImageSource
                  imgUrl={currentPlayer["Player Image"]}
                  altText={"player-image"}
                />
                <span className="absolute opacity-50 -top-10 left-1 text-[#3A3731] text-[110px] font-semibold">
                  {currentPlayer["Jersey Number"]}
                </span>
                <span className="absolute top-5 left-4 text-[#FEA013] text-[42px] font-semibold">
                  {currentPlayer["Jersey Number"]}
                </span>
                <span className="absolute bottom-6 text-[#fff] text-[24px] font-medium">
                  {currentPlayer["Player Name"]}
                </span>
                <span className="absolute bottom-1 text-[#FEA013] text-lg font-semibold">
                  {currentPlayer["Position"]}
                </span>
              </div>
              <div className="flex gap-8 justify-start">
                <DataTableFormattedHeight
                  label={"Height"}
                  value={currentPlayer?.["Height"]}
                />
                <DataTableFormattedWeight
                  label="Weight"
                  value={currentPlayer?.["Weight"]}
                />
                <DataTableFormattedNameFlag
                  label="Nationality"
                  value={{
                    name: currentPlayer?.["Nationality"],
                    imgUrl: currentPlayer?.["Flag Image"],
                  }}
                />
              </div>
              <div className="border-b-2 border-[#494949]"></div>
              <div className="grid grid-cols-2 gap-8 border-1">
                {getPlayerData("Appearances")}
                {getPlayerData("Minutes Played")}
                {getPlayerStats("Position", "Clean Sheets", "Goals ")}
                {getPlayerStats("Position", "Saves\r", "Assists")}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FieldPlayer;
