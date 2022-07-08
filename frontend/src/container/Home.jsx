import React, { useState, useEffect } from "react";
import { client } from "../client";
import {
  Navbar,
  Activity,
  Team,
  Assistant,
  Attendance,
  Subjects,
} from "../components";
import { Routes, Route, useSearchParams } from "react-router-dom";
const Home = ({ sidebarWidth, screenWidth }) => {
  const [na, setNa] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [current, setCurrent] = useState("/");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    client
      .fetch("*[_type == 'admin' && class  == 'CSE1A'  ] {crName}")
      .then((res) => {
        setNa(res[0].crName);
      });
  }, []);

  return (
    <div
      style={{
        marginLeft: screenWidth && sidebarWidth + "px",
        marginBottom: !screenWidth && "50px",
      }}
    >
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/activity" element={<Activity />} />
        <Route path="/team" element={<Team />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/" element={<div>Main</div>} />
      </Routes>
    </div>
  );
};

export default Home;
