import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type MovieDetails = {
  Title?: string;
  Director?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Language?: string;
  Actors?: string;
  Year?: string;
  Plot?: string;
  Awards?: string;
  Writer?: string;
  Runtime?: string;
  Released?: string;
  Rated?: string;
  Poster?:string
};

const initialState: MovieDetails = {};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (_, action: PayloadAction<MovieDetails>) => {
      return action.payload;
    },
  },
});

export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
