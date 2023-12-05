import React, { useState } from "react";
import "./FieldPlayer.css";
import pen from "../assets/pen.png";
import field from "../assets/field.png";
import ErrorPopup from "./ErrorPopup";
import { useSelector } from "react-redux";
import {
  getErrorMessage,
  getPlayerDataCategoryPosition,
} from "../constants/constants";
import ImageSource from "./ImageSource";
import PlayerCard from "./PlayerCard";
import DataTableHeight from "./DataTableHeight";
import DataTableWeight from "./DataTableWeight";
import NameFlag from "./NameFlag";
import EditableTeamName from "./EditableTeamName";

const FieldPlayer = () => {
  const { playerData } = useSelector((state) => state.player);

  const starterData = playerData?.filter((item) => item["Starter"] === "Yes");

  const playerDataCategoryPosition = getPlayerDataCategoryPosition(starterData);
  const [currentPlayer, setCurrentPlayer] = useState(() => playerDataCategoryPosition?.["Goalkeeper"]?.[0]);

  const countStarters = starterData?.length;
  const errorMessage = getErrorMessage(countStarters);

  const handleCurrentPlayer = (id) => {
    const currentPlayerClicked = starterData?.filter(
      (player) => player?._id === id
    );
    console.log("id", id, currentPlayerClicked);
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

  console.log("field",currentPlayer?.["Saves "])

  return (
    <div className="field-container w-screen text-white">
      <div className="flex justify-between mb-6">
        <EditableTeamName defaultName={"My Team"} title={"Formation Overview"}/>
      </div>

      <div className="bg-[#2D2D2D] flex gap-8 h-[620px] rounded-[8px] p-8">
        <div className="w-[808px] relative">
          <img src={field} alt="field" width={900} />
          {playerData ? (
            <>
              {showingPlayerCardInfo && playerDataCategoryPosition ? (
                <div className="absolute centered flex w-[800px] h-[500px]">
                  <div className="p-4 w-[160px] h-full flex justify-center items-center">
                    {playerDataCategoryPosition["Goalkeeper"]?.map((player) => (
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
                    ))}
                  </div>
                  <div className="py-6 w-[240px] -ml-20 h-full flex flex-col justify-between items-center">
                    {playerDataCategoryPosition["Defender"]?.map((player) => (
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
                    ))}
                  </div>
                  <div className="py-6 -ml-10 w-[240px] h-full flex flex-col justify-around items-center">
                    {playerDataCategoryPosition["Midfielder"]?.map((player) => (
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
                    ))}
                  </div>
                  <div className="py-24 -ml-20 w-[240px] h-full flex flex-col justify-between items-center">
                    {playerDataCategoryPosition["Forward"]?.map((player) => (
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
                    ))}
                  </div>
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
        {starterData?.length === 11 && currentPlayer ? (
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
            <div className="flex flex-col gap-2 justify-center items-start">
              <span className="text-xs font-normal text-[#cbcbcb]">Height</span>
              <DataTableHeight height={currentPlayer?.["Height"]} />
            </div>
            <div className="flex flex-col gap-2 justify-center items-start">
              <span className="text-xs font-normal text-[#cbcbcb]">Weight</span>
              <DataTableWeight weight={currentPlayer?.["Weight"]} />
            </div>
            <div className="flex flex-col gap-2 justify-center items-start">
              <span className="text-xs font-normal text-[#cbcbcb]">
                Nationality
              </span>
              <NameFlag
                name={currentPlayer?.["Nationality"]}
                imgUrl={currentPlayer?.["Flag Image"]}
              />
            </div>
          </div>
          <div className="border-b-2 border-[#494949]"></div>
          <div className="grid grid-cols-2 gap-8 border-1">
            <div className="flex flex-col gap-1 items-start">
              <p className="w-fit text-2xl text-[#FEA013] font-semibold">{currentPlayer?.["Appearances"]}</p>
              <p className="w-fit text-xs text-[#cbcbcb] font-normal">Appearances</p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="w-fit text-[#FEA013] font-semibold">{currentPlayer?.["Minutes Played"]}</p>
              <p className="w-fit text-xs text-[#cbcbcb] font-normal">Minutes Played</p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="w-fit text-[#FEA013] font-semibold">{(currentPlayer["Position"] === "Goalkeeper" ? currentPlayer?.["Clean Sheets"]: currentPlayer?.["Goals "]) || "N/A" }</p>
              <p className="w-fit text-xs text-[#cbcbcb] font-normal">{currentPlayer["Position"] === 'Goalkeeper' ? "Clean sheets": "Goals"}</p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="w-fit text-[#FEA013] font-semibold">{(currentPlayer["Position"] === "Goalkeeper" ? currentPlayer?.["Saves\r"]: currentPlayer?.["Assists"]) || "N/A" }</p>
              <p className="w-fit text-xs text-[#cbcbcb] font-normal">{currentPlayer["Position"] === 'Goalkeeper' ? "Saves": "Assists"}</p>
            </div>
          </div>
              </>
            ) : null}
          
        </div>
      </div>
    </div>
  );
};

export default FieldPlayer;
