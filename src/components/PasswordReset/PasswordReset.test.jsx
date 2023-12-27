import { screen, render, within, act } from "@testing-library/react"
import PasswordReset from "../PasswordReset/PasswordReset"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Text", () => {
  test("first page Heading", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const heading = screen.getByRole("heading", { name: /Find your Gigachat account/i })
    expect(heading).toBeInTheDocument()
  })
  test("Second page heading", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const heading = screen.getByRole("heading", { name: /Confirm your email/i })
    expect(heading).toBeInTheDocument()
  })
  test("Third page heading", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const heading = screen.getByRole("heading", { name: /Where should we send a confirmation code?/i })
    expect(heading).toBeInTheDocument()
  })
  test("Paragraphs", () => {
    const { container } = render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const paragraphs = container.querySelectorAll("p")
    expect(paragraphs).toHaveLength(4)
  })
})

describe("Input fields", () => {
  test("render", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(2)
  })
})

describe("Buttons", () => {
  test("Exit (x) button renders", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const link = screen.getByRole("link", { name: /x/i })
    const btn = within(link).getByRole("button", { name: /x/i })
    expect(btn).toBeInTheDocument()
  })
  test("next page buttons", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const btns = screen.getAllByRole("button", { name: /next/i })
    expect(btns).toHaveLength(3)
  })
})

describe("Functions", () => {
  test("Enable/disable buttons", async () => {
    user.setup()
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    )
    const inputs = screen.getAllByRole("textbox")
    const btns = screen.getAllByRole("button", { name: /next/i })

    expect(btns[0]).toBeDisabled()
    expect(btns[1]).toBeDisabled()

    await act(async () => {
      await user.type(inputs[0], "ahmed")
      await user.type(inputs[1], "ahmed@gmail.com")
    })

    expect(btns[0]).toBeEnabled()
    expect(btns[1]).toBeEnabled()
    expect(btns[2]).toBeEnabled()
  })
})
