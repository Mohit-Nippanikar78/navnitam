import "./App.css";
import Sidebar from "./elements/Sidebar";
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
    return () => window.removeEventListener("resize", resize);
  }, []);
  const sWidth = createContext(screenWidth);

  useEffect(() => {
    console.log(screenWidth);
  }, [screenWidth]);

  return (
    <>
      <sWidth.Provider value={screenWidth}>
        <div className="flex-col-reverse flex md:flex-row">
          <Sidebar sidebarWidth={sidebarWidth} screenWidth={screenWidth} />
          <Home sidebarWidth={sidebarWidth} screenWidth={screenWidth} />
        </div>
      </sWidth.Provider>
    </>
  );
}

export default App;
