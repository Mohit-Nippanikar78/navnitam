import "./App.css";
import {Sidebar} from "./components";
import Home from "./container/Home";
import { useState, useEffect, useContext, createContext } from "react";
function App() {
  const [sidebarWidth, setSidebarWidth] = useState(80);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth > 768);
  useEffect(() => {
    const resize = () => {
      setScreenWidth(window.innerWidth > 768);
    };
    window.addEventListener("resize", resize);
  }, []);

  useEffect(() => {
    console.log(screenWidth);
  }, [screenWidth]);

  return (
    <>
      <div className="flex-col-reverse flex  relative">
        <Sidebar sidebarWidth={sidebarWidth} screenWidth={screenWidth} />
        <Home sidebarWidth={sidebarWidth} screenWidth={screenWidth} />
      </div>
    </>
  );
}

export default App;
