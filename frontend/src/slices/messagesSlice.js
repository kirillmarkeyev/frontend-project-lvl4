/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
