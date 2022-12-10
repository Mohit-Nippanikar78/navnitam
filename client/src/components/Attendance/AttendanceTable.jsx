import React, { Suspense, useEffect, useState } from "react";
import { fetchUser, serverUrl, userInfo } from "utils";
import Axios from "axios";
import { BsDot, BsFillCalendar2CheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Spinner from "Elements/Spinner";
const AttendanceTable = ({ studentId, setTable }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser().then((user) => {
      Axios.get(serverUrl + `/subjects/${user.class}`)
        .then((res) => {
          setSubjects(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    });
  }, []);
  if (loading) return <Spinner message="Getting Attendance..." />;
  return (
    <div>
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
        return (
          <AttendanceSub
            key={i}
            subject={sub}
            studentId={studentId}
            setTable={setTable}
          />
        );
      })}
    </div>
  );
};
const AttendanceSub = ({ subject, studentId, setTable }) => {
  let navigate = useNavigate();
  const [lecPer, setLecPer] = useState();
  useEffect(() => {
    if (studentId == undefined) {
      userInfo().then((user) => {
        Axios.get(
          serverUrl + `/students/${user._id}?lecAtt=${subject._id}`
        ).then((res) => {
          if (res.data.attCount == 0) {
            setLecPer(0);
          } else {
            setLecPer(res.data.attPer);
          }
        });
      });
    } else {
      Axios.get(
        serverUrl + `/students/${studentId}?lecAtt=${subject._id}`
      ).then((res) => {
        setLecPer(res.data.attPer);
      });
    }
  }, []);

  return (
    <div
      className=" justify-between mx-4 flex border-t cursor-pointer "
      style={{ backgroundColor: "#fffada" }}
      onClick={() => {
        if (setTable) {
          setTable({
            state: { subjectId: subject._id, studentId },
          });
        } else {
          navigate(`/attendance/subject`, {
            state: { subjectId: subject._id, studentId },
          });
        }
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

export default AttendanceTable;
