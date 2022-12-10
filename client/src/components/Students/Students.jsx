import React, { useEffect, useState } from "react";
import { FaAngleRight, FaChalkboardTeacher } from "react-icons/fa";
import Axios from "axios";
import { userInfo, serverUrl, fetchUser } from "../../utils";
import Spinner from "../../Elements/Spinner";
import { useNavigate } from "react-router-dom";
const Team = () => {
  const [studs, setStuds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    fetchUser().then((user) => {
      user.administrator && setAdmin(true);
      Axios.get(serverUrl + `/admin/info/${user.class}?students=true`)
        .then((res) => {
          setStuds(res.data);
        })
        .then(() => {
          setLoading(false);
        });
      Axios.get(serverUrl + `/admin/info/${user.class}?info=true`)
        .then((res) => {
          setClassInfo(res.data);
          console.log(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    });
  }, []);
  if (loading) return <Spinner message="Getting Students..." />;
  return (
    <>
      <div className="flex flex-col  mx-2 items-center py-2 px-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg   ">
        <div className="capitalize mr-auto my-1">{classInfo?.className}</div>
        <div className="text-blue-100 grid grid-cols-2 w-full">
          <div className="text-sm inline-flex font-thin">
            <FaChalkboardTeacher size={18} className="mx-1" />
            {classInfo?.crName}
          </div>
          <div className="text-sm inline-flex">
            Students : {classInfo?.sCount}
          </div>
        </div>
      </div>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="m-2 w-[-webkit-fill-available] text-sm text-left text-gray-500  ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="py-3 px-6">
                Roll No
              </th>
              <th scope="col" class="py-3 px-6">
                Name
              </th>

              {admin && (
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Info</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {studs.map((stud, i) => {
              return <StudentB stud={stud} key={i} admin={admin} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
const StudentB = ({ stud, admin }) => {
  let navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        if (admin) {
          navigate(`/student/${stud._id}`);
        }
      }}
      class="cursor-pointer bg-white border-b  hover:bg-gray-50 "
    >
      <td class="py-4 px-6">{stud.rollNo}</td>
      <th
        scope="row"
        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
      >
        {stud.name}
      </th>

      {admin && (
        <td class="py-4 px-6 text-right">
          <a href="#" class="font-medium text-blue-600  hover:underline">
            Edit
          </a>
        </td>
      )}
    </tr>
  );
};

export default Team;
