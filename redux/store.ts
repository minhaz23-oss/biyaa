
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import biodataReducer from './biodataSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    biodata: biodataReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;