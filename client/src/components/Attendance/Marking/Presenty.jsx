import axios from "axios";
import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import QrcodeMarking from "./QrMark/QrcodeMarking";
import SinglyMarking from "./SinglyMarking";

const Presenty = ({admin}) => {
  let navigate = useNavigate();
  if(!admin){navigate("/");return;}
  return (
    <div className="flex ">
      <div class="max-w-sm mx-4 bg-white rounded-lg border border-gray-200 shadow-md :bg-gray-800 :border-gray-700">
        <img
          class="rounded-t-lg"
          src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1667658298/navnitam/mains/Screenshot_2022-11-05_195226_jb0nyk.png"
          alt=""
        />

        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Table Wise Attendance
          </h5>
          <div
            onClick={() => {
              navigate("singly");
            }}
            class="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
          >
            Singly Presenties
            <svg
              aria-hidden="true"
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md :bg-gray-800 :border-gray-700">
        <img
          class="rounded-t-lg"
          src="https://res.cloudinary.com/dk5acaaxg/image/upload/v1667658295/navnitam/mains/cover_62_riqrsk.jpg"
          alt=""
        />

        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Attendance with QR code
          </h5>
          <div
            onClick={() => {
              navigate("doubly");
            }}
            class="cursor-pointer 
            inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
          >
            Qrcode Att
            <svg
              aria-hidden="true"
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presenty;
