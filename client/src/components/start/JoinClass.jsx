import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import Axios from "axios";
import moment from "moment";
import { getAdmins, userInfo, serverUrl } from "../../utils";

const JoinClass = () => {
  const [admins, setAdmins] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    Axios.get(serverUrl + `/admin/all`).then((res) => {
      setAdmins(res.data);
    });
  }, []);

  return (
    <div>
      <div className="font-extrabold w-full flex justify-center text-md">
        Join One Class
      </div>

      <div className="overflow-y-auto h-[70vh]">
        {admins?.map((item, i) => {
          return <Class info={item} setModal={setModal} key={i} />;
        })}
      </div>

      {modal && (
        <div
          onClick={() => {
            setModal(false);
          }}
          class="bg-slate-500 bg-opacity-50 modal fade fixed flex items-center justify-center top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        >
          <div class="modal-dialog relative pointer-events-none w-4/5 md:w-1/3">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  class="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Note
                </h5>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  ariaLabel="Close"
                ></button>
              </div>
              <div class="modal-body relative p-4">
                Contact your CR for your admission in that class.
              </div>
              <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  class="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Class = ({ info, setModal }) => {
  const [applied, setApplied] = useState();
  const [clicked, setClicked] = useState(false);
  const [obj, setObj] = useState("");
  useEffect(() => {
    userInfo().then((user) => {
      setObj(user);
      if (info.pendingStudents.includes(user._id)) {
        setApplied(true);
      }
    });
  }, []);
  useEffect(() => {
    console.log(applied, clicked);
    if (clicked) {
      if (applied) {
        Axios.put(serverUrl + `/admin/pendingStudents/add`, {
          classId: info._id,
          studentId: obj._id,
        }).then(() => {
          setModal(true);
        });
      } else if (applied == undefined) {
        console.log("nothin");
      } else {
        Axios.put(serverUrl + `/admin/pendingStudents/remove`, {
          classId: info._id,
          studentId: obj._id,
        });
      }
    }
  }, [applied]);

  return (
    <div className="m-2">
      <div class=" bg-opacity-40 p-2 backdrop-blur-md rounded-xl drop-shadow-lg flex items-center justify-between">
        <div class="flex-1  ">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {info.name}
          </h2>
          <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <BsPeopleFill size={18} className="mx-2" />
              {info.studentsCount} students
            </div>

            <div class="mt-2 flex items-center text-sm text-gray-500">
              <svg
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {moment(info.createdAt).fromNow()}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <RiAdminFill size={18} className="mx-2" />
              {info.crName.name}
            </div>
          </div>
        </div>
        <div class=" flex items-center lg:mt-0 lg:ml-4">
          {!applied ? (
            <span class=" ml-3">
              <button
                type="button"
                class="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setClicked(true);
                  setApplied(true);
                }}
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  ariaHidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Join
              </button>
            </span>
          ) : (
            <span class="sm:ml-3">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setClicked(true);

                  setApplied(false);
                }}
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  ariaHidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Applied
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
