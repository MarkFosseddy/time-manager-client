import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { alertsReducer } from "./components/alerts/alerts-slice";
import { sidebarReducer } from "./components/sidebar/sidebar-slice";
import { tasksReducer } from "./features/tasks/tasks-slice";
import { userReducer } from "./features/user/user-slice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  sidebar: sidebarReducer,
  user: userReducer,
  tasks: tasksReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type StoreState = ReturnType<typeof rootReducer>;

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export function useStoreDispatch() {
  return useDispatch<typeof store.dispatch>();
}
