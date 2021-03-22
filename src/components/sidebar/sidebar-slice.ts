import { createSlice } from "@reduxjs/toolkit";
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
    toggle(state) {
      state.isOpen = !state.isOpen;
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
