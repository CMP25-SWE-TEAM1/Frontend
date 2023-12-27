import { render, screen } from "@testing-library/react"
import ReactEmojiPicker from "./ReactEmojiPicker"
import EmojiPicker from "emoji-picker-react"
import { useSelector } from "react-redux"

// Mock the emoji-picker-react and react-redux
jest.mock("emoji-picker-react")
jest.mock("react-redux")

describe("ReactEmojiPicker", () => {
  test("renders correctly and returns emoji", () => {
    // Mock props
    const props = {
      handleAddEmoji: jest.fn(),
      visibiltyStyle: "block",
    }

    // Mock Redux state
    useSelector.mockReturnValue(false) // Mock darkMode to false

    // Mock EmojiPicker component
    EmojiPicker.mockImplementation(({ onEmojiClick, Theme, emojiStyle, searchPlaceholder, suggestedEmojisMode, skinTonePickerLocation, width, height }) => {
      // Simulate an emoji click
      onEmojiClick({ emoji: "👌" })

      // Assert that EmojiPicker is rendered with the expected props
      expect(Theme).toBe("light")
      expect(emojiStyle).toBe("twitter")
      expect(searchPlaceholder).toBe("Search emojis")
      expect(suggestedEmojisMode).toBe("recent")
      expect(skinTonePickerLocation).toBe("PREVIEW")
      expect(width).toBe(320)
      expect(height).toBe(400)

      return <div data-testid="mock-emoji-picker">Mock Emoji Picker</div>
    })

    // Render the component
    render(<ReactEmojiPicker {...props} />)

    // Assert that the EmojiPicker component is rendered
    expect(screen.getByTestId("mock-emoji-picker")).toHaveStyle({ display: "block" })
    expect(screen.getByTestId("mock-emoji-picker")).toBeInTheDocument()

    // Assert that handleAddEmoji is called with the correct emoji
    expect(props.handleAddEmoji).toHaveBeenCalledWith("👌")

    // Assert that the visibility style is still applied
    expect(screen.getByTestId("mock-emoji-picker")).toBeInTheDocument()
  })
})
