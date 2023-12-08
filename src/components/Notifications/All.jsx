import NotificationsContainer from "./NotificationsContainer"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import { useSelector } from "react-redux"

import axios from "axios"
import { useEffect } from "react"
import { APIs } from "../../constants/signupConstants"

const All = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const notTest = [
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
    {
      logo: darkMode ? logoDark : logoLight,
      text: "There was a login to your account @MSamir245 from a new device on Dec 02, 2023. Review it now",
    },
  ]

  // useEffect(() => {
  //     axios.get(APIs.actual.getNotifications)
  // },[])

  return (
    <div>
      <NotificationsContainer list={notTest} />
    </div>
  )
}

export default All
