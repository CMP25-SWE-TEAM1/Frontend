import { useSelector } from "react-redux"
import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import NotificationsContainer from "./NotificationsContainer"

const Verified = () => {
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
      <NotificationsContainer list={[]} type={"verified"} />
    </div>
  )
}

export default Verified
