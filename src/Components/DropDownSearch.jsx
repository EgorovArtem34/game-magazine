import { useSelector } from 'react-redux';
import Loader from './Loader';

// const makeSearchList = (games) => (

// )
const DropDownSearch = () => {
  const {
    isLoading,
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
  console.log('DropDownSearch', isLoading, isLoadingSearch, games);
  // eslint-disable-next-line consistent-return
  return (
    <div className="dropdown-content">
      <span>Games</span>
      <ul>
        {games.map((game) => {
          const {
            background_image: backgroundImage,
            id, name,
          } = game;
          return (
            <li key={id} className="dropdown-li">
              <div
                className="bg-img xxx"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DropDownSearch;
