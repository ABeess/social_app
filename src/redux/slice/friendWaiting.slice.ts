import { createSlice } from '@reduxjs/toolkit';
import { Friendship } from 'src/generated/graphql';
import { FriendShipRequestResponse } from 'src/types/Response';

const initialState: FriendShipRequestResponse = {
  friendRequest: [],
  page: 0,
  perPage: 0,
  totalCount: 0,
  totalPage: 0,
};

const friendWaitingSlice = createSlice({
  name: 'friend-waiting',
  initialState,
  reducers: {
    loadDataWaiting: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.totalCount = action.payload.totalCount;
      state.totalPage = action.payload.totalPage;
      state.friendRequest = action.payload.friendRequest;
    },

    updateFriendWaiting: (state, action) => {
      state.friendRequest = [...(state.friendRequest as Friendship[]), action.payload];
    },
  },
});

export const { loadDataWaiting, updateFriendWaiting } = friendWaitingSlice.actions;

export default friendWaitingSlice.reducer;
