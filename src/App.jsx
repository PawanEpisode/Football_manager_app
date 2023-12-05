import './App.css';
import FieldPlayer from './components/FieldPlayer';
import PlayerTable from './components/PlayerTable';
import Sidebar from './components/Sidebar';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<PlayerTable />} />
        <Route path='/field' element={<FieldPlayer />}/>
      </Routes>
    </div>
  )
}

export default App