import React from 'react'
import Birthdate from '../../Signup/Birthdate'
import Alert from "@mui/material/Alert"
import { styles } from "../../../styles.js"
const EditDate=({selectdatedisplay,setSelectdatedisplay,htmldate,month,setMonth,day,setDay,year,setYear})=> {
  
  return (
     <div className="relative flex flex-col  mb-[2.5%] mx-auto w-[95%]">
            <div className="flex flex-row  space-x-[10px] text-[rgb(113,118,123)]">
              <p >
                Birth date 
              </p>
              <p className="relative top-[-3px]">.</p>
              <button type="button" className={`${`${!selectdatedisplay? 'block': 'hidden' }`} bg-transparent text-[rgb(29,155,240)] hover:underline decoration-solid`} onClick={()=>{
                setSelectdatedisplay(true)
              }}>
                Edit
              </button>
              <button type="button" className={`${`${selectdatedisplay? 'block': 'hidden' }`} bg-transparent text-[rgb(29,155,240)] hover:underline decoration-solid`} onClick={()=>{
                setSelectdatedisplay(false)
              }}>
                Cancel
              </button>
            </div>
            <div className={`${!selectdatedisplay? 'block': 'hidden'} mb-[10%]`}>
              <p className="font-light text-xl">{htmldate}</p>
            </div>
          <div className={`${selectdatedisplay? 'block': 'hidden' } mb-[10%]`}>
          <Birthdate month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} yearwidth={"150px"} monthwidth={"300px"}></Birthdate>
          </div>
          <Alert severity="error" className={`${2023-year < 18 ? "absolute" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              The age can't be less than 18 Years
            </Alert>
          </div>
  )
}

export default EditDate