import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ComposePost from './ComposePost'
import { useNavigate } from "react-router-dom"

function PostPopup({open}) {
    const navigate = useNavigate();
    const handleClose = () =>{
      navigate('/home');
    } 
    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        border: '0px',
        width: 600,
        boxShadow: 24,
        p: 1,
      };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ borderRadius: "20px" }}
      >
        <Box sx={style}>
          <ComposePost buttonName="Post"  postType="tweet" handleClosePopup={handleClose}/>
        </Box>
      </Modal>
    </div>
  )
}

export default PostPopup
