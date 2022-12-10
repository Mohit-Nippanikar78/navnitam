import React, { useEffect, useState } from "react";
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { BiLogOut, BiMicrophone } from "react-icons/bi";
import { HiShare } from "react-icons/hi";
import {
  BsBackspace,
  BsThreeDotsVertical,
  BsWindowSidebar,
} from "react-icons/bs";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { sidebarMenu } from "utils";
import OutsideClickHandler from "react-outside-click-handler";
import { AiFillDelete, AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import PopUp from "Elements/PopUp";
import { MdEdit } from "react-icons/md";
import Modals from "Elements/Modals";
import { IoReorderTwo } from "react-icons/io5";

const Navbar = ({ searchTerm, setSearchTerm, user, admin }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const [popUp, setPopUp] = useState("");

  const [scrollY, setScrollY] = useState(0);
  const [compo, setCompo] = useState("Home");
  const [filePreview, setFilePreview] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollY(window.scrollY);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setPopUp("");
    }, 2000);
  }, [popUp]);

  useEffect(() => {
    onHashChanges();
  }, [location]);
  async function onHashChanges() {
    setFilePreview(window.location.pathname.split("/").includes("preview"));
    let indexofbuttons = sidebarMenu
      .map(function (e) {
        return e.to.split("/")[1];
      })
      .indexOf(window.location.pathname.split("/")[1]);
    setCompo(sidebarMenu[indexofbuttons].name);
  }

  return (
    <div
      className={`flex flex-col fixed bg-white z-30 ${
        scrollY !== 0 && "shadow-md"
      }`}
      style={{ width: window.innerWidth > 768 ? "calc(100% - 85px)" : "100%" }}
    >
      {/* <button onClick={()=>{navigate("/presenty/doubly/verify/fffffffh")}}>fffb</button> */}
      {modal && (
        <Modals
          setModal={setModal}
          title="Attention"
          content="Delete this File"
          confirmBox={true}
          operation="deleteFile"
        />
      )}
      {popUp == "linkCopy" && (
        <PopUp message="Link Copied" operation="linkCopy" />
      )}
      <div className=" w-full capitalize flex items-center m-auto  ">
        <img
          className="w-10 h-10 rounded-full m-2 mb-0"
          src={
            user?.profile ||
            "https://i.pinimg.com/236x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
          }
          alt=""
        />
        <div className="tracking-4 font-extrabold text-lg aquire text-center w-full ">
          {compo}
        </div>
        <div
          className="mx-2  bg-black text-white rounded-lg w-14 h-10 md:w-14 md:h-12 flex justify-center items-center"
          onClick={() => setDropdown(!dropdown)}
        >
          <BsThreeDotsVertical fontSize={21} />
        </div>
      </div>
      <div className="flex flex-row items-center  w-full ">
        <div className="flex flex-row relative justify-start items-center focus-within:shadow-md m-4 w-full bg">
          <div
            onClick={() => navigate(-1)}
            className="mx cursor-pointer bg-[#1F1F21] text-white rounded-lg w-10 h-10 md:w-14 md:h-12 flex justify-center items-center"
          >
            <BsBackspace fontSize={21} />
          </div>
          <IoMdSearch fontSize={20} className="mx-2" />

          <input
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            className="p-2 w-full bg-slate-200 outline-0 rounded-sm"
            placeholder="Search..."
          />
          <div className="absolute top-0 right-0">
            {dropdown && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setDropdown(false);
                }}
              >
                <div class=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
                  <ul
                    class="py-1 text-sm text-gray-700 "
                    onClick={() => {
                      setDropdown(false);
                    }}
                  >
                    {compo == "Notes" && !filePreview && (
                      <>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              console.log("BDBDBDBDBDBDDBDBBDBB");
                              navigate("/notes/file/new", {
                                replace: true,
                                state: {
                                  folderId:
                                    window.location.pathname == "/notes"
                                      ? "main"
                                      : window.location.pathname.split("/")[3],
                                },
                              });
                            }}
                          >
                            <AiFillFileAdd size={20} className="mr-2" /> Add
                            File
                          </div>
                        </li>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              navigate("/notes/folder/new");
                            }}
                          >
                            <AiFillFolderAdd size={20} className="mr-2" /> Add
                            Folder
                          </div>
                        </li>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              window.location =
                                window.location.pathname + "?reorder=true";
                            }}
                          >
                            <IoReorderTwo size={20} className="mr-2" /> ReOrder
                          </div>
                        </li>
                      </>
                    )}
                    {filePreview && (
                      <>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              navigate(
                                `notes/file/${
                                  window.location.pathname.split("/")[4]
                                }/edit`
                              );
                            }}
                          >
                            <MdEdit size={20} className="mr-2" /> Edit
                          </div>
                        </li>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.href
                              );
                              setPopUp("linkCopy");
                            }}
                          >
                            <HiShare size={20} className="mr-2" /> Share
                          </div>
                        </li>
                        <li className="cursor-pointer">
                          <div
                            class="block py-2 px-4 hover:bg-gray-100 flex "
                            onClick={() => {
                              setModal(true);
                            }}
                          >
                            <AiFillDelete size={20} className="mr-2" /> Delete
                          </div>
                        </li>
                      </>
                    )}
                    <li className="cursor-pointer">
                      <div
                        class="block py-2 px-4 hover:bg-gray-100 flex "
                        onClick={() => {
                          localStorage.removeItem("userInfo");
                          navigate("/login");
                        }}
                      >
                        <BiLogOut size={20} className="mr-2" /> Log out
                      </div>
                    </li>
                  </ul>
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {/* <div
            
            className="mx-2 bg-[#1F1F21] text-white rounded-lg w-10 h-10 md:w-14 md:h-12 flex justify-center items-center"
          >
            <BiMicrophone fontSize={21} />
          </div> */}
        </div>
      </div>
    </div>
  );
  return null;
};

export default Navbar;
