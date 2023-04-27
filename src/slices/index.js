import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './gamesSlice';

export default configureStore({
  reducer: {
    gamesSlice,
  },
});
