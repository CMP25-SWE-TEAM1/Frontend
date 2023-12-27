import NotificationsContainer from "./NotificationsContainer"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { APIs } from "../../constants/signupConstants"
import { setUnseenCount } from "../../store/NotificationSocketSlice"
import { CircularProgress } from "@mui/material"

const All = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const userToken = useSelector((state) => state.user.token)

  const [allNotifications, setAllNotifications] = useState([])
  const [newAllNotifications, setNewAllNotifications] = useState([])

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

  const dispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [finshed, setFinished] = useState(false)

  const fetchNotifications = () => {
    // console.log("fetching new notifications...")

    axios
      .get(APIs.actual.getAllNotifications, {
        params: {
          page: pageNumber,
          count: 10,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        console.log(res.data.data.notifications)
        setNewAllNotifications(res.data.data.notifications)

        if (res.data.data.notifications.length < 10) setFinished(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (finshed === false) {
      setLoading(true)
      fetchNotifications()
    }
  }, [pageNumber])

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
        dispatch(setUnseenCount(0))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const feedRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPageNumber((prevState) => prevState + 1)
        }
      })
    })

    if (feedRef.current) {
      observer.observe(feedRef.current)
      console.log("H")
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    async function handleNotifications() {
      try {
        const promises = newAllNotifications.map((n) => {
          return axios.get(APIs.actual.getProfileByID + n.notifier, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
        })

        const responses = await Promise.all(promises)
        const updatedNotifications = newAllNotifications.map((n, index) => ({
          ...n,
          notifierUser: responses[index].data.user,
        }))

        const t = updatedNotifications
        if (t.length > 0) setAllNotifications((prevState) => [...prevState, ...t])

        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    handleNotifications()
  }, [newAllNotifications])

  return (
    <div className="flex flex-col">
      <NotificationsContainer list={allNotifications} type={"all"} feedRef={feedRef} loading={loading} />
      <CircularProgress className={`${loading ? "" : "hidden"} mt-2 self-center text-sm`} />
    </div>
  )
}

export default All
