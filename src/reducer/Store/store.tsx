import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "../Slices/jwtSlice";
import userReducer from "../Slices/userSlice";


export const store=configureStore({
        reducer:{
            jwt:jwtReducer,
            user:userReducer
        }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;