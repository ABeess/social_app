import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'src/types';
import { User } from 'src/types/Base';

export interface UserState {
  user: Maybe<User>;
  isAuthenticated: boolean;
  accessToken: string;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  accessToken: '',
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.accessToken = '';
      state.isAuthenticated = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, profile: action.payload } as User;
    },
    updateAvatarRedux: (state, action) => {
      state.user = { ...state.user, avatar: action.payload } as User;
    },
  },
});

export const { userLogout, refreshToken, loginSuccess, updateUser, updateProfile, updateAvatarRedux } =
  userSlice.actions;

export default userSlice.reducer;
