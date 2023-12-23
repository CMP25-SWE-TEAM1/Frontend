import { createSlice } from "@reduxjs/toolkit"

const initMode = localStorage.getItem("preferences")

const initialState = {
  showBlockedandMuted: initMode === "true" ? true : false,
}

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleBlockedMutedMode: (state) => {
      state.showBlockedandMuted = state.showBlockedandMuted ? false : true
      localStorage.setItem("preferences", state.showBlockedandMuted ? "true" : "false")
    },
  },
})

export const toggleBlockedMutedMode = preferencesSlice.actions.toggleBlockedMutedMode

export default preferencesSlice.reducer
