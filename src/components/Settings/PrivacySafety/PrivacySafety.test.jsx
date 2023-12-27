import { screen, render, within, act } from "@testing-library/react"
import PrivacySafety from "./PrivacySafety"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Text", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /privacy and safety/i })).toBeInTheDocument()
  })
  test("main paragragh", () => {
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    expect(screen.getByText(/manage what information you see and share on gigachat\./i)).toBeInTheDocument()
  })
  test("choice headers", () => {
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    expect(screen.getByText(/blocked accounts/i)).toBeInTheDocument()
    expect(screen.getByText(/muted accounts/i)).toBeInTheDocument()
  })
  test("choice paragraghs", () => {
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    expect(screen.getByText(/manage the accounts that you have blocked\./i)).toBeInTheDocument()
    expect(screen.getByText(/manage the accounts that you have muted\./i)).toBeInTheDocument()
  })
})

describe("Links", () => {
  test("blocked accounts link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    const link = screen.getByText(/blocked accounts/i)
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/blocked")
  })
  test("muted accounts link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <PrivacySafety />
      </BrowserRouter>
    )
    const link = screen.getByText(/muted accounts/i)
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/muted")
  })
})
