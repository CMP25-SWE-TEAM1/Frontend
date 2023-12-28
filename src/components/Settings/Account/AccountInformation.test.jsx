import React from "react"
import { screen, render, within, act } from "@testing-library/react"
import AccountInformation from "./AccountInformation"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"
import { Provider } from "react-redux"
import store from "../../../store"

describe("Content", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /Account information/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText(/view and update your account information, like your username and email address\./i)).toBeInTheDocument()
  })
  test("choice headers", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText(/email/i)).toBeInTheDocument()
    expect(screen.getByText(/username/i)).toBeInTheDocument()
  })
  test("input fields", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    expect(document.querySelector("#password")).toBeInTheDocument()
  })
})

describe("Interaction", () => {
  test("confirm password", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    const password = document.querySelector("#password")
    const btn = document.querySelector("#confirmPassword")

    expect(btn).toBeDisabled()
    await act(async () => {
      await user.type(password, "ahmed")
    })
    expect(btn).toBeEnabled()
    await act(async () => {
      await user.click(btn)
    })
  })

  test("toggle password visibility", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AccountInformation />
        </Provider>
      </BrowserRouter>
    )
    const btn = screen.getByTestId("VisibilityIcon")
    await act(async () => {
      await user.click(btn)
    })
  })
})
