import { Box, Modal } from '@mui/material';
import {React,useState,useEffect} from 'react'
function CoverImage(banner_image) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    function coverpagehandle()
    {
        
    }
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }
  
      window.addEventListener("resize", handleResize)
  
      // Remove the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])
    const modalStyle = {
    position: "absolute",

    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }
  return (
    
    <div id="cover-page" className={ `w-[100%] md:h-[50%] lg:h-[75%]   ` }>
    <img className="w-[100%] h-[100%] object-fill" 
    src={require("../../assets/pexels-aphiwat-chuangchoem-358904.jpg")} alt="cover-page" onClick={()=>{coverpagehandle()}}></img>
    {/*here should be banenr_image*/}
    </div>
  )
}

export default CoverImage;