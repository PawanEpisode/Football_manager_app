import React, { useState } from "react";
import { Link } from "react-router-dom";
import soccer from "../assets/soccer.png";
import bars from "../assets/bars.png";
import barscolored from "../assets/barscolored.png";
import usersline from "../assets/usersline.png";
import userslinecolored from "../assets/userslinecolored.png";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <nav className="text-bold bg-[#111] w-[100px] h-screen p-4 flex gap-8 flex-col">
      <div className="flex w-full justify-center mb-10">
        <img src={soccer} alt="soccer-ball" width={30} height={30} />
      </div>

      <div
        onClick={() => handleActiveTab("/")}
        className="flex w-full justify-center items-center gap-2"
      >
        <div
          className={
            activeTab === "/"
              ? `flex justify-center before:content-[''] before:bg-[#FEA013] before:w-1 before:h-1 before:rounded-full`
              : ""
          }
        ></div>
        <Link to={"/"}>
          <img src={activeTab === "/" ? barscolored : bars} alt="soccer-ball" />
        </Link>
      </div>

      <div
        onClick={() => handleActiveTab("/field")}
        className="flex justify-center items-center gap-2"
      >
        <div
          className={
            activeTab === "/field"
              ? `flex justify-center before:content-[''] before:ml-0.5 before:bg-[#FEA013] before:w-1 before:h-1 before:rounded-full`
              : ""
          }
        ></div>
        <Link to={"/field"}>
          <img
            src={activeTab === "/field" ? userslinecolored : usersline}
            alt="soccer-ball"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
