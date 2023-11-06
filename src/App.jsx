import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Home from "./components/Home";
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"
import Landing from "./components/landing-page/Landing";
import { useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app flex ml-auto mr-auto pl-10 pr-10 justify-start">
      {loggedIn && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="password_reset" element={<PasswordReset />}></Route>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {loggedIn && false && <Widgets />}
      {/* true will be replaced by authorization*/}

    </div>
  )
}

export default App
