import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../MovieSlice/MovieSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    movie: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
