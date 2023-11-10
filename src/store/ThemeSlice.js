import { createSlice } from "@reduxjs/toolkit"

const initMode = localStorage.getItem("mode")

const initialState = {
  darkMode: initMode === "true" ? true : false,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      const htmlElement = document.getElementById("htmlid")
      state.darkMode = true
      document.documentElement.style.setProperty("--color-theme", "dark")
      htmlElement.classList.add("dark")
    },
    setLightMode: (state) => {
      const htmlElement = document.getElementById("htmlid")
      state.darkMode = false
      document.documentElement.style.setProperty("--color-theme", "white")
      htmlElement.classList.remove("dark")
    },
  },
})

export const toggleTheme = themeSlice.actions
export const setDarkMode = themeSlice.actions.setDarkMode
export const setLightMode = themeSlice.actions.setLightMode

export default themeSlice.reducer
