import NotificationsContainer from "./NotificationsContainer"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import { useSelector } from "react-redux"

import axios from "axios"
import { useEffect, useState } from "react"
import { APIs } from "../../constants/signupConstants"

const All = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const userToken = useSelector((state) => state.user.token)

  const [allNotifications, setAllNotifications] = useState([])

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

  useEffect(() => {
    axios
      .get(APIs.actual.getAllNotifications, {
        params: {
          page: 1,
          count: 1000,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.notifications)
        setAllNotifications(res.data.data.notifications)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .post(
        APIs.actual.markNotificationSeen,
        {},
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      )
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <NotificationsContainer list={allNotifications} type={"all"} />
    </div>
  )
}

export default All
