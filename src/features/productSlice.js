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
    resetApp(state, action) {
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
  ({ search, type, price, rating, page, limit = 20 }, enqueueSnackbar) =>
  async (dispatch) => {
    let gte = price[0];
    let lte = price[1];
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(
        `products/allproduct?page=${page}&limit=${limit}&search=${search}&type=${type}&gte=${gte}&lte=${lte}`
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
      const { data } = await apiService.get(`/products/single/${productId}`);
      dispatch(slice.actions.getDetailProductSuccess(data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const filterBrandProduct =
  (
    { category, search, brand, type, price, rating, page, limit = 20 },
    enqueueSnackbar
  ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    let gte = price[0];
    let lte = price[1];
    try {
      const res = await apiService.get(
        `/products/brand?category=${category}&page=${page}&limit=${limit}&brand=${brand}&search=${search}&type=${type}&gte=${gte}&lte=${lte}`
      );
      dispatch(slice.actions.getProductSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
