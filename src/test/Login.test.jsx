import React from "react"

import { screen, render, within, act } from "@testing-library/react"
import Login from "../components/Login/Login"
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
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const openLoginModal = screen.getByTestId("loginModal")
    expect(openLoginModal).toBeInTheDocument()
  })
})

describe("First page", () => {
  test("Header renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const header = screen.getByRole("heading", {
      name: /log in to gigachat/i,
      hidden: true,
    })
    expect(header).toBeInTheDocument()
  })

  test("Logo renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
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
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
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

  test("Email input renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    expect(emailInput).toBeInTheDocument()
  })

  test("Forget password button renders correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const forgetPassword = screen.getByRole("button", {
      name: /forgot password\?/i,
      hidden: true,
    })
    expect(forgetPassword).toBeInTheDocument()
    await userEvent.click(forgetPassword)
  })

  test("Signup button renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const signup = screen.getByRole("link", {
      name: /sign up/i,
      hidden: true,
    })
    expect(signup).toBeInTheDocument()
  })

  test("Next & writing email work correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    expect(emailInput).toBeInTheDocument()

    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    expect(next).toBeInTheDocument()
    expect(next).toBeDisabled()

    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")
    expect(next).toBeEnabled()
  })
})

describe("Second page", () => {
  test("Header renders correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    await userEvent.click(next)

    const header = screen.getByRole("heading", {
      name: /enter your password/i,
      hidden: true,
    })
    expect(header).toBeInTheDocument()
  })

  test("Email renders correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    await userEvent.click(next)

    const emailInput2 = screen.getByTestId("emailInput")
    expect(emailInput2).toBeInTheDocument()
    expect(emailInput2.value).toBe(emailInput.value)
  })

  test("Password input renders and works correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    await userEvent.click(next)

    const password = screen.getByLabelText(/password/i)
    expect(password).toBeInTheDocument()

    await userEvent.type(password, "Admin@123")
    expect(password.value).toBe("Admin@123")
    expect(password).toHaveAttribute("type", "password")

    const visibilityIcon = screen.getByTestId("VisibilityIcon")
    expect(visibilityIcon).toBeInTheDocument()

    await userEvent.click(visibilityIcon)
    expect(password).toHaveAttribute("type", "text")
  })

  test("Forget password works correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const forgetPassword = screen.getByTestId("forgetPassword")
    expect(forgetPassword).toBeInTheDocument()

    await userEvent.click(forgetPassword)
  })

  test("Login button renders correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    await userEvent.click(next)

    const password = screen.getByLabelText(/password/i)
    expect(password).toBeInTheDocument()

    const login = screen.getByRole("button", {
      name: /log in/i,
      hidden: true,
    })
    expect(login).toBeInTheDocument()
    expect(login).toBeDisabled()

    await userEvent.type(password, "Admin@123")
    expect(password.value).toBe("Admin@123")
    expect(login).toBeEnabled()
  })
})

describe("Login Process", () => {
  test("Login correctly", async () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const emailInput = screen.getByRole("textbox", {
      name: /phone, email or username phone, email or username/i,
      hidden: true,
    })
    const next = screen.getByRole("button", {
      name: /next/i,
      hidden: true,
    })
    await userEvent.type(emailInput, "bufyoviydu@gufum.com")
    expect(emailInput.value).toBe("bufyoviydu@gufum.com")

    await userEvent.click(next)

    const password = screen.getByLabelText(/password/i)
    expect(password).toBeInTheDocument()

    const login = screen.getByRole("button", {
      name: /log in/i,
      hidden: true,
    })
    expect(login).toBeInTheDocument()

    await userEvent.type(password, "Admin@123")
    expect(password.value).toBe("Admin@123")
    expect(login).toBeEnabled()

    // const currentURL = window.history.location
    // console.log(currentURL)
    // expect(currentURL).toBe("/")

    await userEvent.click(login)

    // const currentURL = window.history.location.pathname
    // expect(currentURL).toBe("/home")
  })
})

// describe("Validating input", () => {
//   test("Email existance check", async () => {

//     render(
//       <BrowserRouter>
//         <GoogleOAuthProvider clientId={clientId}>
//           <Provider store={store}>
//             <Login openModal={true} handleCloseModal={() => {}} setLocation={() => {}} />
//           </Provider>
//         </GoogleOAuthProvider>
//       </BrowserRouter>
//     )
//     const emailInput = screen.getByRole("textbox", {
//       name: /phone, email or username phone, email or username/i,
//       hidden: true,
//     })
//     const next = screen.getByRole("button", {
//       name: /next/i,
//       hidden: true,
//     })
//     await userEvent.type(emailInput, "bufyoviydu@gufum.co")
//     expect(emailInput.value).toBe("bufyoviydu@gufum.co")

//     const emailError = screen.getByTestId("emailExistError")
//     expect(emailError).not.toHaveClass("hidden")

//     await userEvent.click(next)

//   })
// })
