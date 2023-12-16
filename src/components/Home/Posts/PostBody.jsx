import React from 'react'
import DisplayMedia from "../DisplayMedia"

function PostBody({descriptionLines, mediaUrls, mediaTypes}) {
  return (
    <>
      <div className="post-text">
          <div className="max-h-[100px] overflow-hidden text-start dark:text-gray-300 break-words" data-testid="post-text-id">
            {descriptionLines.map((line,index) => (
              <p key={index}>
                {line}
                <br />
              </p>
            ))}
          </div>
        </div>
        <div className="post-media mt-3">
          <DisplayMedia mediaUrls={mediaUrls} mediaTypes={mediaTypes} margin={1} />
        </div>
    </>
  )
}

export default PostBody
