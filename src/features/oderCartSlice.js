import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  listOrder: null,
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
      getOrderSuccess(state, action){
        let data = action?.payload?.data
        state.isLoading = false;
        state.error = action.payload;
        state.listOrder = data;
      }
  },
});

export default slice.reducer;

export const getOrder = (enqueueSnackbar) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.get(`/orther/listbooking`);
      console.log(res)
      dispatch(slice.actions.getOrderSuccess(res?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };