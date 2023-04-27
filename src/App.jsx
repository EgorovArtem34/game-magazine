import { AiOutlineSearch } from 'react-icons/ai';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // Navigate,
  // useLocation,
} from 'react-router-dom';
import './App.css';
import GameLists from './Components/GameLists';
import SortList from './Components/SortList';
import routes from './utils/routes';

const App = () => (
  <>
    <header className="header container">
      <a href={routes.defaultPath()} className="link header-link">GAME</a>
      <form className="header-form">
        <input type="text" placeholder="Search game" onChange={() => console.log('1232')} />
        <div className="input-img">
          <AiOutlineSearch />
        </div>
      </form>
    </header>
    <main>
      <div className="main-container container">
        <div className="left-side">
          <SortList />
        </div>
        <div className="content">
          <Router>
            <Routes>
              <Route path={routes.defaultPath()} element={<GameLists />} />
              <Route path={routes.allTimeTop()} element={<GameLists />} />
            </Routes>
          </Router>
        </div>
      </div>
    </main>
  </>
);

export default App;
