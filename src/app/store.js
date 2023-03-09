import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice"

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
