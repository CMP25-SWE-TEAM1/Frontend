import { screen, render, within, act } from "@testing-library/react"
import Login from "./Login"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("Text", () => {
    test("first page Heading", () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const heading = screen.getByRole("heading", { name: /log in to gigachat/i })
        expect(heading).toBeInTheDocument()
      })
      test("Second page heading", () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const heading = screen.getByRole('heading', {  name: /enter your password/i})
        expect(heading).toBeInTheDocument()
      })
})

describe("Input fields", () => {
    test("Username in both pages", () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const inputs = screen.getAllByRole('textbox')
        expect(inputs).toHaveLength(2)
      })
    test("Password", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )
      const input = screen.getByLabelText(/password/i)
      expect(input).toBeInTheDocument
    })
})

describe("Buttons", () => {
  test("Exit (x) button renders", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const link = screen.getByRole('link', {  name: /x/i})
    const btn = within(link).getByRole('button', {  name: /x/i})
    expect(btn).toBeInTheDocument()
  })
  test("sign in with google renders", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', {  name: /log in with google/i})
    expect(btn).toBeInTheDocument()
  })
  test("next page button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', {  name: /next/i})
    expect(btn).toBeInTheDocument()
  })
  test("forgot password button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', {  name: /forgot password\?/i})
    expect(btn).toBeInTheDocument()
  })
  test("Log in button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', { name: "Log in"})
    expect(btn).toBeInTheDocument()
  })
  
})

describe("Links", () => {
    test("links to sign up", () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const link = screen.getAllByRole('link', {  name: /sign up/i})
        expect(link).toHaveLength(2)
      })
    test("forgot password link", () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const link = screen.getAllByRole('link', {  name: /forgot password\?/i})
        expect(link).toHaveLength(2)
    })
  })

  describe("Functions", () => {
    test("Enable/disable buttons", async () =>{
      user.setup();
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )
      const username = screen.getAllByRole('textbox')[0]
      const password = screen.getByLabelText(/password/i)
      const next = screen.getByRole('button', {  name: "Next"})
      const login = screen.getByRole('button', {  name: "Log in"})
  
      expect(next).toBeDisabled()
      expect(login).toBeDisabled()
      await act(async () => {
        await user.type(username, "ahmed")
        await user.type(password, "1234")
      })
      expect(next).toBeEnabled()
      expect(login).toBeEnabled()
    })
    
  })
