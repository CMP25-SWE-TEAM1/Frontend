import React from "react"

const BioEdit = (props) => {
  return (
    <div id="edit-bio-test" className="input-container mx-auto mb-[2.5%] w-[95%] ">
      <p className="threshold absolute right-[10px] top-[5%]  text-sm text-[rgb(113,118,123)]">
        {props.bio.length}/{160}
      </p>
      <textarea id="BIO" className={`no-scrollbar h-[100px] resize-none text-sm ${props.bio === undefined || props.bio === "" ? `form-input` : `form-input filled-input`} rounded`} autoComplete="off" value={props.bio} onChange={(e) => props.setBio(e.target.value)} maxLength={160}></textarea>
      <label className="input-label text-[rgb(113,118,123)] text-[rgb(113,118,123)] " htmlFor={`${"BIO"}`}>
        {" "}
        Bio
      </label>
    </div>
  )
}

export default BioEdit
