import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoute from '../utils/getRoute.js';

const gamesAdapter = createEntityAdapter();
const initialState = gamesAdapter.getInitialState({
  filteredType: 'all',
  page: 1,
  sizePage: 12,
  hasMore: true,
  isLoading: false,
  searchGames: {
    isLoadingSearch: false,
    games: null,
  },
  gameDetails: {
    // isLoading: false,
    data: null,
  },
});

export const selectGameBySlug = (state, slug) => Object.values(state.gamesSlice.entities)
  .find((game) => game.slug === slug);

export const searchGames = createAsyncThunk(
  'games/search',
  async (gameName) => {
    const sizePage = 7;
    const route = getRoute('searchGame', sizePage, gameName);
    const { data: { results } } = await axios.get(route);
    return results;
  },
);

export const fetchGames = createAsyncThunk(
  'games/fetch',
  async (_, thunkAPI) => {
    const { page, sizePage, filteredType } = thunkAPI.getState().gamesSlice;
    const route = getRoute(filteredType, sizePage, page);
    const { data: { results } } = await axios.get(route);
    return results;
  },
);

export const fetchGameDetail = createAsyncThunk(
  'gameDetail/fetch',
  async (id) => {
    const route = getRoute('gameDetail', null, null, id);
    const {
      data: {
        description_raw: desc, developers, rating, genres,
        id: gameId, name, platforms, released, website,
        background_image: image1,
        background_image_additional: image2,
        slug,
      },
    } = await axios.get(route);
    return {
      desc,
      developers,
      rating,
      genres,
      gameId,
      name,
      platforms,
      released,
      website,
      image1,
      image2,
      slug,
    };
  },
);

const gamesSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addGames: gamesAdapter.addMany,
    UpdateGames: gamesAdapter.updateMany,
    setFilteredType: (state, { payload }) => {
      state.filteredType = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    removeSearchedGames: (state) => {
      state.searchGames.games = null;
      state.searchGames.isLoadingSearch = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGames.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const games = payload;
        if (games.length < state.sizePage) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }

        if (games.length > 0) {
          if (state.page === 1) {
            gamesAdapter.setAll(state, games);
          } else {
            gamesAdapter.addMany(state, games);
          }
          state.page += 1;
        } else {
          gamesAdapter.removeAll(state);
          state.hasMore = false;
        }
      })
      .addCase(fetchGames.rejected, (state, action) => {
        console.log(action.error);
      })

      .addCase(searchGames.pending, (state) => {
        state.searchGames.isLoadingSearch = true;
      })
      .addCase(searchGames.fulfilled, (state, { payload }) => {
        state.searchGames.isLoadingSearch = false;
        state.searchGames.games = payload;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.searchGames.isLoadingSearch = false;
        console.log(action.error);
      })

      // .addCase(fetchGameDetail.pending, (state) => {
      //   state.gameDetails.isLoading = true;
      // })
      .addCase(fetchGameDetail.fulfilled, (state, { payload }) => {
        // state.gameDetails.isLoading = false;
        state.gameDetails.data = payload;
      })
      .addCase(fetchGameDetail.rejected, (state, action) => {
        // state.gameDetails.isLoading = false;
        console.log(action.error);
      });
  },
});

export const { actions } = gamesSlice;
export const selectors = gamesAdapter.getSelectors((state) => state.gamesSlice);
export default gamesSlice.reducer;
