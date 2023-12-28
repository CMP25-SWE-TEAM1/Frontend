import { useRef, useState } from "react"
import { Link } from "react-router-dom"

function DisplayMedia({ mediaUrls, mediaTypes, margin, handleDeleteMedia, showCancelButton }) {
  const video = useRef(null)
  const handleVideoPlay = () => {
    if (video.current.paused) {
      video.current.play()
    } else {
      video.current.pause()
    }
  }
  return (
    <Link>
      <div data-testid="displayMedia" className={`my-1.5 flex  flex-wrap  ${mediaUrls.length === 0 ? "hidden" : ""}`}>
        {mediaUrls.map((item, index) => {
          return mediaTypes[index] === "jpg" ? (
            <div key={index} className={`${mediaUrls.length > 1 ? "w-[50%]" : "w-[100%]"} relative h-fit min-h-[50%]  grow`}>
              <img src={item} className={`${mediaUrls.length > 2 ? "max-h-[450px]" : "max-h-[500px]"} min-h-[125px] w-full rounded-lg`} alt={`media${index}`} loading="lazy" />
              {showCancelButton && (
                <div data-testid="showCancelButton" className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(item, index)}>
                  x
                </div>
              )}
            </div>
          ) : (
            <div key={index} className={`${mediaUrls.length > 1 ? "w-[50%] " : "w-[100%]"} min-h-[50%]  grow `}>
              <video src={item} className={`${mediaUrls.length > 2 ? "max-h-[300px]" : "max-h-[500px]"} min-h-[125px] w-full rounded-lg`} alt={`media${index}`} loading="lazy" controls ref={video} onClick={handleVideoPlay} />
              {showCancelButton && (
                <div data-testid="showCancelButton" className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm hover:cursor-pointer hover:bg-lightHover dark:bg-[#474b4f] dark:hover:bg-darkHover" onClick={() => handleDeleteMedia(item, index)}>
                  x
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Link>
  )
}

export default DisplayMedia
