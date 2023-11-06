import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="app flex ml-auto mr-auto h-[100vh]">
      {false && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
      <Routes>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {false && <Widgets />}
      {/* true will be replaced by authorization*/}

    </div>
  );
};

export default App;
