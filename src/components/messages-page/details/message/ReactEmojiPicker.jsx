import EmojiPicker from "emoji-picker-react"

const ReactEmojiPicker = (props) => {
  const handleAddEmoji = props.handleAddEmoji

  const onEmojiClick = (emojiData) => {
    console.log(emojiData.emoji)
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
    <div className="giga-emoji-picker">
      <EmojiPicker {...pickerProps} />
    </div>
  )
}

export default ReactEmojiPicker
