import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../Features/Movies/MovieSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
