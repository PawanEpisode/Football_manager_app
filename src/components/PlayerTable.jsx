import React, { useState, useEffect } from "react";
import "./PlayerTable.css";
import Button from "./Button";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import PlayerSearch from "./PlayerSearch";
import EditableTeamName from "./EditableTeamName";
import DownloadButton from "./DownloadButton";

const PlayerTable = () => {
  const { playerData } = useSelector((state) => state.player);
  const [filteredPlayer,setFilteredPlayer] = useState(playerData ? [...playerData]: null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePlayerSearch = (search) => {
    const searchPlayerData = playerData?.filter((player) => {
      return (
        player["Player Name"]
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        player["Position"].toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredPlayer(searchPlayerData);
  };

  useEffect(() => {
    if(searchTerm) {
      handlePlayerSearch(searchTerm)
    } else {
      setFilteredPlayer(playerData);
    }
  }, [playerData]);

  return (
    <div className="player-container w-[1350px] text-white">
      <div className="flex h-12 justify-between items-center mb-10">
        <EditableTeamName defaultName={"My Team"}/>
        <div className="flex gap-2 h-10 justify-center items-center">
          <PlayerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handlePlayerSearch} />
          <Button
            text={playerData ? "Re-Import Team" : "Import Team"}
            type={"primary"}
          />
        </div>
      </div>

      <div className="w-[1270px] relative bg-[#2D2D2D] h-[620px] overflow-scroll no-scrollbar rounded-[8px] gap-5">
        {playerData ? (
          <DataTable data={filteredPlayer} />
        ) : (
          <>
            <div className="category-table mb-[212px] mt-[13px] justify-between flex px-[20px] py-2">
              <span className="category-head">Player Name</span>
              <span className="category-head">Jersey Number</span>
              <span className="category-head">Position</span>
              <span className="category-head">Height</span>
              <span className="category-head">Weight</span>
              <span className="category-head">Nationality</span>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center">
              <div>
                <span className="category-head">
                  You do not have any players on the roster
                </span>
                <Button text={"Import Team"} type={"secondary"} />
              </div>

              <span className="text-gradient">
                Try Downloading Sample CSV files to Test this Application
              </span>
              <DownloadButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerTable;
