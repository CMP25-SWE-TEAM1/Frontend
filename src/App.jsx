import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"

const App = () => {
  return (
    <div className="app flex ml-auto mr-auto h-[100vh] justify-start">
      {true && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="password_reset" element={<PasswordReset />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {false && <Widgets />}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
