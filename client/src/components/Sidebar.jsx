import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMore } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import { fetchUser, sidebarMenu ,serverUrl} from "../utils";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ sidebarWidth }) => {
  const [admin, setAdmin] = useState(false);

  const [activeSidebarButton, setActiveSidebarButton] = useState(0);
  const [showSidebarButton, setShowSidebarButton] = useState([]);
  const [extraSidebarButton, setExtraSidebarButton] = useState([]);
  const [sidebarOptionsToggle, setSidebarOptionsToggle] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowSidebarButton(sidebarMenu);
    } else {
      setSidebarButtonsToShow();
    }
    fetchUser().then((res) => {
      console.log(res);
      res.administrator && setAdmin(true);
    });
  }, []);
  const setSidebarButtonsToShow = () => {
    var sidebarButtonsToShowMobile = Math.ceil(window.innerWidth / 100);
    if (sidebarButtonsToShowMobile >= sidebarMenu.length) {
      setShowSidebarButton(sidebarMenu);
      setExtraSidebarButton([]);
    } else {
      var i,
        arr = [],
        arr2 = [];
      for (i = 0; i < sidebarButtonsToShowMobile; i++) {
        arr = [...arr, sidebarMenu[i]];
      }
      for (i = sidebarButtonsToShowMobile; i < sidebarMenu.length; i++) {
        arr2 = [...arr2, sidebarMenu[i]];
      }

      setShowSidebarButton(arr);
      setExtraSidebarButton(arr2);
    }
  };

  useEffect(() => {
    console.log(extraSidebarButton);
  }, [extraSidebarButton]);

  const [sidebarMenuExtra, setSidebarMenuExtra] = useState([]);

  const sidebarRef = useRef();

  return (
    <div
      style={{
        background: "#211f1f",
        color: "#b0b0b0",
        width: window.innerWidth > 768 ? sidebarWidth + "px" : "100%",
        position: "fixed",
        bottom: "0",
        zIndex: "20",
      }}
      ref={sidebarRef}
      className={`${window.innerWidth > 768 ? "h-screen" : "auto"}`}
    >
      <div className=" flex md:flex-col items-center justify-center  ">
        {showSidebarButton.length > 0 &&
          showSidebarButton.map((item, i) => {
            if (item.public) {
              return (
                <SidebarButtons
                  item={item}
                  key={i}
                  i={i}
                  activeSidebarButton={activeSidebarButton}
                  setActiveSidebarButton={setActiveSidebarButton}
                />
              );
            } else {
              if (admin) {
                return (
                  <SidebarButtons
                    item={item}
                    key={i}
                    i={i}
                    activeSidebarButton={activeSidebarButton}
                    setActiveSidebarButton={setActiveSidebarButton}
                  />
                );
              }
            }
          })}
        {showSidebarButton.length > 0 && (
          <SidebarButtons
            item={{
              unactiveIcon: <AiOutlineMore size={24} />,
              activeIcon: <AiOutlineMore size={24} />,
              name: "More",

              public: true,
            }}
            activeSidebarButton={activeSidebarButton}
            setActiveSidebarButton={setActiveSidebarButton}
            setSidebarOptionsToggle={setSidebarOptionsToggle}
            sidebarOptionsToggle={sidebarOptionsToggle}
          />
        )}
        {sidebarOptionsToggle && (
          <div
            className=" w-full fixed top-0 left-0"
            style={{
              height: Math.floor(window.innerHeight),
              background: "rgba(0, 0, 0, 0.3)",
            }}
          ></div>
        )}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {sidebarOptionsToggle && (
            <SidebarOptions
              extraSidebarButton={extraSidebarButton}
              setSidebarOptionsToggle={setSidebarOptionsToggle}
              sidebarOptionsToggle={sidebarOptionsToggle}
              admin={admin}
            />
          )}{" "}
        </AnimatePresence>
      </div>
    </div>
  );
};
const SidebarButtons = ({
  item,
  i,
  activeSidebarButton,
  setActiveSidebarButton,
  setSidebarOptionsToggle,
  sidebarOptionsToggle,
}) => {
  const [hover, setHover] = useState(false);

  let navigate = useNavigate();

  return (
    <div
      className={`flex ${
        window.innerWidth > 768 ? "py-2" : "px-2"
      } z-10   overflow-hidden flex-col items-center justify-center cursor-pointer w-full border-box`}
      key={i ? i : null}
      onMouseEnter={() => {
        if (window.innerWidth > 768) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        color: hover || activeSidebarButton == i ? "#ffe06d" : "#b0b0b0",
        borderLeft:
          activeSidebarButton == i && window.innerWidth > 768
            ? "5px solid #ffe06d"
            : `5px solid transparent`,
        borderBottom:
          activeSidebarButton == i && window.innerWidth <= 768
            ? "5px solid #ffe06d"
            : "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "5px solid transparent",
        background: "rgb(33, 31, 31)",
      }}
      onClick={() => {
        setActiveSidebarButton(i);
        if (item.name == "More") {
          setSidebarOptionsToggle(!sidebarOptionsToggle);
        } else {
          navigate(item?.to);
        }
      }}
    >
      {activeSidebarButton == i ? item.activeIcon : item.unactiveIcon}
      <div className="text-xs">{item.name}</div>
    </div>
  );
};

const SidebarOptions = ({
  extraSidebarButton,
  setSidebarOptionsToggle,
  sidebarOptionsToggle,
  admin,
}) => {
  let navigate = useNavigate();
  return (
    <motion.div
      className="w-full   absolute  left-0  shadow-md "
      style={{
        bottom: "45px",
        height: window.innerHeight - 45,
      }}
      variants={{
        hidden: { y: "100vh", opacity: 0 },
        visible: {
          y: "0",
          opacity: 1,
          transition: { duration: 0.5 },
        },
        exit: { y: "100vh", opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setSidebarOptionsToggle(!sidebarOptionsToggle);
        }}
      >
        <div
          className=" p-4 rounded-t-xl w-full absolute bottom-0 "
          style={{
            marginTop: "auto",
            marginBottom: "0px",
            background: "#3f3f3f",
          }}
        >
          <div className="flex  mb-4 sidebarOptionsScrollbar">
            {extraSidebarButton?.map((item, i) => {
              if (item.public) {
                return (
                  <div
                    className={` mx-2 cursor-pointer `}
                    key={i}
                    style={{
                      color: "#b0b0b0",
                    }}
                    onClick={() => navigate(item.to)}
                  >
                    <div className="m-auto w-max">{item.activeIcon}</div>
                    <div className="text-xs  ">{item.name}</div>
                  </div>
                );
              } else {
                if (admin) {
                  return (
                    <div
                      className={` mx-2 cursor-pointer `}
                      key={i}
                      style={{
                        color: "#b0b0b0",
                      }}
                      onClick={() => navigate(item.to)}
                    >
                      <div className="m-auto w-max">{item.activeIcon}</div>
                      <div className="text-xs  ">{item.name}</div>
                    </div>
                  );
                }
              }
            })}
          </div>

          <button
            type="button"
            class=" flex justify-center text-white w-full m-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setSidebarOptionsToggle(!sidebarOptionsToggle);
            }}
          >
            Cancel
          </button>
        </div>
      </OutsideClickHandler>
    </motion.div>
  );
};
export default Sidebar;
