import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import base64 from "base-64";
import utf8 from "utf8";
const QrcodeMarkingVerify = () => {
  let { qrencodedId } = useParams();
  const [done, setDone] = useState(false);
  const [reject, setReject] = useState(false);
  useEffect(() => {
    userInfo().then((user) => {
      var bytes = base64.decode(qrencodedId);
      var decodedByter = utf8.decode(bytes);
      console.log(decodedByter);

      axios
        .put(serverUrl + `/qrmark/update/${decodedByter}?verify=true`, {
          studentId: user._id,
          currentTiming: new Date(),
        })
        .then((res) => {
          console.log(res);
          if (res.data == "done") {
            setDone(true);
          } else {
            setReject(true);
          }
        });
    });
  }, []);
  if (reject)
    return (
      <div
       // id="alert-additional-content-2"
        class="mx-2 p-4 mb-4 text-red-900 border border-red-300 rounded-lg bg-red-50 :bg-gray-800 :text-red-400 :border-red-900"
        //role="alert"
      >
        <div class="flex items-center">
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-lg font-bold">Qrcode Timed Out !</h3>
        </div>
        <div class="mt-2 mb-4 text-sm">
         Make sure you note that Qrcode will only be online for 2 minutes . Scan before we discard it 
        </div>
        <div class="flex">
          <button
            type="button"
            class="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center :bg-red-600 :hover:bg-red-700 :focus:ring-red-800"
          >
            <svg
              aria-hidden="true"
              class="-ml-0.5 mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            View more
          </button>
          <button
            type="button"
            class="text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center :hover:bg-red-400 :border-red-400 :text-red-400 :hover:text-white :focus:ring-red-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            Dismiss
          </button>
        </div>
      </div>
    );

  return (
    <>
      {done ? (
        <img
          src="https://gifdb.com/images/high/account-fully-verified-check-mark-r94d8zad5ichwkv3.webp"
          alt=""
        />
      ) : (
        <div className="flex h-1/3 items-center justify-center flex-col m-4">
          <InfinitySpin width="200" color="#4fa94d" />;
          <p className="flex text-lg font-bold items-center m-5">Marking Up</p>
          <p className="flex text-sm text-gray-500 items-center m-2">
            If overtimed contact admin for presenty
          </p>
        </div>
      )}
    </>
  );
};

export default QrcodeMarkingVerify;
