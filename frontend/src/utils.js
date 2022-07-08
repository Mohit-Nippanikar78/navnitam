import { AiFillBell, AiOutlineBell, AiOutlineMore } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCalendar } from "react-icons/ai";
import { BsChatLeftDots, BsReplyAll } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { RiMessage2Line, RiMessage2Fill } from "react-icons/ri";
import { RiTeamFill, RiTeamLine,RiBookMarkLine,RiBookMarkFill } from "react-icons/ri";
import { FaListUl, FaListAlt } from "react-icons/fa";
export const sidebarMenu = [
  {
    unactiveIcon: <AiOutlineBell size={24} />,
    activeIcon: <AiFillBell size={24} />,
    name: "Activity",
    to: "/activity",
  },
  {
    unactiveIcon: <RiMessage2Line size={24} />,
    activeIcon: <RiMessage2Fill size={24} />,
    name: "Chat",
    to: "/chat",
  },
  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },
  {
    unactiveIcon: <RiBookMarkLine size={24} />,
    activeIcon: <RiBookMarkFill size={24} />,
    name: "Subjects",
    to: "/subjects",
  },
  {
    unactiveIcon: <RiTeamLine size={24} />,
    activeIcon: <RiTeamFill size={24} />,
    name: "Team",
    to: "/team",
  },
  {
    unactiveIcon: <AiOutlineCalendar size={24} />,
    activeIcon: <AiFillCalendar size={24} />,
    name: "Calendar",
    to: "/calendar",
  },
  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },

  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },
  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },
  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },
  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance",
  },
];
