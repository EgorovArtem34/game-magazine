import {
  FaTrophy, FaThumbsDown, FaPlaystation, FaXbox,
} from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { AiFillStar, AiFillFire } from 'react-icons/ai';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { BsNintendoSwitch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
// import {
//   Navigate,
// } from 'react-router-dom';
import { actions, fetchGames } from '../slices/gamesSlice.js';
// import routes from '../utils/routes.js';

const SortList = () => {
  const dispatch = useDispatch();
  const handleClick = (type) => {
    dispatch(actions.setFilteredType(type));
    dispatch(actions.setPage(1));
    dispatch(fetchGames());
    window.location.href = `/sorted/${type}`;
    // return <Navigate>
  };

  return (
    <>
      <div className="sort-category">
        <span className="sort-header">Top</span>
        <ul>
          <li>
            {/* <Link to="/sorted/bestGame"> */}
            <button type="submit" onClick={() => handleClick('best')}>
              <div className="btn-img-wrap">
                <FaTrophy className="btn-img" />
              </div>
              <span className="link-text">Best games</span>
            </button>
            {/* </Link> */}
          </li>
          <li>
            <button type="button" onClick={() => handleClick('worst')}>
              <div className="btn-img-wrap">
                <FaThumbsDown className="btn-img" />
              </div>
              <span className="link-text">Worst games</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="sort-category">
        <span className="sort-header">New Releases</span>
        <ul>
          <li>
            <button type="button" onClick={() => handleClick('lastMonth')}>
              <div className="btn-img-wrap">
                <AiFillStar className="btn-img" />
              </div>
              <span className="link-text">Last 30 days</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick('thisWeek')}>
              <div className="btn-img-wrap">
                <AiFillFire className="btn-img" />
              </div>
              <span className="link-text">This week</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick('nextMonth')}>
              <div className="btn-img-wrap">
                <TbPlayerTrackNextFilled className="btn-img" />
              </div>
              <span className="link-text">Next month</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="sort-category">
        <span className="sort-header">Platforms</span>
        <ul>
          <li>
            <button type="button" onClick={() => handleClick('pc')}>
              <div className="btn-img-wrap">
                <FiMonitor className="btn-img" />
              </div>
              <span className="link-text">PC</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick('playStation5')}>
              <div className="btn-img-wrap">
                <FaPlaystation className="btn-img" />
              </div>
              <span className="link-text">PlayStation 5</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick('xboxOne')}>
              <div className="btn-img-wrap">
                <FaXbox className="btn-img" />
              </div>
              <span className="link-text">Xbox One</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick('nintendoSwitch')}>
              <div className="btn-img-wrap">
                <BsNintendoSwitch className="btn-img" />
              </div>
              <span className="link-text">Nintendo Switch</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SortList;
