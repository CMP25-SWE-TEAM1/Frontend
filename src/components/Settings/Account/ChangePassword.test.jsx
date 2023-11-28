import { screen, render, within, act } from "@testing-library/react"
import ChangePassword from "./ChangePassword"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Content", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /change your password/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    expect(screen.getByText(/change your password at any time\./i)).toBeInTheDocument()
  })
  test("input fields", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    expect(document.querySelector("#currentPassword")).toBeInTheDocument()
    expect(document.querySelector("#newPassword")).toBeInTheDocument()
    expect(document.querySelector("#confirmPassword")).toBeInTheDocument()
  })
  test("password checks", () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    expect(screen.getByText(/require uppercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/require lowercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/require special character !@#\$%\^&\*\(\)/i)).toBeInTheDocument()
    expect(screen.getByText(/require number/i)).toBeInTheDocument()
    expect(screen.getByText(/require at least 8 characters/i)).toBeInTheDocument()
  })
})

describe("Interaction", () => {
  test("forgot password link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    const link = screen.getByRole("link", { name: /forgot password\?/i })
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/password_reset")
  })
  test("new password doesn't follow the rules", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    const currentPassword = document.querySelector("#currentPassword")
    const newPassword = document.querySelector("#newPassword")
    const confirmPassword = document.querySelector("#confirmPassword")
    const btn = document.querySelector("#changePasswordBtn")

    expect(btn).toBeDisabled()

    await act(async () => {
        await user.type(currentPassword, "123")
        await user.type(newPassword, "1234")
        await user.type(confirmPassword, "1234")
      })
      expect(btn).toBeDisabled()
  })
  test("confirm doesn't match the new password", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    const currentPassword = document.querySelector("#currentPassword")
    const newPassword = document.querySelector("#newPassword")
    const confirmPassword = document.querySelector("#confirmPassword")
    const btn = document.querySelector("#changePasswordBtn")

    expect(btn).toBeDisabled()

    await act(async () => {
        await user.type(currentPassword, "123")
        await user.type(newPassword, "#Ea12345")
        await user.type(confirmPassword, "1234")
      })
      expect(btn).toBeEnabled()
      await act(async () => {
        await user.click(btn)
      })
      expect(screen.getByText(/new password doesn't match confirmation/i)).toBeInTheDocument()
  
  })
  test("working example", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    const currentPassword = document.querySelector("#currentPassword")
    const newPassword = document.querySelector("#newPassword")
    const confirmPassword = document.querySelector("#confirmPassword")
    const btn = document.querySelector("#changePasswordBtn")

    expect(btn).toBeDisabled()
    await act(async () => {
      await user.type(currentPassword, "#Ea12345")
      await user.type(newPassword, "#Ea123456")
      await user.type(confirmPassword, "#Ea123456")
    })
    expect(btn).toBeEnabled()
    await act(async () => {
      await user.click(btn)
    })
  })
})
