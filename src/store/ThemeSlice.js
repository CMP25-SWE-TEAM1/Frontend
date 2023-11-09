import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: localStorage.getItem("mode") === "dark",
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
    // toggleTheme: (state) => {
    //   const htmlElement = document.getElementById("htmlid")

    //   state.darkMode = !state.darkMode
    //   if (state.darkMode) {
    //     document.documentElement.style.setProperty("--color-theme", "dark")
    //     htmlElement.classList.add("dark")
    //   } else {
    //     document.documentElement.style.setProperty("--color-theme", "white")
    //     htmlElement.classList.remove("dark")
    //   }
    // },
  },
})

export const toggleTheme = themeSlice.actions
export const setDarkMode = themeSlice.actions.setDarkMode
export const setLightMode = themeSlice.actions.setLightMode

export default themeSlice.reducer
