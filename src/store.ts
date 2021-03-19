import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { alertsReducer } from "./components/alerts/alerts-slice";
import { sidebarReducer } from "./components/sidebar/sidebar-slice";
import { userReducer } from "./features/user/user-slice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  sidebar: sidebarReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type StoreState = ReturnType<typeof rootReducer>;

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export function useStoreDispatch() {
  return useDispatch<typeof store.dispatch>();
}
