/* eslint-disable no-param-reassign */
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
});

export const fetchGames = createAsyncThunk(
  'games/fetch',
  async (_, thunkAPI) => {
    const { page, sizePage, filteredType } = thunkAPI.getState().gamesSlice;
    const route = getRoute(filteredType, sizePage, page);
    const { data: { results } } = await axios.get(route);
    console.log(page, sizePage, filteredType, results);
    return results;
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
      });
  },
});

export const { actions } = gamesSlice;
export const selectors = gamesAdapter.getSelectors((state) => state.gamesSlice);
export default gamesSlice.reducer;
