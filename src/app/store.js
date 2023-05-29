import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import addcartReducer from "../features/addCartSlice";
import ordercartReducer from "../features/oderCartSlice";
import browseproductReducer from "../features/browseProducts";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  addcart: addcartReducer,
  ordercart: ordercartReducer,
  browseproduct: browseproductReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
