import { screen, render, within, act } from "@testing-library/react"
import Account from "./Account"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Text", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /your account/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    expect(screen.getByText(/see information about your account, download an archive of your data, or learn about your account deactivation options/i)).toBeInTheDocument()
  })
  test("choice headers", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    expect(screen.getByText("Account information")).toBeInTheDocument()
    expect(screen.getByText("Change your password")).toBeInTheDocument()
  })
  test("choice paragraghs", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    expect(screen.getByText(/view and update your account information, like your username and email address\./i)).toBeInTheDocument()
    expect(screen.getByText(/change your password at anytime\./i)).toBeInTheDocument()
  })
})

describe("Links", () => {
  test("account information link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    const link = screen.getByText("Account information")
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/account_information")
  })
  test("change password link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    const link = screen.getByText("Change your password")
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/change_password")
  })
})
