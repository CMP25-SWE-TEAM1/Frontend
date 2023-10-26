import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app flex ml-auto mr-auto h-[100vh] pl-10 pr-10">
      {loggedIn && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route path="login"></Route>
          </Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {loggedIn && <Widgets />}
      {/* true will be replaced by authorization*/}
    </div>
  );
};

export default App;
