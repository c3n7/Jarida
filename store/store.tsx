import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "./authSlice";
import { journalSlice } from "./journalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journals: journalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkStatus = "idle" | "pending" | "rejected" | "fulfilled";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
