import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../../store";

type SliceState = {
  isOpen: boolean;
}

const initialState = {
  isOpen: true
} as SliceState;

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    }
  }
});

export const {
  reducer: sidebarReducer,
  actions: sidebarActions
} = sidebarSlice;

export const sidebarSelectors = {
  selectIsOpen(state: StoreState): boolean {
    return state.sidebar.isOpen;
  }
};
