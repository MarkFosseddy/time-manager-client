import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreState } from "../../store";
import { Alert } from "./alerts-types";

type SliceState = {
  alerts: Alert[];
}

const initialState = {
  alerts: []
} as SliceState;

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Alert>) {
      state.alerts.unshift(action.payload);
    },
    delete(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    }
  }
});

export const {
  reducer: alertsReducer,
  actions: alertsActions
} = alertsSlice;

export const alertsSelectors = {
  selectAll(state: StoreState): Alert[] {
    return state.alerts.alerts;
  }
};
