import {configureStore} from '@reduxjs/toolkit';
import videoplayerReducer from './features/videoplayer/videoplayerSlice';

export const store = configureStore({
  reducer: {
    videoplayer: videoplayerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
