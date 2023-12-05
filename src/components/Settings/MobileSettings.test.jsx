import { screen, render, within, act } from "@testing-library/react"
import MobileSettings from "./MobileSettings"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Content", () => {
  test("main header", () => {
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    expect(screen.getByRole("heading", { name: /settings/i })).toBeInTheDocument()
  })
  test("choices", () => {
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    expect(screen.getByText(/your account/i)).toBeInTheDocument()
    expect(screen.getByText(/privacy and safety/i)).toBeInTheDocument()
    expect(screen.getByText(/accessibility, display, and languages/i)).toBeInTheDocument()
  })
})

describe("Interaction", () => {
  test("account link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    const link = screen.getByText(/your account/i)
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/account")
  })
  test("privacy and safety link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    const link = screen.getByText(/privacy and safety/i)
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/privacy_and_safety")
  })
  test("display link", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    const link = screen.getByText(/accessibility, display, and languages/i)
    await act(async () => {
      await user.click(link)
    })
    expect(window.location.pathname).toBe("/settings/accessibility_display_and_languages")
  })
  test("select when already selected", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <MobileSettings />
      </BrowserRouter>
    )
    const link = screen.getByText(/privacy and safety/i)
    const link2 = screen.getByText(/accessibility, display, and languages/i)
    await act(async () => {
      await user.click(link)
      await user.click(link2)
    })
    expect(window.location.pathname).toBe("/settings/accessibility_display_and_languages")
  })
})
