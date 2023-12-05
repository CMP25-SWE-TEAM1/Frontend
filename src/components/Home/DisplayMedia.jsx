import React from 'react'

function DisplayMedia({mediaUrls, mediaTypes, margin}) {
  console.log(mediaTypes)
  return (
    <div className={`mb-1.5 h-[250px] w-full flex flex-wrap ${mediaUrls.length===0? "hidden": ""}`} >
        {mediaUrls.map((item,index)=>{
          return (mediaTypes[index]=== "jpg"?  (<div className={`m-${margin} min-w-[46%] min-h-[46%] grow `}>
            <img
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[124px]":"h-[248px]"} h-min-[124px] grow rounded-lg`}
              alt={`media${index}`}
              loading="lazy"
          />
          </div>)
          :
          (<div className={`m-${margin} min-w-[46%] min-h-[46%] grow `}>
            <video
              src= {item}
              className={`${(mediaUrls.length>2)? "h-[124px]":"h-[248px]"} h-min-[124px] grow rounded-lg`}
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
