import { createSlice } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { cloudinaryUpload } from "../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.updatedProfile = action.payload;
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({ userId, email, name, phone, address, avatarUrl }) =>
  async (dispatch) => {
    try {
      const data = {
        email,
        name,
        phone,
        address,
        avatarUrl,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/update/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
