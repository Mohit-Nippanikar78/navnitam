import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaChalkboardTeacher,
  FaStickyNote,
} from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import Axios from "axios";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

import { Link, Outlet } from "react-router-dom";
import { fetchUser, serverUrl } from "utils";
import Spinner from "Elements/Spinner";

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [subCount, setSubCount] = useState();
  const [totalLecAtt, setTotalLecAtt] = useState();
  useEffect(() => {
    fetchUser()
      .then((user) => {
        Axios.get(serverUrl + `/students/${user._id}?lecAttCount=true`).then(
          (res) => {
            setTotalLecAtt(res.data.lecAttCount);
          }
        );
        Axios.get(serverUrl + `/subjects/${user.class}?count=true`).then(
          (res) => {
            setSubCount(res.data.subCount);
          }
        );
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner message="Getting Attendances" />;
  return (
    <div>
      <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
        <div className="flex ">
          <div className="flex mx-2 ">
            <FaChalkboardTeacher size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">{totalLecAtt}</div>
            <div className="text-sm ">Total lectures attended</div>
          </div>
        </div>
        {/* <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div> */}
      </div>
      <Link
        to={"/subjects"}
        className="bg-slate-50 justify-between m-4 flex shadow-md "
      >
        <div className="flex ">
          <div className="flex mx-2 ">
            <IoMdBookmarks size={26} className=" m-2" color="#143987" />
          </div>
          <div className="flex-col flex">
            <div className="font-extrabold">{subCount}</div>
            <div className="text-sm ">Subjects</div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div>
      </Link>
      {/* <div className="bg-slate-50 justify-between m-4 flex shadow-md ">
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
      </div> */}
      {/* // overall attendance */}
      <Outlet />
    </div>
  );
};

export default Attendance;
