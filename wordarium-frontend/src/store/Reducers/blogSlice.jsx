import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
}

export const BlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers:{
        loadBlog: (state,actions) => {
            state.info = actions.payload;
        },
        removeBlog: (state, actions) => {
            state.info = null;
        }
    }
});

export const {loadBlog,removeBlog} = BlogSlice.actions;

export default BlogSlice.reducer;
