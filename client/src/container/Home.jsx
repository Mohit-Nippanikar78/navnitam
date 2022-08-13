import React, { useState, useEffect } from "react";
import {
  Navbar,
  Activity,
  Students,
  Assistant,
  Attendance,
  Subjects,
  AttendanceSubject,
  Presenty,
  Requests,
} from "../components";
import {
  Routes,
  Route,
  useSearchParams,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { fetchUser } from "../utils";
import AttendanceTable from "../components/Attendance/AttendanceTable";
import Student from "../components/Student";
const Home = ({ sidebarWidth }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    fetchUser().then((userr) => {
      setUser(userr);
      userr.administrator && setAdmin(true);
    });
  }, []);

  return (
    <div
      style={{
        marginLeft: window.innerWidth > 768 && sidebarWidth + "px",
        marginBottom: !(window.innerWidth > 768) && "50px",
      }}
    >
      <Navbar
        searchTerm={searchTerm}
        sidebarWidth={sidebarWidth}
        setSearchTerm={setSearchTerm}
      />
      <div className="mt-[125px]">
        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="attendance" element={<Attendance />}>
            <Route path="subjects" element={<AttendanceTable />} />
          </Route>
          {/* {admin && (
            <Route
              path="subjects/student/:studentId"
              element={<AttendanceTable />}
            />
          )} */}
          <Route
            path="attendance/subject"
            element={<AttendanceSubject studentId={user?._id} />}
          />

          {admin && (
            <>
              <Route path="student/:studentId" element={<Student />} />
              <Route path="requests" element={<Requests />} />
              <Route path="presenty" element={<Presenty admin={admin} />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="students" element={<Students />} />
            </>
          )}
          <Route
            path="/*"
            element={
              <img
                src="https://media.makeameme.org/created/error-404-no.jpg"
                className="w-full"
              />
            }
          />
        </Routes>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
