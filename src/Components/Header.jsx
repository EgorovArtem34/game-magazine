import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchGames, actions } from '../slices/gamesSlice';
import DropDownSearch from './DropDownSearch';
import routes from '../utils/routes';

const Header = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const dropDownRef = useRef(null);
  const { removeSearchedGames } = actions;
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);
  const timeout = 500;
  const handleSearch = (value) => {
    dispatch(searchGames(value));
  };

  const handleClickOutside = useCallback((e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      dispatch(removeSearchedGames());
    }
  }, [dispatch, removeSearchedGames]);

  const handleChange = (value) => {
    setInputValue(value);
    clearTimeout(searchTimeoutId);
    const newTimeoutId = setTimeout(() => handleSearch(value), timeout);
    setSearchTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header className="header container">
      <Link to={routes.defaultPath()}>
        <span className="link header-link">GAME</span>
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
  );
};
export default Header;
