import React, { useState, useEffect, useRef } from "react";
import { AiFillBell, AiOutlineBell, AiOutlineMore } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCalendar } from "react-icons/ai";
import { BsChatLeftDots, BsReplyAll } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { RiMessage2Line, RiMessage2Fill } from "react-icons/ri";
import { RiTeamFill, RiTeamLine } from "react-icons/ri";
import { FaListUl, FaListAlt } from "react-icons/fa";

const Sidebar = ({ sidebarWidth, screenWidth }) => {
  const [activeSidebarButton, setActiveSidebarButton] = useState(0);
  const sidebarMenu = [
    {
      unctiveIcon: <AiOutlineBell size={24} />,
      activeIcon: <AiFillBell size={24} />,
      name: "Activity",
    },
    {
      unctiveIcon: <RiMessage2Line size={24} />,
      activeIcon: <RiMessage2Fill size={24} />,
      name: "Chat",
    },
    {
      unctiveIcon: <RiTeamLine size={24} />,
      activeIcon: <RiTeamFill size={24} />,
      name: "Team",
    },
    {
      unctiveIcon: <AiOutlineCalendar size={24} />,
      activeIcon: <AiFillCalendar size={24} />,
      name: "Calendar",
    },
    {
      unctiveIcon: <FaListUl size={24} />,
      activeIcon: <FaListAlt size={24} />,
      name: "Attendance",
    },
    {
      unctiveIcon: <FaListUl size={24} />,
      activeIcon: <FaListAlt size={24} />,
      name: "Attendance",
    },
  ];
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
      }}
      ref={sidebarRef}
      className={`${screenWidth ? "h-screen" : "auto"}`}
    >
      <div className=" flex md:flex-col items-center justify-center ">
        {sidebarMenu.map((item, i) => {
          if (screenWidth) {
            return (
              <SidebarButtons
                item={item}
                i={i}
                activeSidebarButton={activeSidebarButton}
                setActiveSidebarButton={setActiveSidebarButton}
                screenWidth={screenWidth}
              />
            );
          } else {
            if (i == 4) {
              return (
                <SidebarButtons
                  item={{
                    unctiveIcon: <AiOutlineMore size={24} />,
                    activeIcon: <AiOutlineMore size={24} />,
                    name: "More",
                  }}
                  i={i}
                  activeSidebarButton={activeSidebarButton}
                  setActiveSidebarButton={setActiveSidebarButton}
                  screenWidth={screenWidth}
                />
              );
            } else if (i > 4) {
              setSidebarMenuExtra([...sidebarMenuExtra, item]);
            } else {
              return (
                <SidebarButtons
                  item={item}
                  i={i}
                  activeSidebarButton={activeSidebarButton}
                  setActiveSidebarButton={setActiveSidebarButton}
                  screenWidth={screenWidth}
                />
              );
            }
          }
        })}
        {sidebarMenu.map((item, i) => {
          if (i > 4) {
            return (
              <SidebarExtra
                item={item}
                i={i}
                activeSidebarButton={activeSidebarButton}
                setActiveSidebarButton={setActiveSidebarButton}
                screenWidth={screenWidth}
                sidebarRef={sidebarRef}
              />
            );
          }
        })}
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
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`flex ${
        screenWidth ? "my-2" : "mx-2"
      }  flex-col items-center justify-center cursor-pointer w-full border-box`}
      key={i}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        color: hover || activeSidebarButton == i ? "#ffe06d" : "#b0b0b0",
        borderLeft:
          activeSidebarButton == i && screenWidth
            ? "5px solid #ffe06d"
            : `${screenWidth ? "5px solid transparent" : "0px"}`,
        borderBottom:
          activeSidebarButton == i && window.innerWidth <= 768
            ? "5px solid #ffe06d"
            : "0px ",
      }}
      onClick={() => {
        setActiveSidebarButton(i);
      }}
    >
      {activeSidebarButton == i ? item.activeIcon : item.unctiveIcon}
      <div className="text-sm">{item.name}</div>
    </div>
  );
};
const SidebarExtra = ({
  sidebarRef,
  item,
  i,
  activeSidebarButton,
  setActiveSidebarButton,
}) => {
  return (
    <div
      className={`bg-red-500 w-full fixed`}
      key={i}
      style={{
        color: activeSidebarButton == i ? "#ffe06d" : "#b0b0b0",
        bottom: sidebarRef.current.clientHeight,
      }}
      onClick={() => {
        setActiveSidebarButton(i);
      }}
    >
      {activeSidebarButton == i ? item.activeIcon : item.unctiveIcon}
      <div className="text-sm">{item.name}</div>
    </div>
  );
};

export default Sidebar;
