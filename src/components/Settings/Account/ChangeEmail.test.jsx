import React from "react"
import { screen, render, within, act } from "@testing-library/react"
import ChangeEmail from "./ChangeEmail"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"
import { Provider } from "react-redux"
import store from "../../../store"
import axios from "axios"

describe("Content", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /Change your email/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText(/update your email address\./i)).toBeInTheDocument()
  })
  test("input fields", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      </BrowserRouter>
    )
    expect(document.querySelector("#currentEmail")).toBeInTheDocument()
    expect(document.querySelector("#newEmail")).toBeInTheDocument()
  })
})

describe("Interaction", () => {
  test("new email doesn't follow the rules", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      </BrowserRouter>
    )
    const newEmail = document.querySelector("#newEmail")
    const btn = document.querySelector("#changeEmailBtn")

    expect(btn).toBeDisabled()
    await act(async () => {
      await user.type(newEmail, "abc")
    })
    expect(btn).toBeDisabled()
  })

  test("working example", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      </BrowserRouter>
    )
    const newEmail = document.querySelector("#newEmail")
    const btn = document.querySelector("#changeEmailBtn")

    expect(btn).toBeDisabled()
    await act(async () => {
      await user.type(newEmail, "admin@admin.com")
    })
    expect(btn).toBeEnabled()
    await act(async () => {
      await user.click(btn)
    })
  })
})
