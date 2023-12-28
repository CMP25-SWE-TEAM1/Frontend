import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../store"

import NotificationComponent from "./NotificationComponent"

describe("NotificationComponent", () => {
  // Mock props
  const Props = {
    logo: "path/to/logo.jpg",
    type: "like",
    text: "somebody liked your post",
    date: "2023-12-27T12:34:56.789Z",
    notifier: { username: "nobody", nickname: "somebody" },
  }

  test("renders with the correct content and handles click", () => {
    // Render the component
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NotificationComponent {...Props} />
        </Provider>
      </BrowserRouter>
    )

    // Assert that the notification type icon is rendered
    expect(screen.getByTestId("notification-icon")).toBeInTheDocument()

    // Assert that the Avatar is rendered
    expect(screen.getByAltText("j")).toBeInTheDocument()
  })
})
