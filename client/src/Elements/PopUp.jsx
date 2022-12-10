import React from "react";
import { HiShare } from "react-icons/hi";

const PopUp = ({ operation, message }) => {
  return (
    <div
      class=" fixed bottom-[50px] right-[10px]  flex items-center p-2  w-full max-w-xs text-gray-500 bg-white rounded-lg shadow "
      role="alert"
    >
      <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
        {operation == "linkCopy" && <HiShare />}
      </div>
      <div class="ml-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default PopUp;
