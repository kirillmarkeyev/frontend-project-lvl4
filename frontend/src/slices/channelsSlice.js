/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: ((state, action) => {
      const { id } = action.payload;
      channelsAdapter.removeOne(state, id);
    }),
    changeChannelName: channelsAdapter.updateOne,
    setCurrentChannelId: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
    setDefaultChannelId: ((state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    }),
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
