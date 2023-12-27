// Components
import EmojiPicker from "emoji-picker-react"
// Redux
import { useSelector } from "react-redux"

/**
 * Generates a React component for an emoji picker.
 *
 * @param {Object} props - The props object containing the handleAddEmoji and visibiltyStyle properties.
 * @return {ReactNode} The rendered EmojiPicker component.
 */
const ReactEmojiPicker = (props) => {
  // ==============  Props   ==============
  const handleAddEmoji = props.handleAddEmoji
  const visibiltyStyle = props.visibiltyStyle

  // ==============  Redux   ==============
  const darkMode = useSelector((state) => state.theme.darkMode)

  // ==============  Functions   ==============
  const onEmojiClick = (emojiData) => {
    handleAddEmoji(emojiData.emoji)
  }
  const pickerProps = {
    onEmojiClick,
    Theme: darkMode ? "dark" : "light",
    emojiStyle: "twitter",
    searchPlaceholder: "Search emojis",
    suggestedEmojisMode: "recent",
    skinTonePickerLocation: "PREVIEW",
    width: 320,
    height: 400,
  }
  return (
    <div className="giga-emoji-picker" style={{ display: visibiltyStyle }}>
      <EmojiPicker {...pickerProps} />
    </div>
  )
}

export default ReactEmojiPicker
