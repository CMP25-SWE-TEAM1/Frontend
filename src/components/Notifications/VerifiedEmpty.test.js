import { render, screen } from "@testing-library/react"
import VerifiedEmpty from "./VerifiedEmpty"

describe("VerifiedEmpty", () => {
  test("renders correctly", () => {
    render(<VerifiedEmpty />)

    // Assert that the image is rendered
    expect(screen.getByAltText("nothing")).toBeInTheDocument()

    // Assert that the NotificationEmpty component is rendered
    expect(screen.getByText("Nothing to see here — yet")).toBeInTheDocument()
  })
})
