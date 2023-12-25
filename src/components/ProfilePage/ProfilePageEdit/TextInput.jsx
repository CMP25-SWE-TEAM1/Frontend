import React from 'react'

const TextInput= (props)=> {
  
  return (
    <div id={props.id} className={`${props.divcustomizedstyle}`}>
      <p  className='threshold absolute right-[10px] text-[rgb(113,118,123)]  text-sm top-[5%]'>{props.inputtext.length}/{props.max}</p>
    <input  className={`${props.inputcustomizedstyle} break-words ${props.inputtext === undefined || props.inputtext === "" ?  `form-input` : `form-input filled-input` } rounded`}
    autoComplete="off" value={props.inputtext} onChange={(e) => props.setInputtext(e.target.value)} maxLength={props.max}  id={`${props.id}`} type="text"></input>
    <label  className="input-label text-[rgb(113,118,123)] text-[rgb(113,118,123)] "   htmlFor={`${props.id}`}> {props.label}</label>
    </div>
    
  )
}

export default TextInput