import { useEffect } from "react"

const ScrollToBottom = ({ onScrollToBottom }) => {
  let scrolledElement
  let scrollStop = false

  // Function to check if the user has scrolled to the bottom
  const isAtBottom = () => {
    const scrollPosition = scrolledElement.scrollTop
    const totalHeight = scrolledElement.scrollHeight
    const windowHeight = scrolledElement.clientHeight
    const distanceToBottom = totalHeight - scrollPosition - windowHeight
    const threshold = 10

    return distanceToBottom <= threshold
  }

  const handleScroll = () => {
    if (!scrollStop && isAtBottom()) {
      // Trigger the provided callback function
      if (onScrollToBottom) {
        onScrollToBottom()
        scrollStop = true
        setTimeout(() => {
          scrollStop = false
        }, 2000)
      }
    }
  }

  useEffect(() => {
    scrolledElement = document.getElementById("scrolledElement")
    scrolledElement.addEventListener("scroll", handleScroll)

    return () => {
      scrolledElement.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return null
}

export default ScrollToBottom
