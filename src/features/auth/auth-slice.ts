import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../../store";

type User = {
  id: string;
  username: string;
}

type SliceState = {
  user: User;
  isLoggedIn: boolean;
}

const initialState = {
  user: { id: "", username: "" },
  isLoggedIn: false
} as SliceState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout() {
      return initialState;
    }
  }
});

export const {
  reducer: authReducer, 
  actions: authActions
} = authSlice;

export const authSelectors = {
  selectUser(state: StoreState): User {
    return state.auth.user;
  },
  selectIsLoggedIn(state: StoreState): boolean {
    return state.auth.isLoggedIn;
  }
};

