import React, { useEffect } from "react"

import { screen, render, within, act, fireEvent } from "@testing-library/react"

import SignUp from "../components/Signup/SignUp"
import FirstStep from "../components/Signup/FirstStep"
import { BrowserRouter } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"

import { Provider } from "react-redux"
import { useSelector } from "react-redux"

import store from "../store"

import { GoogleOAuthProvider } from "@react-oauth/google"
const clientId = "341526416859-a1u3gf1rl41o6vj5nvl0bs3ac00sljue.apps.googleusercontent.com"

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}))

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
  // jest.mock("react-redux", () => ({
  //   ...jest.requireActual("react-redux"),
  //   useSelector: jest.fn(),
  // }))

  afterEach(() => {
    jest.resetAllMocks()
  })

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

    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    // const focusSpy = jest.spyOn(emailInput, "focus")
    // fireEvent.focus(emailInput)
    // expect(focusSpy).toHaveBeenCalled()

    // const blurSpy = jest.spyOn(emailInput, "blur")
    // fireEvent.blur(emailInput)
    //   expect(blurSpy).toHaveBeenCalled()

    await emailInput.focus()
    await emailInput.blur()
  })
  test("Date changes correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )
    const next = screen.getByTestId("firstPageNext")
    expect(next).toBeInTheDocument()

    const nameInput = screen.getByTestId("nameInput")
    await userEvent.type(nameInput, "Mohamed")
    expect(nameInput.value).toBe("Mohamed")

    const emailInput = screen.getByTestId("emailInput")
    await userEvent.type(emailInput, "mohamedsamir2452001@gmail.com")
    expect(emailInput.value).toBe("mohamedsamir2452001@gmail.com")

    const monthView = screen.getByTestId("monthSelect")

    const monthList = within(monthView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(monthList)
    const monthOption = screen.getByTestId(/january/i)
    expect(monthOption).toBeInTheDocument()

    expect(monthOption.selected).toBe(false)
    await userEvent.click(monthOption)
    expect(monthOption.selected).toBe(true)

    const dayView = screen.getByTestId("daySelect")

    const dayList = within(dayView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(dayList)
    const dayOption = screen.getByTestId(1)
    expect(dayOption).toBeInTheDocument()

    expect(dayOption.selected).toBe(false)
    await userEvent.click(dayOption)
    expect(dayOption.selected).toBe(true)

    const yearView = screen.getByTestId("yearSelect")

    const yearList = within(yearView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(yearList)
    const yearOption = screen.getByTestId(2001)
    expect(yearOption).toBeInTheDocument()

    expect(yearOption.selected).toBe(false)
    await userEvent.click(yearOption)
    expect(yearOption.selected).toBe(true)

    expect(next).toBeEnabled()

    await userEvent.click(next)
  })

  test("Date lightmode correctly", async () => {
    // jest.doMock("react-redux", () => ({
    //   ...jest.requireActual("react-redux"),
    //   useSelector: jest.fn(),
    // }))

    // jest.mock("react-redux", () => ({
    //   ...jest.requireActual("react-redux"),
    //   useSelector: jest.fn(),
    // }))

    useSelector.mockReturnValue({ theme: { darkMode: false } })

    // jest.doMock("react-redux", () => ({
    //   ...jest.requireActual("react-redux"),
    //   useSelector: jest.fn().mockReturnValue({ theme: { darkMode: false } }),
    // }))

    const SignUp = require("../components/Signup/SignUp").default

    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )
    const next = screen.getByTestId("firstPageNext")
    expect(next).toBeInTheDocument()

    const nameInput = screen.getByTestId("nameInput")
    await userEvent.type(nameInput, "Mohamed")
    expect(nameInput.value).toBe("Mohamed")

    const emailInput = screen.getByTestId("emailInput")
    await userEvent.type(emailInput, "mohamedsamir2452001@gmail.com")
    expect(emailInput.value).toBe("mohamedsamir2452001@gmail.com")

    const monthView = screen.getByTestId("monthSelect")

    const monthList = within(monthView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(monthList)
    const monthOption = screen.getByTestId(/january/i)
    expect(monthOption).toBeInTheDocument()

    expect(monthOption.selected).toBe(false)
    await userEvent.click(monthOption)
    expect(monthOption.selected).toBe(true)

    const dayView = screen.getByTestId("daySelect")

    const dayList = within(dayView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(dayList)
    const dayOption = screen.getByTestId(1)
    expect(dayOption).toBeInTheDocument()

    expect(dayOption.selected).toBe(false)
    await userEvent.click(dayOption)
    expect(dayOption.selected).toBe(true)

    const yearView = screen.getByTestId("yearSelect")

    const yearList = within(yearView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(yearList)
    const yearOption = screen.getByTestId(2001)
    expect(yearOption).toBeInTheDocument()

    expect(yearOption.selected).toBe(false)
    await userEvent.click(yearOption)
    expect(yearOption.selected).toBe(true)

    expect(next).toBeEnabled()

    await userEvent.click(next)
  })

  test("Date dark correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <SignUp openModal={true} handleCloseModal={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )
    const next = screen.getByTestId("firstPageNext")
    expect(next).toBeInTheDocument()

    const nameInput = screen.getByTestId("nameInput")
    await userEvent.type(nameInput, "Mohamed")
    expect(nameInput.value).toBe("Mohamed")

    const emailInput = screen.getByTestId("emailInput")
    await userEvent.type(emailInput, "mohamedsamir2452001@gmail.com")
    expect(emailInput.value).toBe("mohamedsamir2452001@gmail.com")

    const monthView = screen.getByTestId("monthSelect")

    const monthList = within(monthView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(monthList)
    const monthOption = screen.getByTestId(/january/i)
    expect(monthOption).toBeInTheDocument()

    expect(monthOption.selected).toBe(false)
    await userEvent.click(monthOption)
    expect(monthOption.selected).toBe(true)

    const dayView = screen.getByTestId("daySelect")

    const dayList = within(dayView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(dayList)
    const dayOption = screen.getByTestId(1)
    expect(dayOption).toBeInTheDocument()

    expect(dayOption.selected).toBe(false)
    await userEvent.click(dayOption)
    expect(dayOption.selected).toBe(true)

    const yearView = screen.getByTestId("yearSelect")

    const yearList = within(yearView).getByRole("combobox", {
      hidden: true,
    })

    await userEvent.click(yearList)
    const yearOption = screen.getByTestId(2001)
    expect(yearOption).toBeInTheDocument()

    expect(yearOption.selected).toBe(false)
    await userEvent.click(yearOption)
    expect(yearOption.selected).toBe(true)

    expect(next).toBeEnabled()

    await userEvent.click(next)
  })

  test("Email exist error", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <FirstStep nickName={"nickName"} setNickName={() => {}} email={""} setEmail={() => {}} month={""} setMonth={() => {}} day={""} setDay={() => {}} year={""} setYear={() => {}} nextShow={() => {}} emailExistError={true} setEmailExistError={() => {}} validEmail={() => {}} mock={true} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const nameInput = screen.getByTestId("nameInput")
    expect(nameInput).toBeInTheDocument()
  })
})
