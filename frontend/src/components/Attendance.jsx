import React from "react";
import {
  FaAngleRight,
  FaChalkboardTeacher,
  FaStickyNote,
} from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import {
  BsDot,
  BsFillCalendar2CheckFill,
  BsFillCalendar2WeekFill,
} from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Attendance = () => {
  return (
    <div>
      <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
        <div className="flex ">
          <div className="flex mx-2 ">
            <FaChalkboardTeacher size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">97</div>
            <div className="text-sm ">Total lectures attended</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div>
      </div>
      <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
        <div className="flex ">
          <div className="flex mx-2 ">
            <IoMdBookmarks size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">12</div>
            <div className="text-sm ">Subjects</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div>
      </div>
      <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsFillCalendar2WeekFill
              size={26}
              className=" m-2"
              color="#143987"
            />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">23</div>
            <div className="text-sm ">Total days of College</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div>
      </div>
      <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
        <div className="flex ">
          <div className="flex mx-2 ">
            <FaStickyNote size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">97</div>
            <div className="text-sm ">Notes downloaded</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div>
      </div>
      {/* // overall attendance */}
      <div
        className=" justify-between mx-4 flex shadow-md "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsFillCalendar2CheckFill
              size={26}
              className=" m-2"
              color="#143987"
            />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">97%</div>
            <div className="text-sm ">Overall Attendance</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-2 text-sm">result</div>
          <FaAngleRight size={20} />
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">Maths</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <TiTick size={20} color="green" className="mr-2" />
          </div>
          <div className="text-sm mr-2">97%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">English</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">70%</div>
        </div>
      </div>
      <div
        className=" justify-between mx-4 flex border-t "
        style={{ backgroundColor: "#fffada" }}
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <BsDot size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex justify-center">
            <div className="text-sm ">MOhit</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <ImCross size={10} color="red" className="mr-3" />
          </div>
          <div className="text-sm mr-2">7%</div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
