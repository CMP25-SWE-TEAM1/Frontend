import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// TODO store token instead of user

const APIs = {
  mock: { loginAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/login" },
  actual: {
    loginAPI: "http://backend.gigachat.cloudns.org/api/user/login",
  },
}

let google = false

export const loginUser = createAsyncThunk("user/loginUser", async ({ userCredentials, isgoogle }) => {
  let response
  if (isgoogle) {
    google = true
    console.log(userCredentials)
    response = userCredentials
    localStorage.setItem("user", JSON.stringify(userCredentials))
  } else {
    google = false
    const request = await axios.post(APIs.actual.loginAPI, userCredentials)
    response = await request.data
    localStorage.setItem("user", JSON.stringify(response.data.user))
  }

  return response
})

const initialUser = localStorage.getItem("user")
const initialToken = localStorage.getItem("token")

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: initialUser ? JSON.parse(initialUser) : null,
    error: null,
    token: initialToken ? JSON.parse(initialToken) : null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
    signupUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload.user

      //next line will be removed
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))

      state.loading = false
      state.error = null
      state.token = action.payload.token

      action.payload.navigate("/home")
    },
    changeProfilePicture: (state, action) => {
      state.user = action.payload.user

      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))

      state.loading = false
      state.error = null
      state.token = action.payload.token
    },
    changeUsername: (state, action) => {
      state.user.username = action.payload
      let temp_user = JSON.parse(localStorage.getItem("user"))
      temp_user.username = action.payload
      localStorage.setItem("user", JSON.stringify(temp_user))
    },
    changeEmail: (state, action) => {
      state.user.email = action.payload
      let temp_user = JSON.parse(localStorage.getItem("user"))
      temp_user.email = action.payload
      localStorage.setItem("user", JSON.stringify(temp_user))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
        state.token = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = google ? action.payload : action.payload.data.user
        state.error = null
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        console.log(action.error.message)
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials"
        } else {
          state.error = "Access Denied! Invalid Credentials"

          //this may be changed
          // state.error = action.error.message
        }
        state.token = null
      })
  },
})

export const logoutUser = userSlice.actions.logoutUser
export const signupUser = userSlice.actions.signupUser
export const changeProfilePicture = userSlice.actions.changeProfilePicture
export const changeUsername = userSlice.actions.changeUsername
export const changeEmail = userSlice.actions.changeEmail

export default userSlice.reducer
