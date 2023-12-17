import React from 'react'

const TextInput= (props)=> {
  return (
    <div className={`${props.divcustomizedstyle}`}>
    <input  className={`${props.inputcustomizedstyle} ${props.inputtext === undefined ?  `form-input` : `form-input filled-input` } rounded`}
    autoComplete="off" value={props.inputtext} onChange={(e) => props.setInputtext(e.target.value)}  id={`${props.id}`} type="text"></input>
    <label  className="input-label text-[rgb(113,118,123)] text-[rgb(113,118,123)] top-[15%]"  htmlFor={`${props.id}`}> {props.label}</label>
    </div>
    
  )
}

export default TextInput