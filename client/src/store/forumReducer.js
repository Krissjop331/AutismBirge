import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createForum } from "../http/forumAPI";

const initialState = {
  forums: [],
};
// Define the async thunk for fetching user data
export const fetchForumData = createAsyncThunk("forum/forumData", async () => {
  const response = await fetch("http://94.247.128.204:5000/api/forum");
  const jsonData = await response.json();
  console.log(jsonData);

  return jsonData;
});
export const postForum = createAsyncThunk("forum/post", async (data) => {
  const response = createForum(data);

  return response.data;
});
const slice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    addForum: (state, action) => {
      state.forums = [...state.forums, action.payload];
    },
    deleteForum: (state, action) => {
      console.log(action.payload);
      state.forums = state.forums.filter(
        (forum) => forum.id !== action.payload,
      );
    },
    editForum: (state, action) => {
      const { id, title, description } = action.payload;
      console.log(id);
      const forumToEdit = state.forums.find((forum) => forum.id === id);
      console.log(forumToEdit);
      if (forumToEdit) {
        forumToEdit.title = title;
        forumToEdit.description = description;
      }
    },
    deleteAllForums: (state) => {
      state.forums = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForumData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postForum.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchForumData.fulfilled, (state, action) => {
        state.loading = false;
        state.forums = action.payload.forum;
        console.log(action.payload.forum);
        console.log(action.payload);
      })
      .addCase(fetchForumData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addForum, deleteForum, editForum, deleteAllForums } =
  slice.actions;

export default slice.reducer;
