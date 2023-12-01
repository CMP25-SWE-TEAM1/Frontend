import React from "react"

import { screen, render, within, act, fireEvent } from "@testing-library/react"
import SignUp from "../components/Signup/SignUp"
import { BrowserRouter } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"

import { Provider } from "react-redux"
import store from "../store"

import { GoogleOAuthProvider } from "@react-oauth/google"
const clientId = "341526416859-a1u3gf1rl41o6vj5nvl0bs3ac00sljue.apps.googleusercontent.com"

describe("Modal state changes correctly", () => {
  // test("check if modal initially closed", () => {
  //   render(
  //     <BrowserRouter>
  //       <GoogleOAuthProvider clientId={clientId}>
  //         <Provider store={store}>
  //           <Login openModal={false} handleCloseModal={() => {}} setLocation={() => {}} />
  //         </Provider>
  //       </GoogleOAuthProvider>
  //     </BrowserRouter>
  //   )

  //   const closedLoginModal = screen.getByTestId("loginModal")
  //   expect(closedLoginModal).not.toBeInTheDocument()
  // })

  test("Modal can be opened", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const openSignupModal = screen.getByTestId("signupModal")
    expect(openSignupModal).toBeInTheDocument()
  })
})

describe("First Page", () => {
  test("Header renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const header = screen.getByRole("heading", {
      name: /join gigachat today/i,
      hidden: true,
    })
    expect(header).toBeInTheDocument()
  })

  test("Logo renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const logo = screen.getByRole("img", {
      name: /gigachat logo/i,
      hidden: true,
    })
    expect(logo).toBeInTheDocument()
  })

  test("Google login renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const googleLogin = screen.getByRole("button", {
      name: /google logo sign up with google/i,
      hidden: true,
    })
    expect(googleLogin).toBeInTheDocument()
  })

  test("Create account renders correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const createAccount = screen.getByRole("button", {
      name: /create account/i,
      hidden: true,
    })
    expect(createAccount).toBeInTheDocument()

    await userEvent.click(createAccount)
  })
})

describe("Second Page", () => {
  test("Name input", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const nameInput = screen.getByTestId("nameInput")
    expect(nameInput).toBeInTheDocument()

    await userEvent.type(nameInput, "Mohamed")
    expect(nameInput.value).toBe("Mohamed")
  })

  test("Email input", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByTestId("emailInput")
    expect(emailInput).toBeInTheDocument()

    await userEvent.type(emailInput, "Mohamed")
    expect(emailInput.value).toBe("Mohamed")

    // const focusSpy = jest.spyOn(emailInput, "focus")
    // fireEvent.focus(emailInput)
    // expect(focusSpy).toHaveBeenCalled()

    // const blurSpy = jest.spyOn(emailInput, "blur")
    // fireEvent.blur(emailInput)
    //   expect(blurSpy).toHaveBeenCalled()
      
      emailInput.focus()
      emailInput.blur()
    //   jest.spyOn()
  })
})
