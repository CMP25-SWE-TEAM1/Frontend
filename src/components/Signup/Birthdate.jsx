import { Box } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import React from "react"

import { last120Years, days, months } from "../../constants/index.js"

import { useSelector } from "react-redux"


/**
 * Generates Birthdate component which enables users to select their birthdate through separate month, day, and year dropdown fields.
 *
 * @component
 */
const Birthdate = ({ month, setMonth, day, setDay, year, setYear, yearwidth, monthwidth }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }

  const handleChangeMonth = (event) => {
    setMonth(event.target.value)
  }

  const handleChangeDay = (event) => {
    setDay(event.target.value)
  }

  return (
    <div className="date flex">
      <Box sx={{ minWidth: 120 }} className="month">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 120,
          }}
        >
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            data-testid="monthSelect"
            value={month}
            label="Age"
            onChange={handleChangeMonth}
            sx={{
              width: monthwidth,
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
                  padding: "1px 10px",
                  ":hover": {
                    backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                  },
                },
                ".MuiList-root": {
                  padding: 0,
                },
                ".MuiMenuItem-root.Mui-selected": {
                  bgcolor: darkMode ? "white" : "black",
                  color: !darkMode ? "white" : "black",
                },
              },
            }}
          >
            {months.map((month) => (
              <MenuItem value={month} key={month} data-testid={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }} className="day">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 100,
            padding: "0 10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            data-testid="daySelect"
            value={day}
            label="Day"
            onChange={handleChangeDay}
            sx={{
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
                  padding: "1px 10px",
                  ":hover": {
                    backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                  },
                },
                ".MuiList-root": {
                  padding: 0,
                },
                ".MuiMenuItem-root.Mui-selected": {
                  bgcolor: darkMode ? "white" : "black",
                  color: !darkMode ? "white" : "black",
                },
              },
            }}
          >
            {days.map((day) => (
              <MenuItem value={day} key={day} data-testid={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }} className="year">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 100,
            paddingLeft: 0,
          }}
        >
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            data-testid="yearSelect"
            value={year}
            label="Year"
            onChange={handleChangeYear}
            sx={{
              width: yearwidth,
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
                  padding: "1px 10px",
                  ":hover": {
                    backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                  },
                },
                ".MuiList-root": {
                  padding: 0,
                },
                ".MuiMenuItem-root.Mui-selected": {
                  bgcolor: darkMode ? "white" : "black",
                  color: !darkMode ? "white" : "black",
                },
              },
            }}
          >
            {last120Years.map((year) => (
              <MenuItem value={year} key={year} data-testid={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

// Birthdate.propTypes = {
//   /**
//    * Initial selected month
//    */
//   month: React.PropTypes.string,

//   /**
//    * Function to update the selected month
//    */
//   setMonth: React.PropTypes.func,

//   /**
//    * Initial selected day
//    */
//   day: React.PropTypes.string,

//   /**
//    * Function to update the selected day
//    */
//   setDay: React.PropTypes.func,

//   /**
//    * Initial selected year
//    */
//   year: React.PropTypes.string,

//   /**
//    * Function to update the selected year
//    */
//   setYear: React.PropTypes.func,

//   /**
//    * Width of the year select field
//    */
//   yearwidth: React.PropTypes.number,

//   /**
//    * Width of the month select field
//    */
//   monthwidth: React.PropTypes.number,
// }

export default Birthdate
