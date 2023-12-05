import { screen, render, within, act } from "@testing-library/react"
import ChangeUsername from "./ChangeUsername"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"
import { Provider } from "react-redux"
import store from "../../../store"

describe("Content", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeUsername />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /Change your username/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeUsername />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText(/update your username\./i)).toBeInTheDocument()
  })
  test("input fields", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeUsername />
        </Provider>
      </BrowserRouter>
    )
    expect(document.querySelector("#currentUsername")).toBeInTheDocument()
    expect(document.querySelector("#newUsername")).toBeInTheDocument()
  })
})

describe("Interaction", () => {
  test("working example", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ChangeUsername />
        </Provider>
      </BrowserRouter>
    )
    const newUsername = document.querySelector("#newUsername")
    const btn = document.querySelector("#changeUsernameBtn")

    expect(btn).toBeDisabled()
    await act(async () => {
      await user.type(newUsername, "ahmed")
    })
    expect(btn).toBeEnabled()
    await act(async () => {
      await user.click(btn)
    })
  })
})
