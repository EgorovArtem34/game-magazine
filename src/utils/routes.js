import defineDays from './defineDays';

const api = 'https://api.rawg.io/api';
const topRate = '&metacritic=70,100&ordering=-rating';
const lowRate = '&metacritic=1,70';
const apiKey = process.env.REACT_APP_API_KEY;

const {
  currentDateString, dateMonthAgo, dateWeekAgo, dataNextMonth,
} = defineDays();
const monthRange = `&dates=${dateMonthAgo},${currentDateString}`;
const weekAgoRange = `&dates=${dateWeekAgo},${currentDateString}`;
const nextMonthRange = `&dates=${currentDateString},${dataNextMonth}`;
const routes = {
  defaultPath: () => '/',
  allTimeTop: () => '/all-time-top',
  allGame: (sizePage, page) => [api, `games?key=${apiKey}&page=${page}&page_size=${sizePage}`].join('/'),
  bestGame: (sizePage, page) => [api, `games?key=${apiKey}${topRate}&page=${page}&page_size=${sizePage}`].join('/'),
  worstGame: (sizePage, page) => [api, `games?key=${apiKey}${lowRate}&page=${page}&page_size=${sizePage}`].join('/'),
  lastMonth: (sizePage, page) => [api, `games?key=${apiKey}${monthRange}&metacritic=10,100&page=${page}&page_size=${sizePage}`].join('/'),
  thisWeek: (sizePage, page) => [api, `games?key=${apiKey}${weekAgoRange}&metacritic=10,100&page=${page}&page_size=${sizePage}`].join('/'),
  nextMonth: (sizePage, page) => [api, `games?key=${apiKey}${nextMonthRange}&page=${page}&page_size=${sizePage}`].join('/'),
  pc: (sizePage, page) => [api, `games?key=${apiKey}&platforms=4&ordering=-added&page=${page}&page_size=${sizePage}`].join('/'),
  nintendoSwitch: (sizePage, page) => [api, `games?key=${apiKey}&platforms=7&ordering=-added&page=${page}&page_size=${sizePage}`].join('/'),
  playStation5: (sizePage, page) => [api, `games?key=${apiKey}&platforms=187&ordering=-added&page=${page}&page_size=${sizePage}`].join('/'),
  xboxOne: (sizePage, page) => [api, `games?key=${apiKey}&platforms=1&ordering=-added&page=${page}&page_size=${sizePage}`].join('/'),
};

export default routes;
