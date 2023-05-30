import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  listBrowseProducts: null,
};

const slice = createSlice({
  name: "browseproduct",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getListBrowseProductSuccess(state, action) {
      let data = action?.payload?.data?.map((e) => {
        if (!e?.check) {
          return { ...e, check: false };
        }
      });
      state.isLoading = false;
      state.error = null;
      state.listBrowseProducts = data;
    },
  },
});

export default slice.reducer;

export const getListBrowsProduct = (enqueueSnackbar) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await apiService.get(`/orther/listorther`);
    dispatch(slice.actions.getListBrowseProductSuccess(data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    enqueueSnackbar(error.message, { variant: "error" });
  }
};
export const browsProduct =
  ({ dataOrthers }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.put(`/orther/status`, {
        dataOrthers: dataOrthers,
      });
      if (res.success) {
        dispatch(getListBrowsProduct(enqueueSnackbar));
        enqueueSnackbar(res?.message, { variant: "success" });
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
