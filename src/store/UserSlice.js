import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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
    const mockURL = `https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/login`
    const request = await axios.post(mockURL, userCredentials)
    response = await request.data
    localStorage.setItem("user", JSON.stringify(response.user))
  }

  return response
})

const initialUser = localStorage.getItem("user")

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: initialUser ? JSON.parse(initialUser) : null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = google ? action.payload : action.payload.user
        state.error = null
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
      })
  },
})

export const logoutUser = userSlice.actions.logoutUser

export default userSlice.reducer
