import NotificationsContainer from "./NotificationsContainer"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import { useSelector } from "react-redux"

const Mentions = () => {
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
  return (
    <div>
      <NotificationsContainer list={[]} type={"mentions"}/>
    </div>
  )
}

export default Mentions
