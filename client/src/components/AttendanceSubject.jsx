import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { userInfo, serverUrl } from "../utils";
import Spinner from "./Spinner";
import Axios from "axios";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
const AttendanceSubject = () => {
  let { subject } = useParams();
  const [loading, setLoading] = useState(true);
  const [subInfo, setSubInfo] = useState([]);
  const [Tinfo, setTinfo] = useState([]);
  const [attCount, setAttCount] = useState(1);
  useEffect(() => {
    userInfo()
      .then((user) => {
        Axios.get(serverUrl + `/subjects/info/${subject}`).then((res) =>
          setSubInfo(res.data)
        );
        Axios.get(
          serverUrl +
            `/attendance/totalSubjectLectures?studentId=${user._id}&subjectId=${subject}`
        ).then((res) => {
          setTinfo(res.data);
        });
        Axios.get(serverUrl + `/students/${user._id}?lecAtt=${subject}`).then(
          (res) => {
            setAttCount(res.data.attCount);
          }
        );
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner message="Getting Attendance..." />;
  return (
    <>
      <div className="flex flex-col  mx-2 items-center py-2 px-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg   ">
        <div className="capitalize mr-auto my-1">{subInfo.subjectName}</div>
        <div className="text-blue-100 grid grid-cols-2 w-full">
          <div className="text-sm inline-flex font-thin">
            <FaChalkboardTeacher size={18} className="mx-1" />
            {subInfo.faculty}
          </div>
          <div className="text-sm inline-flex">
            Total Percent : {Math.floor((attCount / subInfo.lecCon) * 100)}%
          </div>
          <div className="text-sm inline-flex">
            Attended Lectures : {attCount}
          </div>
          <div className="text-sm inline-flex">
            Conducted Lectures : {subInfo.lecCon}
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {Tinfo.length == 0 ? (
                <div
                  id="toast-default"
                  class="m-auto flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg  "
                  role="alert"
                >
                  <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Fire icon</span>
                  </div>
                  <div class="ml-3 text-sm font-normal">No previous data</div>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-semibold text-gray-900 px-6 py-4 text-left"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-semibold text-gray-900 px-6 py-4 text-left"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-semibold text-gray-900 px-6 py-4 text-left"
                      >
                        Presenty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Tinfo.map((item, i) => {
                      return <AttRow item={item} key={i} />;
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const AttRow = ({ item }) => {
  let { date, startTime, endTime, present } = item;
  return (
    <tr className="even:bg-white border-b odd:bg-gray-100 ">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {date}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <div className="mx-2 text-gray-700  text-sm font-bold">
          {startTime}-{endTime}
        </div>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {present ? (
          <TiTick size={20} color="green" className="mr-2" />
        ) : (
          <ImCross size={10} color="red" className="mr-3" />
        )}
      </td>
    </tr>
  );
};

export default AttendanceSubject;
