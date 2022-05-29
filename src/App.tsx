import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import PlayerView from './views/PlayerView';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/player' element={<PlayerView />} />
      </Routes>
    </div>
  );
}

export default App;
