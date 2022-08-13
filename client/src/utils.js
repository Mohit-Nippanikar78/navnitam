import { AiFillBell, AiOutlineBell, AiOutlineMore } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCalendar } from "react-icons/ai";
import { BsChatLeftDots, BsReplyAll } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import Axios from "axios";
import {
  RiMessage2Line,
  RiMessage2Fill,
  RiUserFollowLine,
  RiUserFollowFill,
} from "react-icons/ri";
import { FaRegCalendarCheck, FaCalendarCheck } from "react-icons/fa";

import {
  RiTeamFill,
  RiTeamLine,
  RiBookMarkLine,
  RiBookMarkFill,
} from "react-icons/ri";
import { FaListUl, FaListAlt } from "react-icons/fa";
 export const serverUrl = "https://navnitamfirst.herokuapp.com";
//export const serverUrl = "http://localhost:3001";
export const sidebarMenu = [
  {
    unactiveIcon: <AiOutlineBell size={24} />,
    activeIcon: <AiFillBell size={24} />,
    name: "Activity",
    to: "/",
    public: true,
  },

  {
    unactiveIcon: <FaListUl size={24} />,
    activeIcon: <FaListAlt size={24} />,
    name: "Attendance",
    to: "/attendance/subjects",
    public: true,
  },
  {
    unactiveIcon: <FaRegCalendarCheck size={24} />,
    activeIcon: <FaCalendarCheck size={24} />,
    name: "Presenty",
    to: "/presenty",
    public: false,
  },
  {
    unactiveIcon: <RiBookMarkLine size={24} />,
    activeIcon: <RiBookMarkFill size={24} />,
    name: "Subjects",
    to: "/subjects",
    public: false,
  },
  {
    unactiveIcon: <RiTeamLine size={24} />,
    activeIcon: <RiTeamFill size={24} />,
    name: "Students",
    to: "/students",
    public: false,
  },
  {
    unactiveIcon: <AiOutlineCalendar size={24} />,
    activeIcon: <AiFillCalendar size={24} />,
    name: "Calendar",
    to: "/calendar",
    public: true,
  },

  {
    unactiveIcon: <RiUserFollowLine size={24} />,
    activeIcon: <RiUserFollowFill size={24} />,
    name: "Requests",
    to: "/requests",
    public: false,
  },
];
// {
//   unactiveIcon: <RiMessage2Line size={24} />,
//   activeIcon: <RiMessage2Fill size={24} />,
//   name: "Chat",
//   to: "/chat",
// },

// {
//   unactiveIcon: <FaListUl size={24} />,
//   activeIcon: <FaListAlt size={24} />,
//   name: "Attendance",
//   to: "/attendance",
// },
// {
//   unactiveIcon: <FaListUl size={24} />,
//   activeIcon: <FaListAlt size={24} />,
//   name: "Attendance",
//   to: "/attendance",
// },
// {
//   unactiveIcon: <FaListUl size={24} />,
//   activeIcon: <FaListAlt size={24} />,
//   name: "Attendance",
//   to: "/attendance",
// },
// {
//   unactiveIcon: <FaListUl size={24} />,
//   activeIcon: <FaListAlt size={24} />,
//   name: "Attendance",
//   to: "/attendance",
// },
// *[_type == 'admin' && class == "CSE1B" ]{
//   attendance[date=="2022-07-09"]{time[time=="9-10"]{students[ _ref =="uiSq0xBAm1QLPs6xqrC0uSMeZyK2"]}}
// }
// *[_type == 'admin' && class == "CSE1B" ]{
//   attendance[date=="2022-07-09"]{time[subject == "maths"]}
// }
// *[_type == 'admin' && class == "CSE1B" ]{
//   attendance[]{ "actorCount": count(time[subject == "maths"])}
// }
export const userInfo = async () => {
  let obj = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(obj);
  return userInfo;
};
export const fetchUser = async () => {
  let obj = await userInfo();
  let obj1;
  await Axios.get(serverUrl + `/students/${obj._id}`).then((res) => {
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    obj1 = res.data;
  });
  return obj1;
};
