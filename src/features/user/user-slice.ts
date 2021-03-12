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

const userSlice = createSlice({
  name: "user",
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
  reducer: userReducer,
  actions: userActions
} = userSlice;

export const userSelectors = {
  selectUser(state: StoreState): User {
    return state.user.user;
  },
  selectIsLoggedIn(state: StoreState): boolean {
    return state.user.isLoggedIn;
  }
};
