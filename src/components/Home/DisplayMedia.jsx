import React from 'react'

function DisplayMedia({mediaUrls, mediaTypes, margin}) {
  
  return (
    <div className={`my-1.5 h-[250px] w-full flex flex-wrap ${mediaUrls.length===0? "hidden": ""}`} >
        {mediaUrls.map((item,index)=>{
          return (mediaTypes[index]=== "jpg"?  (<div className={`${(mediaUrls.length>1)? "w-[50%]":"w-[100%]"} min-w-[50%] min-h-[50%] grow`}>
            <img
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[125px]":"h-[250px]"} min-h-[125px] rounded-lg w-full`}
              alt={`media${index}`}
              loading="lazy"
          />
          </div>)
          :
          (<div className={`${(mediaUrls.length>1)? "w-[50%]":"w-[100%]"} min-w-[50%] min-h-[50%] grow `}>
            <video
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[125px]":"h-[250px]"} min-h-[125px] rounded-lg w-full`}
              alt={`media${index}`}
              loading="lazy"
              controls
          />
          </div>))
          }
          )
        }
        </div>
  )
}

export default DisplayMedia
