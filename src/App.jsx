import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import PlayerTable from "./components/PlayerTable/PlayerTable";
import FieldPlayer from "./components/FieldPlayer/FieldPlayer";
import Sidebar from "./components/Sidebar";
import ApplicationOverviewModal from "./components/ApplicationOverviewModal";

import "./App.css";

function App() {
  const [teamName, setTeamName] = useState("My Team");
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <PlayerTable teamName={teamName} setTeamName={setTeamName} />
            }
          />
          <Route
            path="/field"
            element={
              <FieldPlayer teamName={teamName} setTeamName={setTeamName} />
            }
          />
        </Routes>
      </div>
      <ApplicationOverviewModal 
        open={isOpen} 
        onClose={handleClose} 
      />
    </>
  );
}

export default App;
