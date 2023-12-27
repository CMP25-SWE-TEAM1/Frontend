import { render, screen, fireEvent, act } from "@testing-library/react"
import MessageTools from "./MessageTools"
import copyToClipboard from "copy-to-clipboard"

// Mock the copy-to-clipboard library
jest.mock("copy-to-clipboard")

describe.only("MessageTools testing", () => {
  test("renders successfully", () => {
    // Mock props
    const props = {
      messageId: "123",
      messageMedia: "www.website.com/mediaLink.jpg",
      messageText: "Just find me",
      hideMsgTools: jest.fn(),
      msgToolsPositionX: "L",
      msgToolsPositionY: "T",
      visibiltyStyle: "block",
    }

    // Render the component
    render(<MessageTools {...props} />)

    // Assert that the message tools is initially visible
    expect(screen.getByTestId("message-tools")).toHaveStyle({ display: "block" })
  })

  test("copy-to-clipboard successfully", () => {
    // Mock props
    const props = {
      messageId: "123",
      messageMedia: "www.website.com/mediaLink.jpg",
      messageText: "Just find me",
      hideMsgTools: jest.fn(),
      msgToolsPositionX: "L",
      msgToolsPositionY: "T",
      visibiltyStyle: "block",
    }

    // Render the component
    render(<MessageTools {...props} />)

    // Simulate a click on the copy tool
    fireEvent.click(screen.getByText("Copy message"))

    // Assert that the hideMsgTools function is called
    expect(props.hideMsgTools).toHaveBeenCalled()

    // Assert that copyToClipboard is called with the expected text
    expect(copyToClipboard).toHaveBeenCalledWith("Just find me\nwww.website.com/mediaLink.jpg")

    // wait for the alert to appear
    act(() => jest.advanceTimersByTime(1))

    // Assert that "Copied to clipboard" alert is visible
    expect(screen.getByText("Copied to clipboard")).toBeInTheDocument()
  })
})
