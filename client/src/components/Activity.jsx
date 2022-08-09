import React, { useEffect, useState } from "react";
import Image1 from "../assets/notifications.svg";
import Axios from "axios";
import { userInfo, serverUrl } from ".././utils";
import { FaBookDead } from "react-icons/fa";
import moment from "moment";
import Spinner from "./Spinner";
const Activity = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  // return (
  //   <div
  //     className=" flex items-center justify-center "
  //     style={{ height: "80vh" }}
  //   >
  //     <div className="">
  //       <img src={Image1} className="w-2/3 mx-auto" alt="Notifications !!" />
  //       <div className="text-base mt-6 text-lg font-bold text-center ">
  //         You'll find notifications here
  //       </div>
  //       <div className="text-slate-400 text-xs  text-center w-2/3 mx-auto ">
  //         Stay on top for relevant activity for chats , reminders,calender etc
  //       </div>
  //     </div>
  //   </div>
  // );
  useEffect(() => {
    userInfo().then((user) => {
      Axios.get(serverUrl + `/notify/student/${user._id}`)
        .then((res) => {
          setModels(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    });
  }, []);
  if (loading) return <Spinner message="Getting Notifications..." />;
  return (
    <div className="w-full  h-full ">
      <div className=" bg-gray-50 p-8  right-0">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold leading-6 text-gray-800">
            Notifications
          </p>
        </div>

        {/* <h2 className="text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600">
          YESTERDAY
        </h2> */}
        {models.map((Noti, i) => {
          return <NotifyBox Noti={Noti} key={i} />;
        })}

        <div className="flex items-center justiyf-between">
          <hr className="w-full" />
          <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
            Thats it for now :)
          </p>
          <hr className="w-full" />
        </div>
      </div>
    </div>
  );
};
const NotifyBox = ({ Noti }) => {
  if (Noti.type == "absenty") {
    return (
      <div className="w-full p-3 mt-4 bg-red-100 rounded flex items-center">
        <div className="w-8 h-8 border rounded-full border-red-200 flex items-center flex-shrink-0 justify-center">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2V14C14 14.1768 13.9298 14.3464 13.8047 14.4714C13.6797 14.5964 13.5101 14.6667 13.3333 14.6667H2.66667C2.48986 14.6667 2.32029 14.5964 2.19526 14.4714C2.07024 14.3464 2 14.1768 2 14V2C2 1.82319 2.07024 1.65362 2.19526 1.5286C2.32029 1.40357 2.48986 1.33334 2.66667 1.33334H13.3333C13.5101 1.33334 13.6797 1.40357 13.8047 1.5286C13.9298 1.65362 14 1.82319 14 2ZM3.33333 10.6667V13.3333H12.6667V10.6667H3.33333ZM10 11.3333H11.3333V12.6667H10V11.3333Z"
              fill="#B91C1C"
            />
          </svg>
        </div>
        <div className="pl-3 w-full flex flex-col  justify-between">
          <p className="text-sm leading-none text-red-700">
            You were marked Absent for
            <span className="text-indigo-700">
              {" " + Noti.subjectId.subjectName + " "}
            </span>
            lecture conducted on
            <span className="text-indigo-700">
              {" " + moment(Noti.absentDate).format("MMM Do YY") + " "}
            </span>
            at
            <span className="text-indigo-700">{" " + Noti.timing}</span>
          </p>
          <p className="text-xs leading-3 pt-1 text-gray-500">
            
            {moment(Noti.createdAt).fromNow()}
          </p>
        </div>
      </div>
    );
  } else if (Noti.type == "fresher") {
    return (
      <div className="w-full p-3 mt-4 bg-white rounded shadow flex flex-shrink-0">
        <div className="w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z"
              fill="#047857"
            />
          </svg>
        </div>
        <div className="pl-3 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm leading-none">
              <span className="text-indigo-700">Sash</span> added you to the
              group: <span className="text-indigo-700">UX Designers</span>
            </p>
            <div className="cursor-pointer">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L3.5 10.5"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 3.5L10.5 10.5"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
        </div>
      </div>
    );
  } else if (Noti.type == "SubjectAttLow") {
    return (
      <div className="w-full p-3 mt-4 bg-white rounded flex">
        <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
          <FaBookDead />
        </div>
        <div className="pl-3">
          <p className="text-sm leading-none">
            Shipmet delayed for order
            <span className="text-indigo-700"> #25551</span>
          </p>
          <p className="text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
        </div>
      </div>
    );
  } else if (Noti.type == "message") {
    return (
      <div className="w-full p-3 mt-4 bg-white rounded flex">
        <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
              fill="#4338CA"
            />
          </svg>
        </div>
        <div className="pl-3">
          <p className="text-sm leading-none">
            <span className="text-indigo-700">Sarah</span> posted in the thread:
            <span className="text-indigo-700">Update gone wrong</span>
          </p>
          <p className="text-xs leading-3 pt-1 text-gray-500">
            {moment(Noti.date).fromNow()}
          </p>
        </div>
      </div>
    );
  } else if (Noti.type == "liked") {
    return (
      <div className="w-full p-3 mt-8 bg-white rounded flex">
        <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
              fill="#EF4444"
            />
          </svg>
        </div>
        <div className="pl-3">
          <p className="text-sm leading-none">
            <span className="text-indigo-700">James Doe</span> favourited an
            <span className="text-indigo-700">item</span>
          </p>
          <p className="text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
        </div>
      </div>
    );
  } else if (Noti.type == "completed") {
    return (
      <div className="w-full p-3 mt-8 bg-green-100 rounded flex items-center">
        <div className="w-8 h-8 border rounded-full border-green-200 flex flex-shrink-0 items-center justify-center">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
              fill="#047857"
            />
          </svg>
        </div>
        <div className="pl-3 w-full">
          <div className="flex items-center justify-between">
            <p className="text-sm leading-none text-green-700">
              Design sprint completed
            </p>
            <p className="text-xs leading-3 underline cursor-pointer text-green-700">
              View
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};
export default Activity;
