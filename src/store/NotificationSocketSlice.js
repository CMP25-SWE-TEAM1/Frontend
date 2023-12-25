import { createSlice } from "@reduxjs/toolkit"

const initState = localStorage.getItem("FCMToken")
const initStateUnseen = localStorage.getItem("unseen")

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    FCMToken: initState ? initState : null,
    unseenCount: initStateUnseen ? parseInt(initStateUnseen) : 0,
  },
  reducers: {
    setNotificationToken: (state, action) => {
      state.FCMToken = action.payload
    },
    setUnseenCount: (state, action) => {
      console.log(action.payload)
      state.unseenCount = action.payload
    },
  },
})

export const { setNotificationToken } = notificationSlice.actions
export const { setUnseenCount } = notificationSlice.actions

export default notificationSlice.reducer
