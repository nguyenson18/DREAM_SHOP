import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    products: [],
    totalPages: 1,
  };

  const slice = createSlice({
    name: "product",
    initialState,
    reducers: {
      startLoading(state) {
        state.isLoading = true;
      },
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      getProductSuccess(state, action) {
        state.error = null;
        state.isLoading = false;
        state.products = action.payload?.data
        state.totalPages = action.payload?.totalPage
      }
    },
  });

  export default slice.reducer

  export const getAllProducts = ({ page, limit = 20}) => async(dispatch) =>{
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(`/product/allproduct/?page=${page}&limit=${limit}`);
      dispatch(slice.actions.getProductSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    
  }