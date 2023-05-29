import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  carts: null,
  listOrther: null,
  totalCart: null,
  infoUserBooking: null,
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
      let data = action?.payload?.data?.map((e) => {
        if (!e?.check) {
          return { ...e, check: false };
        }
      });
      state.isLoading = false;
      state.error = null;
      state.totalCart = total;
      state.listOrther = data;
    },
    refreshDataSuccess(state, action) {
      state.isLoading = null;
      state.error = null;
      state.carts = null;
      state.totalCart = null;
    },
    infoUserSuccess(state, action) {
      state.isLoading = null;
      state.error = null;
      state.infoUserBooking = action.payload[0];
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
      const res = await apiService.put(
        `/orther/quantity/${ortherId}?quantity=${quantity}`
      );
      dispatch(getOther(enqueueSnackbar));
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

export const resfreshData = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.refreshDataSuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
export const ortherConfim =
  ({ dataOrthers }, enqueueSnackbar) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.put(`/orther/status`, {
        dataOrthers: dataOrthers,
      });
      if (res.success) {
        dispatch(getOther(enqueueSnackbar));
        enqueueSnackbar("Order successfully", { variant: "success" });
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

export const inFoUserBooking = () => async (dispatch) => {
  try {
    const res = await apiService.get("/users/userBooking");
    dispatch(slice.actions.infoUserSuccess(res?.data));
  } catch (error) {
    console.log(error);
  }
};
