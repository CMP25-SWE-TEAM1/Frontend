import { createSlice } from "@reduxjs/toolkit"

const notificationSocketSlice = createSlice({
  name: "notificationSocket",
  initialState: {
    value: null,
  },
  reducers: {
    setNotificationSocket: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setNotificationSocket } = notificationSocketSlice.actions
export const selectNotificationSocket = (state) => state.notificationSocket.value
export default notificationSocketSlice.reducer
