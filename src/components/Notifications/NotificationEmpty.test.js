import { render, screen } from "@testing-library/react"
import NotificationEmpty from "./NotificationEmpty"

describe("NotificationEmpty", () => {
  test("renders correctly", () => {
    render(<NotificationEmpty />)

    // Assert that the main text is rendered
    expect(screen.getByText("Nothing to see here — yet")).toBeInTheDocument()

    // Assert that the secondary text is rendered
    expect(screen.getByText(/Likes, mentions, reposts, and a whole lot more/)).toBeInTheDocument()

    // Assert that the "Learn more" link is rendered
    expect(screen.getByText("Learn more")).toBeInTheDocument()
  })
})
