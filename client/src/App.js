import "./App.css";
import { Sidebar, Subjects } from "./components";
import Home from "./container/Home";
import { useState, useEffect } from "react";
import { JoinClass, Login } from "./components/start/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchUser, userInfo, serverUrl } from "./utils";
import Start from "./components/start/Start";
import CreateClass from "./components/start/CreateClass";
import Axios from "axios";
function App() {
  const [sidebarWidth, setSidebarWidth] = useState(80);
  let navigate = useNavigate();

  useEffect(() => {
    userInfo().then((obj) => {
      if (obj == null || obj == "") {
        navigate("/login", { replace: true });
      } else {
        Axios.get(serverUrl + `/students/${obj._id}`).then((res) => {
          if (res.data == "") {
            navigate("/login", { replace: true });
          }
          if (res.data.class == null) {
            navigate("/start", { replace: true });
          } else {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
          }
        });
      }
    });
    window.addEventListener("hashchange", () => {
      console.log(window.location.path);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="flex-col-reverse flex  relative">
              <Sidebar sidebarWidth={sidebarWidth} />
              <Home sidebarWidth={sidebarWidth} />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="start" element={<Start />}>
          <Route path="joinClass" element={<JoinClass />} />
          <Route path="createClass" element={<CreateClass />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
