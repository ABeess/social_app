import { createSlice } from '@reduxjs/toolkit';
import { FriendShipRecommendResponse } from 'src/types/Response';

const initialState: FriendShipRecommendResponse = {
  users: [],
  page: 0,
  perPage: 0,
  totalCount: 0,
  totalPage: 0,
};

const userRecommendSlice = createSlice({
  name: 'friend-recommend',
  initialState,
  reducers: {
    loadDataRecommend: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.totalCount = action.payload.totalCount;
      state.totalPage = action.payload.totalPage;
      state.users = action.payload.users;
    },

    updateUserRecommend: (state, action) => {
      state.users = state.users?.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { loadDataRecommend, updateUserRecommend } = userRecommendSlice.actions;

export default userRecommendSlice.reducer;
