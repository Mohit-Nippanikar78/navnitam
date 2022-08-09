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
const Home = ({ sidebarWidth }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    fetchUser().then((user) => {
      user.administrator && setAdmin(true);
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
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance/:subject" element={<AttendanceSubject />} />

          {admin && (
            <>
              <Route path="requests" element={<Requests />} />
              <Route path="presenty" element={<Presenty admin={admin} />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="students" element={<Students />} />
            </>
          )}
          <Route path="/*" element={<div>Main</div>} />
        </Routes>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
