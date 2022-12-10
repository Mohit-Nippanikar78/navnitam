import React, { useState, useEffect } from "react";
import {
  Navbar,
  Activity,
  Students,
  Assistant,
  Subjects,
  Requests,
} from "components";
import QrcodeMarking from "../components/Attendance/Marking/QrMark/QrcodeMarking";
import SinglyMarking from "../components/Attendance/Marking/SinglyMarking";
import {
  Routes,
  Route,
  useSearchParams,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { fetchUser } from "utils";
import Student from "components/Students/Student";
import Exams from "components/Exams/Exams";
import AttendanceSubject from "components/Attendance/AttendanceSubject";
import Attendance from "components/Attendance/Attendance";
import AttendanceTable from "components/Attendance/AttendanceTable";
import CreateExam from "components/Exams/CreateExam";
import Presenty from "components/Attendance/Marking/Presenty";
import StudentEdit from "components/Students/StudentEdit";
import NotesFileEdit from "components/Notes/Files/NotesFileEdit";
import Notes from "components/Notes/Notes";
import NotesNewFolder from "components/Notes/Folder/NotesNewFolder";
import NotesFolder from "components/Notes/Folder/NotesFolder";
import NotesNewPdf from "components/Notes/NotesNewPdf";
import NotesPdfPreview from "components/Notes/Files/NotesPdfPreview";
import EditFolder from "components/Notes/Folder/EditFolder";
import QrcodeMarkingNew from "components/Attendance/Marking/QrMark/QrcodeMarkingNew";
import QrcodeMarkingVerify from "components/Attendance/Marking/QrMark/QrcodeMarkingVerify";
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
        user={user}
        admin={admin}
      />
      <div className="mt-[135px]">
        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="attendance" element={<Attendance />}>
            <Route path="subjects" element={<AttendanceTable />} />
          </Route>
          <Route path="students" element={<Students />} />

          <Route
            path="attendance/subject"
            element={<AttendanceSubject studentId={user?._id} />}
          />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/folder/:folderId" element={<NotesFolder />} />
          <Route
            path="notes/pdf/preview/:fileId"
            element={<NotesPdfPreview />}
          />

          {admin && (
            <>
              <Route
                path="notes/file/:fileId/edit"
                element={<NotesFileEdit />}
              />
              <Route path="notes/file/new" element={<NotesNewPdf />} />
              <Route
                path="notes/folder/edit/:folderId"
                element={<EditFolder />}
              />
              <Route path="notes/folder/new" element={<NotesNewFolder />} />
              <Route path="exams/create" element={<CreateExam />} />
              <Route path="student/:studentId" element={<Student />} />
              <Route path="student/:studentId/edit" element={<StudentEdit />} />
              <Route path="requests" element={<Requests />} />
              <Route path="presenty" element={<Presenty admin={admin} />} />

              <Route
                path="presenty/singly"
                element={<SinglyMarking admin={admin} />}
              />
              <Route
                path="presenty/doubly"
                element={<QrcodeMarking admin={admin} />}
              />
              <Route
                path="presenty/doubly/:qrcodeId"
                element={<QrcodeMarkingNew />}
              />
              <Route
                path="presenty/doubly/verify/:qrencodedId"
                element={<QrcodeMarkingVerify />}
              />
              <Route path="subjects" element={<Subjects />} />
            </>
          )}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
