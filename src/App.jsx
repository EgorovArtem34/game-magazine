import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import GameLists from './Components/GameLists';
import SortList from './Components/SortList';
import routes from './utils/routes';
import { searchGames, actions } from './slices/gamesSlice';
import DropDownSearch from './Components/DropDownSearch';
import GameInfo from './Components/GameInfo';

const App = () => {
  const dispatch = useDispatch();
  const { removeSearchedGames } = actions;
  const [inputValue, setInputValue] = useState('');
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);
  const dropDownRef = useRef(null);
  const timeout = 500;
  const handleSearch = (value) => {
    dispatch(searchGames(value));
  };

  const handleChange = (value) => {
    setInputValue(value);
    clearTimeout(searchTimeoutId);
    const newTimeoutId = setTimeout(() => handleSearch(value), timeout);
    setSearchTimeoutId(newTimeoutId);
  };

  const handleClickOutside = useCallback((e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      dispatch(removeSearchedGames());
    }
  }, [dispatch, removeSearchedGames]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <header className="header container">
        <Link to="/">
          <button type="button" className="link header-link">GAME</button>
        </Link>
        <form className="header-form">
          <input type="text" placeholder="Search game" value={inputValue} onChange={(e) => handleChange(e.target.value)} />
          <div className="input-img">
            <AiOutlineSearch />
          </div>
        </form>
        <div ref={dropDownRef} className="dropdown">
          <DropDownSearch />
        </div>
      </header>
      <main>
        <div className="main-container container">
          <div className="left-side">
            <SortList />
          </div>
          <div className="content">
            <Routes>
              <Route path={routes.defaultPath()} element={<GameLists />} />
              <Route path={routes.sorted()} element={<GameLists />} />
              <Route path={routes.game()} element={<GameInfo />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
