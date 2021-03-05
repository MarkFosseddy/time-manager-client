import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { alertsReducer } from "../components/alerts";

const rootReducer = combineReducers({
  alerts: alertsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type StoreState = ReturnType<typeof rootReducer>;

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export function useStoreDispatch() {
  return useDispatch<typeof store.dispatch>();
}
