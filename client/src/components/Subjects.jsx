import React, { useEffect, useState } from "react";
import { BsFillPlusSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import TeamLogo from "../assets/images/teamsLogo.jpg";
import OutsideClickHandler from "react-outside-click-handler";
import { fetchUser, userInfo, serverUrl } from "../utils";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const Subjects = () => {
  const [newSubject, setNewSubject] = useState(false);
  const [editSubject, setEditSubject] = useState({ order: false, subId: "" });
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    let paramss = new URLSearchParams(window.location.search);
    paramss.get("new") == "true" && setNewSubject(true);

    userInfo().then((user) => {
      Axios.get(serverUrl + `/subjects/${user.class}`).then((res) => {
        setSubs(res.data);
        setLoading(false);
      });
      userInfo().then((user) => user.administrator && setAdmin(true));
    });
  }, []);
  useEffect(() => {
    editSubject.order && setNewSubject(true);
  }, [editSubject]);

  if (loading) {
    return <Spinner message="Getting Subjects" />;
  }

  return (
    <>
      {newSubject && !editSubject.order && admin && (
        <NewSubject setNewSubject={setNewSubject} />
      )}
      {newSubject && editSubject.order && admin && (
        <NewSubject
          setNewSubject={setNewSubject}
          editSubject={editSubject}
          setEditSubject={setEditSubject}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 m-2 ">
        {subs.map((sub) => {
          return <Subject sub={sub} setEditSubject={setEditSubject} />;
        })}
        {admin && (
          <div
            className="cursor-pointer max-w-sm pb-3 bg-white flex flex-col justify-center items-center rounded-lg border  shadow-md  min-h-[100px]"
            onClick={() => {
              setNewSubject(true);
            }}
          >
            <BsFillPlusSquareFill size={30} />
            <div className="font-extrabold">Add Subject</div>
          </div>
        )}
      </div>
    </>
  );
};
const NewSubject = ({ setNewSubject, setEditSubject, editSubject }) => {
  let navigate = useNavigate();
  const [subName, setSubName] = useState("");
  const [subTr, setSubTr] = useState("");
  const [problem, setProblem] = useState(false);
  const [subCode, setSubCode] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (editSubject?.order) {
      setEdit(true);
      Axios.get(serverUrl + `/subjects/info/${editSubject.subId}`).then(
        (res) => {
          let { subjectName, subjectCode, faculty } = res.data;
          setSubCode(subjectCode);
          setSubName(subjectName);
          setSubTr(faculty);
        }
      );
    }
  }, []);

  return (
    <div
      className="z-20 w-full h-screen fixed flex items-center justify-center  bg-red-400 top-0"
      style={{
        background: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="z-20 bg-white  p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
        <OutsideClickHandler
          onOutsideClick={() => {
            setNewSubject(false);
          }}
        >
          <form action="">
            <div className="mb-5">
              <label for="lgbtq" className="block mb-2 font-bold text-gray-600">
                Subject Name
              </label>
              <input
                type="text"
                id="lgbtq"
                placeholder="..."
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                for="twitter"
                className="block mb-2 font-bold text-gray-600"
              >
                Faculty Name
              </label>
              <input
                value={subTr}
                onChange={(e) => setSubTr(e.target.value)}
                type="text"
                id="twitter"
                placeholder="..."
                className="border  shadow p-3 w-full rounded mb-"
              />
              {problem && (
                <p className="text-sm text-red-400 mt-2">Fill in the Data</p>
              )}
            </div>
            <div className="mb-5">
              <label
                for="fgfgfgfgfgfgfgfggfgfg"
                className="block mb-2 font-bold text-gray-600"
              >
                Subject Code
              </label>
              <input
                value={subCode}
                onChange={(e) => setSubCode(e.target.value)}
                type="text"
                id="fgfgfgfgfgfgfgfggfgfg"
                placeholder="..."
                className="border  shadow p-3 w-full rounded mb-"
              />
              {problem && (
                <p className="text-sm text-red-400 mt-2">Fill in the Data</p>
              )}
            </div>

            <button
              className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                if (subName == "" || subTr == "" || subCode == "") {
                  setProblem(true);
                } else {
                  if (edit) {
                    Axios.put(serverUrl + `/subjects/update`, {
                      _id: editSubject?.subId,
                      faculty: subTr,
                      subjectCode: subCode,
                      subjectName: subName,
                    }).then(() => {
                      window.location = window.location.href.split("?")[0];
                    });
                  } else {
                    fetchUser().then((user) => {
                      console.log({
                        admin: user.class,
                        faculty: subTr,
                        subjectCode: subCode,
                        subjectName: subName,
                      });
                      Axios.post(serverUrl + `/subjects/add`, {
                        admin: user.class,
                        faculty: subTr,
                        subjectCode: subCode,
                        subjectName: subName,
                      }).then((res) => {
                        window.location = window.location.href.split("?")[0];
                      });
                    });
                  }
                }
              }}
            >
              {edit ? "Edit" : "Submit"}
            </button>
          </form>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Subjects;
const Subject = ({ sub, setEditSubject }) => {
  const [toggleO, setToggleO] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setToggleO(false);
      }}
    >
      <div className="max-w-sm pb-3 bg-white rounded-lg border  shadow-md ">
        <div className="relative flex justify-end px-2 pt-4">
          <div
            style={{
              position: "absolute",

              top: "0",
              right: "0",
            }}
            className="absolute top-0 right-0 flex flex-col items-end"
          >
            <button
              className="z-10 w-max flex justify-end items-center sm:inline-block text-gray-500 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
              type="button"
              style={{ margin: "0 0 0 auto" }}
              onClick={() => {
                setToggleO(!toggleO);
              }}
            >
              <BsThreeDotsVertical size={25} />{" "}
            </button>
            {toggleO && (
              <div className=" z-10 w-32 text-base list-none bg-white rounded divide-y divide-gray-100 shadow">
                <ul className="py-1">
                  <li>
                    <div
                      onClick={() => {
                        setEditSubject({ order: true, subId: sub._id });
                      }}
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Edit
                    </div>
                  </li>
                  <li>
                    <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">
                      Export Data
                    </div>
                  </li>
                  <li>
                    <div className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 ">
                      Delete
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <img
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={TeamLogo}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-lg font-medium ">{sub.subjectName}</h5>
          <span className="text-sm text-gray-500 ">{sub.faculty}</span>
          <div className="flex mt-4 space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center py-2 px-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            >
              Add
            </a>
            <a
              href="#"
              className="inline-flex items-center py-2 px-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200   "
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};
