import { useRef, useCallback } from "react"
import { EmojiPicker, EmojiPickerRef, throttleIdleTask, unifiedToNative } from "react-twemoji-picker"
import EmojiData from "react-twemoji-picker/data/twemoji.json"
import "react-twemoji-picker/dist/EmojiPicker.css"

const MyEmojiPicker = (props) => {
  // Emoji picker
  //   const picker = useRef(EmojiPickerRef)
  const picker = useRef(null)
  const input = useRef(null)
  const handleAddEmoji = props.handleAddEmoji

  // need reference to same function to throttle
  const throttledQuery = useCallback(
    throttleIdleTask((query) => picker.current?.search(query)),
    [picker.current]
  )

  const inputProps = {
    ref: input,
    placeholder: "Search emojis",
    onChange: (event) => throttledQuery(event.target.value.toLowerCase()),
    onKeyDown: (event) => {
      if (!["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
      picker.current.handleKeyDownScroll(event)
      if (event.key == "Enter" && !event.shiftKey) {
        picker.current.search("")
        input.current.value = ""
      }
    },
  }

  const onEmojiSelect = (emoji) => {
    const nativeEmoji = unifiedToNative(emoji.unicode)
    // invoke add emoji function with (nativeEmoji)
    handleAddEmoji(nativeEmoji)
    // console.log(emoji)
    console.log(nativeEmoji)
  }

  const emojiPickerProps = {
    ref: picker,
    emojiData: EmojiData,
    onEmojiSelect,
    showNavbar: true,
    showFooter: true,
    collapseHeightOnSearch: false,
  }

  const handleSearch = (query) => picker.current.search(query)

  const emojiData = Object.freeze(EmojiData)
  const handleEmojiSelect = (emoji) => console.log(emoji)

  return (
    <div className="giga-emoji-picker">
      <EmojiPicker ref={picker} emojiData={emojiData} handleEmojiSelect={handleEmojiSelect} {...emojiPickerProps} />
      <input ref={input} onChange={(event) => handleSearch(event.target.value)} placeholder="search" {...inputProps} />
    </div>
  )
}

export default MyEmojiPicker
