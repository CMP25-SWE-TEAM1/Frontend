import EmojiPicker from "emoji-picker-react"

const ReactEmojiPicker = (props) => {
  const handleAddEmoji = props.handleAddEmoji
  const visibiltyStyle = props.visibiltyStyle

  const onEmojiClick = (emojiData) => {
    handleAddEmoji(emojiData.emoji)
  }
  const pickerProps = {
    onEmojiClick,
    Theme: "auto",
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
