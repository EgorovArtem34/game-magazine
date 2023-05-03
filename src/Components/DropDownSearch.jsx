import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { actions } from '../slices/gamesSlice';

const DropDownSearch = () => {
  const { removeSearchedGames } = actions;
  const dispatch = useDispatch();
  const {
    // isLoading,
    searchGames: { isLoadingSearch, games },
  } = useSelector(({ gamesSlice }) => gamesSlice);
  if (!games) {
    return '';
  }
  if (games.length === 0) {
    return (
      <div className="dropdown-content">
        <span>No games are currently available. Please try again later</span>
      </div>
    );
  }

  if (isLoadingSearch) {
    return (
      <div className="dropdown-content">
        <Loader />
      </div>
    );
  }
  return (
    <div className="dropdown-content">
      <span>Games</span>
      <nav>
        <ul>
          {games.map((game) => {
            const {
              background_image: backgroundImage,
              id, name, slug,
            } = game;
            return (
              <Link to={`/game/${slug}`} key={id} onClick={() => dispatch(removeSearchedGames())}>
                <li key={id} className="dropdown-li">
                  <div
                    className="bg-img dropdown-img"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                  />
                  <span>{name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default DropDownSearch;
