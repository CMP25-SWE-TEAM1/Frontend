import EmojiPicker from "emoji-picker-react"
import { useSelector } from "react-redux"

const ReactEmojiPicker = (props) => {
  const handleAddEmoji = props.handleAddEmoji
  const visibiltyStyle = props.visibiltyStyle

  const darkMode = useSelector((state) => state.theme.darkMode)

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
