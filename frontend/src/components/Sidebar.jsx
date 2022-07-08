import React, { useState, useEffect, useRef } from "react";
import { AiFillBell, AiOutlineBell, AiOutlineMore } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCalendar } from "react-icons/ai";
import { BsChatLeftDots, BsReplyAll } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { RiMessage2Line, RiMessage2Fill } from "react-icons/ri";
import { RiTeamFill, RiTeamLine } from "react-icons/ri";
import { FaListUl, FaListAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import { client } from "../client";
import { sidebarMenu } from "../utils";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ sidebarWidth, screenWidth }) => {
  const [activeSidebarButton, setActiveSidebarButton] = useState(0);
  const [showSidebarButton, setShowSidebarButton] = useState([]);
  const [extraSidebarButton, setExtraSidebarButton] = useState([]);
  const [sidebarOptionsToggle, setSidebarOptionsToggle] = useState(false);

  useEffect(() => {
    if (screenWidth) {
      setShowSidebarButton(sidebarMenu);
    } else {
      setSidebarButtonsToShow();
      window.addEventListener("resize", setSidebarButtonsToShow());
    }
    client
      .fetch("*[_type == 'admin' ] ")
      .then((Response) => console.log(Response));
  }, []);
  const setSidebarButtonsToShow = () => {
    console.log("mohit");

    var i,
      arr = [],
      arr2 = [],
      sidebarButtonsToShowMobile = Math.ceil(window.innerWidth / 100);
    for (i = 0; i < sidebarButtonsToShowMobile; i++) {
      arr = [...arr, sidebarMenu[i]];
    }
    for (i = sidebarButtonsToShowMobile; i < sidebarMenu.length; i++) {
      arr2 = [...arr2, sidebarMenu[i]];
    }

    setShowSidebarButton(arr);
    setExtraSidebarButton(arr2);
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
        width: screenWidth ? sidebarWidth + "px" : "100%",
        position: "fixed",
        bottom: "0",
        zIndex: "20",
      }}
      ref={sidebarRef}
      className={`${screenWidth ? "h-screen" : "auto"}`}
    >
      <div className=" flex md:flex-col items-center justify-center  ">
        {showSidebarButton.map((item, i) => {
          return (
            <SidebarButtons
              item={item}
              i={i}
              activeSidebarButton={activeSidebarButton}
              setActiveSidebarButton={setActiveSidebarButton}
              screenWidth={screenWidth}
            />
          );
        })}
        <SidebarButtons
          item={{
            unactiveIcon: <AiOutlineMore size={24} />,
            activeIcon: <AiOutlineMore size={24} />,
            name: "More",
          }}
          activeSidebarButton={activeSidebarButton}
          setActiveSidebarButton={setActiveSidebarButton}
          screenWidth={screenWidth}
          setSidebarOptionsToggle={setSidebarOptionsToggle}
          sidebarOptionsToggle={sidebarOptionsToggle}
        />
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
            />
          )}{" "}
        </AnimatePresence>
      </div>
    </div>
  );
};
const SidebarButtons = ({
  screenWidth,
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
        screenWidth ? "py-2" : "px-2"
      } z-10   overflow-hidden flex-col items-center justify-center cursor-pointer w-full border-box`}
      key={i ? i : null}
      onMouseEnter={() => {
        if (screenWidth) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        color: hover || activeSidebarButton == i ? "#ffe06d" : "#b0b0b0",
        borderLeft:
          activeSidebarButton == i && screenWidth
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
}) => {
  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
      }}
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
      {" "}
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
              return (
                <div
                  className={` mx-2 `}
                  key={i}
                  style={{
                    color: "#b0b0b0",
                  }}
                >
                  <div className="m-auto w-max">{item.activeIcon}</div>
                  <div className="text-xs  ">{item.name}</div>
                </div>
              );
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
