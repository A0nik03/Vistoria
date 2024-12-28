import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './Reducers/blogSlice.jsx'

export const blogStore = configureStore({
    reducer:{
        blogs: blogReducer,
    }
})