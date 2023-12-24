import { createSlice } from "@reduxjs/toolkit"

const initState= localStorage.getItem("FCMToken")

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    FCMToken:initState?initState:null,
  },
  reducers: {
    setNotificationToken: (state, action) => {
      state.FCMToken = action.payload
    },
  },
})

export const { setNotificationToken } = notificationSlice.actions
export const selectNotificationSocket = (state) => state.notificationSocket.value
export default notificationSlice.reducer
