import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ComposePost from './ComposePost'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PostPopup({open,setOpen}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    // const navigate = useNavigate();
    const handleClose = () =>{
      setOpen(false);
    } 
    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: darkMode?'black':'background.paper',
        borderRadius: '20px',
        width: 600,
        boxShadow: darkMode?"0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435":"0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
        border: darkMode?"solid 1px #333435":"",
        p: 1,
      };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ borderRadius: "20px"}}
      >
        <Box sx={style}>
          <ComposePost buttonName="Post"  postType="tweet" handleClosePopup={handleClose}/>
        </Box>
      </Modal>
    </div>
  )
}

export default PostPopup
