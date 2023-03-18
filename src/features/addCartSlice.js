import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  carts: null,
  listOrther: null,
  totalCart: null,
};

const slice = createSlice({
  name: "addcart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    checkBoxOrtherSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.listOrther = action.payload;
    },
    addToCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getOtherSuccess(state, action) {
      let total = action.payload.total;
      let data = action?.payload?.data.map((e) => {
        if (!e?.check) {
          return { ...e, check: false };
        }
      });
      state.isLoading = false;
      state.error = null;
      state.totalCart = total;
      state.listOrther = data;
    },
  },
});

export default slice.reducer;

export const addToCart =
  ({ productId }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.post(`/orther/${productId}`);
      dispatch(getOther(enqueueSnackbar));
      enqueueSnackbar("add to cart success", { variant: "success" });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const getOther = (enqueueSnackbar) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.get(`/orther/listorther`);
    dispatch(slice.actions.getOtherSuccess(res?.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

export const checkBoxOrther = (orther) => async (dispatch) => {
  dispatch(slice.actions.checkBoxOrtherSuccess(orther));
};

export const setQuanlityOrther =
  ({ ortherId, quantity }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(ortherId, quantity);
      const res = await apiService.put(`/orther/single/${ortherId}`, {
        quantity: quantity,
      });
      dispatch(getOther(enqueueSnackbar));
      console.log(res);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  
export const deleteOrther =
  ({ ortherId }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.delete(`/orther/single/${ortherId}`);
      enqueueSnackbar("delete Success", { variant: "success" });
      dispatch(getOther(enqueueSnackbar));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };