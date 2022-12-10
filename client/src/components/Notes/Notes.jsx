import axios from "axios";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUser, serverUrl } from "utils";
import Spinner from "Elements/Spinner";
import Modals from "Elements/Modals";
import NotesFiles from "./Files/NotesFiles";
const Notes = () => {
  let n = useNavigate();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser().then((user) => {
      axios.get(serverUrl + `/notesFolder/class/${user.class}`).then((res) => {
        setFolders(res.data);
        setLoading(false);
      });
    });
  }, []);
  if (loading) return <Spinner message="Getting Folders" />;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {folders.map((item, i) => {
          return (
            <NotesFolder
              fold={item}
              key={i}
              foldi={i}
              folders={folders}
              setFolders={setFolders}
            />
          );
        })}
      </div>
      {/* Here will be files and all */}
      <NotesFiles folderId="main" />
    </div>
  );
};
const NotesFolder = ({ fold, folders, setFolders, foldi }) => {
  const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState(false);
  let ng = useNavigate();
  return (
    <div className=" mx-auto  w-full  px-3 py-1 ">
      {modal && (
        <Modals
          setModal={setModal}
          title="Note"
          content={`Delete ${fold.fname} folder`}
          confirmBox={true}
          operation="deleteFolder"
          folderId={fold._id}
        />
      )}
      <div
        className={`flex items-center  rounded-md p-2 md:p-3 text-white cursor-pointer transition duration-500 ease-in-out hover:shadow ${
          fold.fcolor
        } hover:${fold.fcolor?.slice(0, -3)}600 `}
      >
        <div
          onClick={() => {
            ng(`/notes/folder/${fold._id}`);
          }}
        >
          <svg
            fill="currentColor"
            className="md:w-10 md:h-10 w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path>
          </svg>
        </div>
        <div
          className="px-3 w-full mr-auto"
          onClick={() => {
            ng(`/notes/folder/${fold._id}`);
          }}
        >
          <h4 className="font-bold text-base">{fold.fname}</h4>
          <small className="text-xs">{fold.fdesc}</small>
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
            className="z-40"
          >
            <svg
              fill="currentColor"
              className="md:w-5 md:h-5 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
            </svg>
          </div>
          {toggle && (
            <OutsideClickHandler
              onOutsideClick={() => {
                setToggle(false);
              }}
            >
              <div className="z-20 options absolute bg-white text-gray-600 origin-top-right right-0 mt-2 w-56 rounded-md shadow-lg overflow-hidden">
                <div
                  className="flex py-3 px-2 text-sm font-bold hover:bg-gray-100 "
                  onClick={() => {
                    ng(`/notes/folder/edit/${fold._id}`);
                  }}
                >
                  <span className="mr-auto">Edit</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </div>
                {/* <div
                  href="javascript:;"
                  className="flex py-3 px-2 text-sm font-bold hover:bg-gray-100"
                >
                  <span className="mr-auto">Download</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path
                      fill-rule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div> */}
                <div
                  href="javascript:;"
                  className="flex py-3 px-2 text-sm font-bold hover:bg-gray-100"
                >
                  <span className="mr-auto">Change Color</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div x-show="color" className="flex flex-wrap p-2">
                  {/* <div className="w-1/5 h-8 hover:bg-gray-700 bg-gray-500"></div>
                  <div className="w-1/5 h-8 hover:bg-blue-700 bg-blue-500"></div>
                  <div className="w-1/5 h-8 hover:bg-red-700 bg-red-500"></div>
                  <div className="w-1/5 h-8 hover:bg-orange-700 bg-orange-500"></div>
                  <div className="w-1/5 h-8 hover:bg-yellow-700 bg-yellow-500"></div>
                  <div className="w-1/5 h-8 hover:bg-green-700 bg-green-500"></div>
                  <div className="w-1/5 h-8 hover:bg-teal-700 bg-teal-500"></div>
                  <div className="w-1/5 h-8 hover:bg-indigo-700 bg-indigo-500"></div>
                  <div className="w-1/5 h-8 hover:bg-purple-700 bg-purple-500"></div> */}
                  {[
                    "bg-pink-500",
                    "bg-purple-500",
                    "bg-indigo-500",
                    "bg-purple-500",
                    "bg-teal-500",
                    "bg-green-500",
                    "bg-yellow-500",
                    "bg-orange-500",
                    "bg-red-500",
                    "bg-blue-500",
                  ].map((item) => {
                    return (
                      <div
                        className={`w-1/5 h-8  ${item} hover:${item?.slice(
                          0,
                          -3
                        )}-600`}
                        onClick={() => {
                          axios.put(
                            serverUrl + `/notesFolder/update/${fold._id}`,
                            {
                              fcolor: item,
                            }
                          );
                          let foldtemp = folders.map((fo, foi) => {
                            console.log(foi, foldi);
                            if (foi == foldi) {
                              return { ...fo, fcolor: item };
                            } else {
                              return fo;
                            }
                          });
                          setFolders(foldtemp);
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div
                  className="flex py-3 px-2 text-sm font-bold bg-red-400 text-white cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    console.log("fjjfddddfdfd");
                  }}
                >
                  <span className="mr-auto">Delete</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
