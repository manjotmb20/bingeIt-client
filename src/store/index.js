import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  popularmovies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("bingeit/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9"
  );
  return genres;
});

export const getPopularMovies = createAsyncThunk(
  "bingeit/popular",
  async () => {
    const {
      data: { results },
    } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab&language=en-US&page=1"
    );
    return results;
  }
);

const BingeItSlice = createSlice({
  name: "bingeit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.popularmovies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    bingeit: BingeItSlice.reducer,
  },
});

export const { setGenres, setMovies } = BingeItSlice.actions;
