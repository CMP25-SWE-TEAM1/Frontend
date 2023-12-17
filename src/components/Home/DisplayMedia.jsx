import React from 'react'

function DisplayMedia({ mediaUrls, mediaTypes, margin, handleDeleteMedia, showCancelButton}) {
 
  return (
    <div className={`my-1.5 h-[250px] w-full flex flex-wrap ${mediaUrls.length===0? "hidden": ""}`} >
        {mediaUrls.map((item,index)=>{
          return (mediaTypes[index]=== "jpg"?  (<div key={index} className={`${(mediaUrls.length>1)? "w-[50%]":"w-[100%]"} min-w-[50%] min-h-[50%] grow relative`}>
            <img
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[125px]":"h-[250px]"} min-h-[125px] rounded-lg w-full`}
              alt={`media${index}`}
              loading="lazy"
          />
          {showCancelButton&&<div className="absolute top-1 right-1 flex backdrop-blur-sm h-8 w-8 items-center justify-center rounded-full dark:bg-[#474b4f] hover:bg-lightHover dark:hover:bg-darkHover hover:cursor-pointer" onClick={()=>handleDeleteMedia(item,index)}>
        x 
        </div>}
          </div>)
          :
          (<div key={index} className={`${(mediaUrls.length>1)? "w-[50%]":"w-[100%]"} min-w-[50%] min-h-[50%] grow `}>
            <video
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[125px]":"h-[250px]"} min-h-[125px] rounded-lg w-full`}
              alt={`media${index}`}
              loading="lazy"
              controls
          />
          {showCancelButton&&<div className="absolute top-1 right-1 flex backdrop-blur-sm h-8 w-8 items-center justify-center rounded-full dark:bg-[#474b4f] hover:bg-lightHover dark:hover:bg-darkHover hover:cursor-pointer" onClick={()=>handleDeleteMedia(item,index)}>
        x 
        </div>}
          </div>))
          }
          )
        }
        </div>
  )
}

export default DisplayMedia
