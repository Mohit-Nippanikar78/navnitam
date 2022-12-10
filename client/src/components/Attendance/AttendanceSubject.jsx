import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { userInfo, serverUrl } from "utils";
import Spinner from "Elements/Spinner";
import Axios from "axios";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Exception from "Elements/Exception";
const AttendanceSubject = ({ studentId, subjectId }) => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [subInfo, setSubInfo] = useState([]);
  const [Tinfo, setTinfo] = useState([]);
  const [attCount, setAttCount] = useState();
  useEffect(() => {
    Axios.get(
      serverUrl + `/subjects/info/${location?.state?.subjectId || subjectId}`
    ).then((res) => setSubInfo(res.data));
    Axios.get(
      serverUrl +
        `/attendance/totalSubjectLectures?studentId=${
          location?.state?.studentId || studentId
        }&subjectId=${location?.state?.subjectId || subjectId}`
    ).then((res) => {
      setTinfo(res.data);
    });
    Axios.get(
      serverUrl +
        `/students/${location.state?.studentId || studentId}?lecAtt=${
          location?.state?.subjectId || subjectId
        }`
    ).then((res) => {
      setAttCount(res.data.attCount);
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
                <Exception message="No previos data" />
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
