import routes from './routes';

export default (type, sizePage, page, id = null) => {
  switch (type) {
    case 'all':
      return routes.allGame(sizePage, page);
    case 'best':
      return routes.bestGame(sizePage, page);
    case 'worst':
      return routes.worstGame(sizePage, page);
    case 'lastMonth':
      return routes.lastMonth(sizePage, page);
    case 'thisWeek':
      return routes.thisWeek(sizePage, page);
    case 'nextMonth':
      return routes.nextMonth(sizePage, page);
    case 'pc':
      return routes.pc(sizePage, page);
    case 'playStation5':
      return routes.playStation5(sizePage, page);
    case 'nintendoSwitch':
      return routes.nintendoSwitch(sizePage, page);
    case 'xboxOne':
      return routes.xboxOne(sizePage, page);
    case 'searchGame':
      // поправить параметр sizePage
      return routes.searchGame(sizePage, page);
    case 'gameDetail':
      return routes.getGameDetail(id);
    case 'screenshots':
      return routes.getScreenshotsGame(id);
    default:
      return Promise.reject(new Error(`Invalid type : ${type}`));
  }
};
