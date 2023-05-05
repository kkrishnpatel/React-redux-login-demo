import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    auth: authSlice,
  }
});

export default store; 
