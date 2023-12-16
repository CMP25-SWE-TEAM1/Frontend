import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import themeReducer from "./ThemeSlice"
import socketReducer from "./SocketSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    socket: socketReducer,
  },
})

export default store
