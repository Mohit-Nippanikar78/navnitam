import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Axios from "axios";
import { userInfo, serverUrl } from "../utils";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
const Team = () => {
  const [studs, setStuds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userInfo().then((user) => {
      Axios.get(serverUrl + `/admin/info/${user.class}?students=true`)
        .then((res) => {
          setStuds(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    });
  }, []);
  if (loading) return <Spinner message="Getting Students..." />;
  return (
    <div>
      {studs.map((stud, i) => {
        return <StudentB stud={stud} key={i} />;
      })}
    </div>
  );
};
const StudentB = ({ stud }) => {
  let navigate = useNavigate();
  return (
    <div className=" flex m-2 items-center cursor-pointer " onClick={()=>{navigate(`/student/${stud._id}`)}}>
      <div className="flex-1 min-w-0 flex items-center justify-between">
        <h2 className="text-sm font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {stud.name}
        </h2>
        <h2 className="text-sm mr-2   text-gray-400 sm:text-3xl sm:truncate">
          Roll:{stud.rollNo}
        </h2>
      </div>
      <div className="flex items-center lg:mt-0 lg:ml-4">
        <FaAngleRight size={24} />
      </div>
    </div>
  );
};

export default Team;
