import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import themeReducer from "./ThemeSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
})

export default store
