import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="app flex ml-auto mr-auto h-[100vh] pl-10 pr-10">
      {true && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login"></Route>
          </Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {true && <Widgets />}
      {/* true will be replaced by authorization*/}

    </div>
  );
};

export default App;
