import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { alertsReducer } from "./features/alerts/alerts-slice";
import { sidebarReducer } from "./components/sidebar/sidebar-slice";
import { authReducer } from "./features/auth/auth-slice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  sidebar: sidebarReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type StoreState = ReturnType<typeof rootReducer>;

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export function useStoreDispatch() {
  return useDispatch<typeof store.dispatch>();
}
