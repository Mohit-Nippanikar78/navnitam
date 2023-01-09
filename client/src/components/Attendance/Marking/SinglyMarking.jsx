import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import moment from "moment";
import { IoMdAdd } from "react-icons/io";
import React, { forwardRef, useEffect, useState } from "react";
import TimeRange from "react-time-range";
import { userInfo, serverUrl } from "utils";
import Spinner from "Elements/Spinner";
import { Link, useNavigate } from "react-router-dom";
const SinglyMarking = ({ user }) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [subjects, setSubjects] = useState([]);
  const [activeSub, setActiveSub] = useState(0);
  const [students, setStudents] = useState([]);
  const [create, setCreate] = useState(false);
  const [initPresent, setInitPresent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [batch, setBatch] = useState(0);

  let navigate = useNavigate();
  useEffect(() => {
    console.log("1");
    userInfo()
      .then((user) => {
        Axios.get(serverUrl + `/subjects/${user.class}`).then((res) =>
          res.data.map((item) => {
            setSubjects((subjects) => [
              ...subjects,
              { subName: item.subjectName, subId: item._id },
            ]);
          })
        );
        Axios.get(serverUrl + `/students/class/${user.class}`).then((res) => {
          setStudents(res.data);
        });
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    let newArr = [...students];
    let newArr1 = newArr.map((item) => ({ ...item, present: initPresent }));
    setStudents(newArr1);
  }, [initPresent]);
  useEffect(() => {
    if (done) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [done]);

  if (loading) return <Spinner message="Loading..." />;
  if (done) return <Spinner message="Saving" />;
  return (
    <div className=" bg-white rounded px-0 w-full">
      <div className="mb-4">
        <div className="text-lg flex items-center  ">
          <div className="flex text-gray-700 mx-2 text-sm font-bold mb-2">
            Date :
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Choose"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              inputFormat="dd/MM/yyyy"
              disabled={disabled}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className=" flex items-center w-full mb-2 mx-2 ">
        <label
          className="flex  text-gray-700  text-sm font-bold mb-2"
          for="grid-state"
        >
          Subject :
        </label>
        <div className="relative flex ">
          <select
            className="block mx-2 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              setActiveSub(e.target.value);
            }}
            disabled={disabled}
          >
            {subjects.map((sub, i) => {
              return (
                <option key={i} value={i}>
                  {sub.subName}
                </option>
              );
            })}
          </select>
          {user?.administrator && (
            <Link
              to={`/subjects/?new=true`}
              className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
            >
              <IoMdAdd />
            </Link>
          )}
        </div>
      </div>
      <div className=" flex items-center w-full mb-2 mx-2 ">
        {disabled ? (
          <div className="flex text-gray-700  text-sm font-bold mb-2">
            Time :
            <div className="mx-2">
              {moment(startTime).format("LT")}-{moment(endTime).format("LT")}
            </div>
          </div>
        ) : (
          <TimeRange
            onStartTimeChange={(res) => setStartTime(res.startTime)}
            onEndTimeChange={(res) => setEndTime(res.endTime)}
            startMoment={startTime}
            endMoment={endTime}
          />
        )}
      </div>
      <div className="mb-4">
        <div className="text-lg flex items-center  ">
          <div className="flex text-gray-700 mx-2 text-sm font-bold mb-2">
            Initial :
          </div>

          <button
            onClick={() => setInitPresent(true)}
            type="button"
            className={
              initPresent
                ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            }
            disabled={disabled}
          >
            Present
          </button>
          <button
            disabled={disabled}
            onClick={() => setInitPresent(false)}
            type="button"
            className={
              initPresent
                ? "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                : "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            }
          >
            Absent
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg flex items-center  ">
          <div className="flex text-gray-700 mx-2 text-sm font-bold mb-2">
            Batch :
          </div>

          <button
            onClick={() => setBatch(0)}
            type="button"
            className={
              batch == 0
                ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            }
            disabled={disabled}
          >
            All
          </button>
          <button
            onClick={() => setBatch(1)}
            type="button"
            className={
              batch == 1
                ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            }
            disabled={disabled}
          >
            Batch 1
          </button>
          <button
            disabled={disabled}
            onClick={() => setBatch(2)}
            type="button"
            className={
              batch == 2
                ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            }
          >
            Batch 2
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          disabled={disabled}
          className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            Axios.put(serverUrl + `/subjects/update/lecCon`, {
              subjectId: subjects[activeSub].subId,
            });
            setCreate(true);
            setDisabled(true);
          }}
        >
          Create Presenties
        </button>
      </div>
      {create && (
        <SinglyAttendance
          students={students}
          setStudents={setStudents}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          subjects={subjects}
          activeSub={activeSub}
          initPresent={initPresent}
          setDone={setDone}
          batch={batch}
        />
      )}
    </div>
  );
};

const SinglyAttendance = ({
  students,
  setStudents,
  startTime,
  endTime,
  startDate,
  batch,
  subjects,
  activeSub,
  initPresent,
  setDone,
}) => {
  // let arr = res[0].students.sort((a, b) => {
  //   return a.rollNo - b.rollNo;
  // });

  return (
    <div>
      <div className="flex flex-col mx-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full table-fixed text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Roll No
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Present
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, i) => {
                    if (batch == 0) {
                      return (
                        <SinglyS
                          student={student}
                          students={students}
                          setStudents={setStudents}
                          key={i}
                          i={i}
                          startTime={startTime}
                          endTime={endTime}
                          startDate={startDate}
                          subjects={subjects}
                          activeSub={activeSub}
                          initPresent={initPresent}
                          setDone={setDone}
                        />
                      );
                    } else if (batch == 1 && student.rollNo < 70) {
                      return (
                        <SinglyS
                          student={student}
                          students={students}
                          setStudents={setStudents}
                          key={i}
                          i={i}
                          startTime={startTime}
                          endTime={endTime}
                          startDate={startDate}
                          subjects={subjects}
                          activeSub={activeSub}
                          initPresent={initPresent}
                          setDone={setDone}
                        />
                      );
                    } else if (batch == 2 && student.rollNo > 69) {
                      return (
                        <SinglyS
                          student={student}
                          students={students}
                          setStudents={setStudents}
                          key={i}
                          i={i}
                          startTime={startTime}
                          endTime={endTime}
                          startDate={startDate}
                          subjects={subjects}
                          activeSub={activeSub}
                          initPresent={initPresent}
                          setDone={setDone}
                        />
                      );
                    }
                  })}
                  <tr className="odd:bg-white border-b even:bg-gray-100 tdpresent">
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      colSpan={2}
                    >
                      Completed
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        class=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setDone(true);
                        }}
                      >
                        Done
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SinglyS = ({
  student,
  students,
  setStudents,
  i,
  startTime,
  endTime,
  startDate,
  subjects,
  activeSub,
  initPresent,
}) => {
  const [present, setPresent] = useState(initPresent);
  const [first, setFirst] = useState(true);
  const [resId, setResId] = useState("");
  useEffect(() => {
    if (first) {
      console.log("first add");
      // console.log({
      //   studentId: student._id,
      //   present: initPresent,
      //   date: moment(startDate).format("DD/MM/YYYY"),
      //   startTime: moment(startTime).format("LT"),
      //   endTime: moment(endTime).format("LT"),
      //   subjectId: subjects[activeSub].subId,
      // });
      Axios.post(serverUrl + `/attendance/add`, {
        studentId: student._id,
        present: initPresent,
        date: moment(startDate).format("DD/MM/YYYY"),
        startTime: moment(startTime).format("LT"),
        subjectId: subjects[activeSub].subId,
        endTime: moment(endTime).format("LT"),
      }).then((res) => {
        setResId(res.data._id);
        setPresent(res.data.present);
        setFirst(false);
      });
    } else {
      console.log("updating");
      Axios.put(serverUrl + `/attendance/update`, {
        id: resId,
        present: present,
        studentId: student._id,
      }).then((res) => {});
    }
  }, [present]);
  return (
    <tr className="odd:bg-white border-b even:bg-gray-100 tdpresent">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {student.rollNo}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {student.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <input
          id={`Presenty${i}`}
          className="toggle"
          type="checkbox"
          role="switch"
          name="toggle"
          checked={present}
          onChange={(e) => {
            setPresent(!present);
          }}
        />
        <label htmlFor={`Presenty${i}`} className="slot">
          <span className="slot__label">Absent</span>
          <span className="slot__label">Present</span>
        </label>
        <div className="curtain"></div>
      </td>
    </tr>
  );
};

export default SinglyMarking;
