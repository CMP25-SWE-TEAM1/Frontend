import React from "react"


import { screen, render, fireEvent, waitFor } from "@testing-library/react"

import Widgets from "../components/Widgets/Widgets"
import WidgetsTrendsContainer from "../components/Widgets/WidgetsTrendsContainer"
import WidgetsTrendComponent from "../components/Widgets/WidgetsTrendComponent"
import WidgetsTrends from "../components/Widgets/WidgetsTrends"


import { Provider } from "react-redux"

import { BrowserRouter } from "react-router-dom"

import store from "../store"

import { GoogleOAuthProvider } from "@react-oauth/google"

const clientId = "341526416859-a1u3gf1rl41o6vj5nvl0bs3ac00sljue.apps.googleusercontent.com"

describe("Widgets render correctly", () => {
  test("search component renders correctly", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Widgets parent={"home"} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const searchComponent = screen.getByRole("combobox")

    expect(searchComponent).toBeInTheDocument()
  })

  test("search component doesn't render from explore", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <Widgets parent={"explore"} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const searchComponent = screen.getByTestId("searchComp")
    expect(searchComponent).toHaveClass("hidden")
  })

  test("Trends container renders correctly", () => {
    const trends = [{ title: "test1", numberOfPosts: "10" }]

    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <WidgetsTrendsContainer data={trends} loading={false} type={"trending"} />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    )

    const trendComp = screen.getByTestId("trendComp")
    expect(trendComp).toBeInTheDocument()
  })

  it("renders correctly", () => {
    const props = {
      index: 1,
      categoray: "SomeCategory",
      name: "#TrendingTopic",
      numberOfPosts: 100,
    }

    render(<WidgetsTrendComponent {...props} />)

    expect(screen.getByText("1. Trending in SomeCategory")).toBeInTheDocument()
    expect(screen.getByText("#TrendingTopic")).toBeInTheDocument()
    expect(screen.getByText("100 posts")).toBeInTheDocument()
  })

  it("navigates to the correct search URL on click", () => {
    const props = {
      index: 1,
      categoray: "SomeCategory",
      name: "#TrendingTopic",
      numberOfPosts: 100,
    }

    render(<WidgetsTrendComponent {...props} />)

    const originalLocation = window.location
    delete window.location
    window.location = { href: "" }

    fireEvent.click(screen.getByTestId("trendComp"))

    expect(window.location.href).toEqual("/search?q=%23TrendingTopic")

    window.location = originalLocation
  })
    
    
})
