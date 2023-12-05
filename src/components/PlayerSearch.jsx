import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import close from "../assets/close.png";

const PlayerSearch = ({ searchTerm, setSearchTerm,onSearch }) => {
  
  const [searchOrEnterClicked, setSearchOrEnterClicked] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchOrEnterClicked(false);
    if(event.target.value === "") {
      onSearch('');
    }
  };

  const handleSearch = () => {
    setSearchOrEnterClicked(true);
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "Escape") {
      setSearchOrEnterClicked(false);
      setSearchTerm("");
      onSearch("");
    }
  };

  const clearSearch = () => {

    setSearchOrEnterClicked(false);
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex items-center rounded-[8px] px-4 py-3 bg-inherit border border-[#494949]">
      <img src={search} width={10} alt="search-icon" />
      <input
        type="text"
        placeholder="Find Player"
        className="ml-2.5 text-[14px] bg-inherit text-[#999]-400"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {searchTerm && !searchOrEnterClicked && <button type="button" className="text-[#FEA013] text-sm font-medium" onClick={handleSearch}>Search</button>}
      {searchOrEnterClicked && searchTerm
       && (
        <button onClick={clearSearch}>
          <img src={close} width={10} alt="clear-icon" />
        </button>
      )}
    </div>
  );
};

export default PlayerSearch