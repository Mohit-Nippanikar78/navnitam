import React, { useEffect, useState } from "react";
import { FaIdCardAlt, FaPencilAlt } from "react-icons/fa";
import { RiTeamFill, RiVipCrown2Fill } from "react-icons/ri";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import Axios from "axios";
import Spinner from "Elements/Spinner";
import Activity from "components/Activity";
import Modals from "../../Elements/Modals";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AttendanceTable from "../Attendance/AttendanceTable";
import AttendanceSubject from "../Attendance/AttendanceSubject";

const Student = ({admin}) => {
  let { studentId } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [stud, setStud] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
  const [table, setTable] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get(serverUrl + `/students/${studentId}?className=true`)
      .then((res) => {
        setStud(res.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if(!admin){navigate("/");return ;}
  if (loading) return <Spinner message="Getting Student Info..." />;

  return (
    <div class="">
      <div>
        <div class="bg-white relative  shadow rounded-lg">
          <div class="mt-4">
            <div className="flex">
              <div class="flex justify-center">
                <img
                  src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                  alt=""
                  class="rounded-full mx-auto  w-12 h-12 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
              </div>
              <div className="m-auto flex items-center relative w-full">
                <div className="w-full">
                  <h1 class="font-bold text-center text-3xl text-gray-900">
                    {stud.name}
                  </h1>
                  <p class="text-center text-sm text-gray-400 font-medium">
                    Student
                  </p>
                </div>
                <FaPencilAlt size={24} className="flex-end absolute right-8 cursor-pointer"  onClick={()=>{navigate("edit")}}/>
              </div>
            </div>
            <div class="my-5 px-6">
              <a
                target="_blank"
                href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${stud.email}`}
                class="cursor-pointer text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
              >
                Connect with <span class="font-bold">{stud.email}</span>
              </a>
            </div>
            <div class="flex m-4  ">
              <ul>
                <li class="flex items-center">
                  <div class="bg-green-200 rounded-full p-2 fill-current text-green-700">
                    <FaIdCardAlt />
                  </div>
                  <span class="text-gray-700 text-lg ml-3 flex">
                    Roll No :{" "}
                    <div className="mx-2 font-bold">{stud.rollNo}</div>
                  </span>
                </li>
                <li class="flex items-center mt-3">
                  <div class="bg-green-200 rounded-full p-2 fill-current text-green-700">
                    <RiVipCrown2Fill />
                  </div>
                  <span class="text-gray-700 text-lg ml-3 flex">
                    Administrator :
                    <div className="font-bold mx-2">
                      {stud.administrator ? "True" : "False"}
                    </div>
                  </span>
                </li>
                <li class="flex items-center mt-3">
                  <div class="bg-green-200 rounded-full p-2 fill-current text-green-700">
                    <RiTeamFill />
                  </div>
                  <span class="text-gray-700 text-lg ml-3 flex">
                    Class :{" "}
                    <div className="mx-2 font-bold">{stud.className}</div>
                  </span>
                </li>
              </ul>
            </div>
            <div className="m-4 flex justify-around">
              <button
                onClick={() => {
                  if (stud.administrator) {
                    setModal("dropAdministrator");
                  } else {
                    setModal("makeAdministrator");
                  }
                }}
                class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {!stud.administrator
                  ? "Make Administrator"
                  : "Drop Administrator"}
              </button>
              <button
                class="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={() => {
                  setModal("removeStudent");
                }}
              >
                Remove
              </button>
            </div>
            <Box
              sx={{ width: "100%", typography: "body1", minHeight: "500px" }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Notifications" value="1" />
                    <Tab label="Attendance" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Activity studentId={studentId} />
                </TabPanel>
                <TabPanel value="2" className="p-2" sx={{ padding: "0.5rem" }}>
                  {!table ? (
                    <AttendanceTable
                      studentId={studentId}
                      setTable={setTable}
                    />
                  ) : (
                    <AttendanceSubject
                      studentId={studentId}
                      subjectId={table?.state?.subjectId}
                    />
                  )}
                </TabPanel>
              </TabContext>
            </Box>
            {modal == "makeAdministrator" && (
              <Modals
                setModal={setModal}
                confirmBox={true}
                title="Attention"
                operation="makeAdministrator"
                content="Give student the right to change Class Data"
                studentId={stud._id}
              />
            )}
            {modal == "dropAdministrator" && (
              <Modals
                setModal={setModal}
                confirmBox={true}
                title="Attention"
                operation="dropAdministrator"
                content="Remove the student from the right of changing data"
                studentId={stud._id}
              />
            )}
            {modal == "removeStudent" && (
              <Modals
                setModal={setModal}
                confirmBox={true}
                title="Attention"
                operation="removeStudent"
                content="Remove the student from this class"
                studentId={stud._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
