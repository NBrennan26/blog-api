import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Comment
export const createComment = createAsyncThunk(
  "comments/create",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Comments for Post
export const getComments = createAsyncThunk(
  "comments/getAll",
  async (id, thunkAPI) => {
    try {
      return await commentService.getComments(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetComment: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetComment } = commentSlice.actions;
export default commentSlice.reducer;
