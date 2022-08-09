import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaChalkboardTeacher,
  FaStickyNote,
} from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import Axios from "axios";
import {
  BsDot,
  BsFillCalendar2CheckFill,
  BsFillCalendar2WeekFill,
} from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, userInfo, serverUrl } from "../utils";
import Spinner from "./Spinner";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCount, setSubCount] = useState(0);
  const [totalLecAtt, setTotalLecAtt] = useState(1);
  const [totalLecCon, setTotalLecCon] = useState(1);
  useEffect(() => {
    fetchUser()
      .then((user) => {
        Axios.get(serverUrl + `/students/${user._id}?lecAttCount=true`).then(
          (res) => {
            setTotalLecAtt(res.data.lecAttCount);
          }
        );
        Axios.get(serverUrl + `/subjects/${user.class}`).then((res) => {
          setSubjects(res.data);
          setSubCount(res.data.length);
        });
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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
        {/* <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div> */}
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
        {/* <div className="flex justify-center items-center">
          <FaAngleRight size={20} />
        </div> */}
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
          <div className=" flex">
            <div className="text-sm font-bold flex items-center">
              Overall Attendance
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-8 text-sm  font-bold">result</div>
        </div>
      </div>
      {subjects.map((sub, i) => {
        return <AttendanceSub key={i} subject={sub} />;
      })}
    </div>
  );
};

const AttendanceSub = ({ subject }) => {
  let navigate = useNavigate();
  const [lecPer, setLecPer] = useState(1);
  useEffect(() => {
    userInfo().then((user) => {
      Axios.get(serverUrl + `/students/${user._id}?lecAtt=${subject._id}`).then(
        (res) => {
          setLecPer(Math.floor((res.data.attCount / subject.lecCon) * 100));
        }
      );
    });
  }, []);

  return (
    <div
      className=" justify-between mx-4 flex border-t cursor-pointer "
      style={{ backgroundColor: "#fffada" }}
      onClick={() => {
        navigate(`/attendance/${subject._id}`);
      }}
    >
      <div className="flex ">
        <div className="flex mx-2 ">
          <BsDot size={26} className=" m-2" color="#143987" />
        </div>
        <div className="flex-col flex justify-center">
          <div className="text-sm ">{subject.subjectName}</div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center">
          {lecPer > 70 ? (
            <TiTick size={20} color="green" className="mr-2" />
          ) : (
            <ImCross size={10} color="red" className="mr-3" />
          )}
        </div>
        <div className="text-sm mr-2">{lecPer}%</div>
        <FaAngleRight size={20} />
      </div>
    </div>
  );
};
export default Attendance;
