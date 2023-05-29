import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  listOrder: [],
};

const slice = createSlice({
  name: "ordercart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOrderSuccess(state, action) {
      let data = action?.payload;
      state.isLoading = false;
      state.error = action.payload;
      state.listOrder = data;
    },
  },
});

export default slice.reducer;

export const getOrder = (enqueueSnackbar) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.get(`/orther/listbooking`);
    dispatch(slice.actions.getOrderSuccess(res?.data?.data));
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
      await apiService.delete(`/orther/single/${ortherId}`);
      dispatch(getOrder(enqueueSnackbar));
      enqueueSnackbar("Delete Order successfully", { variant: "success" });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
