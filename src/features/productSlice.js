import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  totalPages: 1,
  productDetail: null,
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
    resetApp(state, action){
      state.error = null;
      state.isLoading = false;
      state.products = action.payload?.data;
      state.totalPages = action.payload?.totalPage;
      state.productDetail = null;
    },
    getProductSuccess(state, action) {
      state.error = null;
      state.isLoading = false;
      state.products = action.payload?.data;
      state.totalPages = action.payload?.totalPage;
      state.productDetail = null;
    },
    getDetailProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productDetail = action.payload;
    },
  },
});

export default slice.reducer;

export const getAllProducts =
  ({ search, type, page, limit = 20 }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(
        `category/allproduct/?page=${page}&limit=${limit}&search=${search}&type=${type}`
      );
      dispatch(slice.actions.getProductSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const getDetailProduct =
  ({ productId }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(`/category/single/${productId}`);
      dispatch(slice.actions.getDetailProductSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const filterBrandProduct =
  ({category, search, brand,type, page, limit = 20 }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(
        `/category/brand?category=${category}&page=${page}&limit=${limit}&brand=${brand}&search=${search}&type=${type}`
      );
      dispatch(slice.actions.getProductSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

