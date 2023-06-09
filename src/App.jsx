import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import GameLists from './Components/GameLists';
import SortList from './Components/SortList';
import routes from './utils/routes';
import GameInfo from './Components/GameInfo';
import Header from './Components/Header';

const App = () => (
  <>
    <Header />
    <main>
      <div className="main-container container">
        <div className="left-side">
          <SortList />
        </div>
        <div className="content">
          <Routes>
            <Route index element={<GameLists />} />
            <Route path={routes.sorted()} element={<GameLists />} />
            <Route path={routes.game()} element={<GameInfo />} />
            <Route path="*" element={<Navigate to={routes.defaultPath()} />} />
          </Routes>
        </div>
      </div>
    </main>
  </>
);

export default App;
