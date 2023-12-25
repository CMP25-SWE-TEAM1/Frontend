import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import themeReducer from "./ThemeSlice"
import socketReducer from "./SocketSlice"
import notificationSocketReducer from "./NotificationSocketSlice"
import PreferencesSlice from "./PreferencesSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    socket: socketReducer,
    notification: notificationSocketReducer,
    preferences: PreferencesSlice,
  },
})

export default store
