import {
  FaTrophy, FaThumbsDown, FaPlaystation, FaXbox,
} from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { AiFillStar, AiFillFire } from 'react-icons/ai';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { BsNintendoSwitch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions, fetchGames } from '../slices/gamesSlice.js';

const categories = {
  best: 'best',
  worst: 'worst',
  pc: 'pc',
  playStation5: 'playStation5',
  xboxOne: 'xboxOne',
  nintendoSwitch: 'nintendoSwitch',
  lastMonth: 'lastMonth',
  thisWeek: 'thisWeek',
  nextMonth: 'nextMonth',
};

const SortList = () => {
  const dispatch = useDispatch();
  const handleClick = (type) => {
    dispatch(actions.setFilteredType(type));
    dispatch(actions.setPage(1));
    dispatch(fetchGames());
  };

  return (
    <>
      <div className="sort-category">
        <span className="sort-header">Top</span>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/sorted/${categories.best}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="submit" onClick={() => handleClick(categories.best)}>
                  <div className="btn-img-wrap">
                    <FaTrophy className="btn-img" />
                  </div>
                  <span className="link-text">Best games</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.worst}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.worst)}>
                  <div className="btn-img-wrap">
                    <FaThumbsDown className="btn-img" />
                  </div>
                  <span className="link-text">Worst games</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sort-category">
        <span className="sort-header">New Releases</span>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/sorted/${categories.lastMonth}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.lastMonth)}>
                  <div className="btn-img-wrap">
                    <AiFillStar className="btn-img" />
                  </div>
                  <span className="link-text">Last 30 days</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.thisWeek}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.thisWeek)}>
                  <div className="btn-img-wrap">
                    <AiFillFire className="btn-img" />
                  </div>
                  <span className="link-text">This week</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.nextMonth}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.nextMonth)}>
                  <div className="btn-img-wrap">
                    <TbPlayerTrackNextFilled className="btn-img" />
                  </div>
                  <span className="link-text">Next month</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sort-category">
        <span className="sort-header">Platforms</span>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/sorted/${categories.pc}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.pc)}>
                  <div className="btn-img-wrap">
                    <FiMonitor className="btn-img" />
                  </div>
                  <span className="link-text">PC</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.playStation5}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.playStation5)}>
                  <div className="btn-img-wrap">
                    <FaPlaystation className="btn-img" />
                  </div>
                  <span className="link-text">PlayStation 5</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.xboxOne}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.xboxOne)}>
                  <div className="btn-img-wrap">
                    <FaXbox className="btn-img" />
                  </div>
                  <span className="link-text">Xbox One</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/sorted/${categories.nintendoSwitch}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <button type="button" onClick={() => handleClick(categories.nintendoSwitch)}>
                  <div className="btn-img-wrap">
                    <BsNintendoSwitch className="btn-img" />
                  </div>
                  <span className="link-text">Nintendo Switch</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default SortList;
