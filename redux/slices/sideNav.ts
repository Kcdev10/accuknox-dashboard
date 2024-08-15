import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface sideNavStatusState {
  isOpen: boolean;
  categoryId: number;
}

// Define the initial state using that type
const initialState: sideNavStatusState = {
  isOpen: false,
  categoryId: 0,
};

export const sideNavSlice = createSlice({
  name: "navStatus",
  initialState,
  reducers: {
    toogle: (state, actions) => {
      state.isOpen = !state.isOpen;
      state.categoryId = actions.payload;
    },
  },
});

export const { toogle } = sideNavSlice.actions;
