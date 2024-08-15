import { configureStore } from "@reduxjs/toolkit";
import { sideNavSlice } from "./slices/sideNav";
import { widgetData } from "./slices/widgetData";

export const store = configureStore({
  reducer: {
    sideNav: sideNavSlice.reducer,
    widgetData: widgetData.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
