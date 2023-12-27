import { render, screen } from "@testing-library/react"
import Message from "./Message"

describe("A message testing", () => {
  test("renders correctly", () => {
    render(<Message messageId="1" messageText="Just find me" messageMeta="2023-12-16T01:17:40.814Z" messageDirection="R" />)

    expect(screen.getByRole("message")).toBeInTheDocument()
    // Message text
    expect(screen.getByText(/Just find me/i)).toBeInTheDocument()
    // Message metadata
    expect(screen.getByRole("message-metadata")).toBeInTheDocument()
    // expect(screen.getByText(/December 16, 2023, 1:17 AM/i)).toBeInTheDocument() // currentTime effect!!
  })
})
