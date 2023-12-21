import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import themeReducer from "./ThemeSlice"
import socketReducer from "./SocketSlice"
import notificationSocketReducer from "./NotificationSocketSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    socket: socketReducer,
    notificationSocket: notificationSocketReducer,
  },
})

export default store
