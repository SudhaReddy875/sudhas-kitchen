
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const exists = state.some((dish) => dish.id === id);

      if (exists) {
        return state.filter((dish) => dish.id !== id);
      }

      state.push({ id });
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
