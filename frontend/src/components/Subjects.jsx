import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TeamLogo from "../assets/images/teamsLogo.jpg";
import OutsideClickHandler from "react-outside-click-handler";

const Subjects = () => {
  const [subs, setSubs] = useState([
    { sName: "PCA 2nd Year" },
    { sName: "Maths 1st " },
    { sName: "PCA 2nd Year" },
    { sName: "PCA 2nd Year" },
    { sName: "PCA 2nd Year" },
  ]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 m-2 ">
      {subs.map((sub) => {
        return <Subject sub={sub} />;
      })}
    </div>
  );
};

export default Subjects;
const Subject = ({ sub }) => {
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
          >
            <button
              className=" flex justify-end items-center sm:inline-block text-gray-500 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
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
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Export Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 "
                    >
                      Delete
                    </a>
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
          <h5 className="mb-1 text-lg font-medium ">{sub.sName}</h5>
          <span className="text-sm text-gray-500 ">Visual Designer</span>
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
