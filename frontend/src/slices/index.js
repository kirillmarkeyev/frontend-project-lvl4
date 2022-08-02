import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice.js';

// BEGIN (write your solution here)
export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
