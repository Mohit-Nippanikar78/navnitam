import React from "react";
import Image1 from "../assets/notifications.svg";

const Activity = () => {
  return (
    <div
      className=" flex items-center justify-center "
      style={{ height: "80vh" }}
    >
      <div className="">
        <img src={Image1} className="w-2/3 mx-auto" alt="Notifications !!" />
        <div className="text-base mt-6 text-lg font-bold text-center ">
          You'll find notifications here
        </div>
        <div className="text-slate-400 text-xs  text-center w-2/3 mx-auto ">
          Stay on top for relevant activity for chats , reminders,calender etc
        </div>
      </div>
    </div>
  );
};

export default Activity;
