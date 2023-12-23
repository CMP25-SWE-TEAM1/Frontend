import React from 'react'

const BioEdit=(props)=> {
  return (
    <div className="input-container mb-[2.5%] mx-auto w-[95%] ">
          <p  className='threshold absolute right-[10px] text-[rgb(113,118,123)]  text-sm top-[5%]'>{props.bio.length}/{160}</p>
          <textarea id="BIO" className={`text-sm resize-none no-scrollbar h-[100px] ${props.bio === undefined || props.bio === "" ?  `form-input` : `form-input filled-input` } rounded`}
          autoComplete="off" value={props.bio} onChange={(e) => props.setBio(e.target.value)}  maxLength={160}    ></textarea>
          <label  className="input-label text-[rgb(113,118,123)] text-[rgb(113,118,123)] "   htmlFor={`${"BIO"}`}> Bio</label>
    </div>
  )
}

export default BioEdit