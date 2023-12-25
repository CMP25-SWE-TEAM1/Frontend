// How to use
// <div className={`${loading ? "flex justify-center" : ""}`}>
//     <Loading loading={loading}/>
//     {!Loading &&
//          ..your_component
//      }
// </div>

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const Loading = ({ loading }) => {
  return (
    <Box
      sx={{
        display: loading ? "flex" : "none",
        marginTop: 3,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
