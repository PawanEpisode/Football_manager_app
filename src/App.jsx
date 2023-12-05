import { useState } from 'react';
import './App.css';
import FieldPlayer from './components/FieldPlayer';
import PlayerTable from './components/PlayerTable';
import Sidebar from './components/Sidebar';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [teamName, setTeamName] = useState('My Team');
  // create a modal and integrate whenever any user open this application , 
  // explain all the feature and what other things you can do using this application

  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<PlayerTable teamName={teamName} setTeamName={setTeamName} />} />
        <Route path='/field' element={<FieldPlayer teamName={teamName} setTeamName={setTeamName}/>}/>
      </Routes>
    </div>
  )
}

export default App
