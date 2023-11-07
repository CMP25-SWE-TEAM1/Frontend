import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk("user/loginUser", async ({ userCredentials, isgoogle }) => {
  let response
  if (isgoogle) {
    console.log(userCredentials)
    response = userCredentials
    localStorage.setItem("user", JSON.stringify(userCredentials))
  } else {
    const correctURL = `https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/login`
    const wrongURL = `https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/wlogin`
    const request = await axios.post(correctURL, userCredentials)
    response = await request.data
    localStorage.setItem("user", JSON.stringify(response.user))
  }
  return response
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
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
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        console.log(action.error.message)
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials"
        } else {
          state.error = action.error.message
        }
      })
  },
})

export default userSlice.reducer