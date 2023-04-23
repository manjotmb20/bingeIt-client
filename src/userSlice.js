import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  listFavorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
          const { mediaId } = action.payload;
          state.listFavorites = [...state.listFavorites].filter(e => e.mediaId.toString() !== mediaId.toString());
        },
        addFavorite: (state, action) => {
            console.log("in addFavorite reducer");
            console.log("in add: ",action.payload);
            console.log("in add: ",state.listFavorites);
          state.listFavorites = [action.payload, ...state.listFavorites];
          console.log("in add: ",state.listFavorites);
        }
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
