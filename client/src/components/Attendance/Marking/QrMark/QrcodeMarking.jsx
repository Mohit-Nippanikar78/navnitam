import axios from "axios";
import React from "react";
import { AiOutlineAppstoreAdd, AiOutlineQrcode } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl, userInfo } from "utils";

const QrcodeMaking = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className=" flex justify-between items-center mx-2  ">
        <div className="font-bold text-xl">Recent Lectures</div>

        <button
          type="button"
          class="flex  mr-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            userInfo().then((user) => {
              axios
                .post(serverUrl + "/qrmark/new", { classId: user.class })
                .then((res) => {
                  console.log(res.data);
                  navigate(`${res.data}`);
                });
            });
          }}
        >
          <AiOutlineAppstoreAdd size={23} className="mr-2" /> Create Lecture
        </button>
      </div>
      <div class="flex flex-col container   mx-auto w-full items-center justify-center bg-white :bg-gray-800 rounded-lg shadow">
        <ul class="flex flex-col divide-y w-full">
          <li class="flex flex-row">
            <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
              <div class=" mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <AiOutlineQrcode className="h-6 w-6 text-blue-400" />
              </div>
              <div class="flex-1 pl-1">
                <h2 class="font-semibold">548 Posts</h2>
                <div class="text-gray-600 :text-gray-200 text-sm">
                  Developer
                </div>
              </div>
              <div class="flex flex-row justify-center">
                <div class="text-gray-600 :text-gray-200 text-xs">6:00 AM</div>
                <button class="w-10 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    class="hover:text-gray-800 :hover:text-white :text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </li>
          <li class="flex flex-row">
            <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
              <div class=" mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-blue-50">
                <AiOutlineQrcode className="h-6 w-6 text-red-400" />
              </div>
              <div class="flex-1 pl-1">
                <div class="font-medium :text-white">Jean Marc</div>
                <div class="text-gray-600 :text-gray-200 text-sm">
                  Last authored 1 day ago
                </div>
              </div>
              <div class="flex flex-row justify-center">
                <div class="text-gray-600 :text-gray-200 text-xs">6:00 AM</div>
                <button class="w-10 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    class="hover:text-gray-800 :hover:text-white :text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default QrcodeMaking;
