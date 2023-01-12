import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "utils";

const EditFolder = ({admin}) => {
  let { folderId } = useParams();
  const [info, setInfo] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(serverUrl + `/notesFolder/folder/${folderId}`).then((res) => {
      setInfo(res.data);
      console.log(res.data);
    });
  }, []);
if(!admin){
  navigate("/")
  return;
}
  return (
    <div class="mx-auto   mx-2 border bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-[#64748B]">Fill details Properly</span>
      </div>

      <div class="mt-6">
        <div class="font-semibold">Folder Name</div>
        <div>
          <input
            value={info.fname}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="100.00"
            onChange={(e) => {
              setInfo({ ...info, fname: e.target.value });
            }}
          />
        </div>
      </div>
      <div class="mt-6">
        <div class="font-semibold">Folder Description</div>
        <div>
          {/* <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
          </div> */}
          <input
            value={info.fdesc}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="100.00"
            onChange={(e) => {
              setInfo({ ...info, fdesc: e.target.value });
            }}
          />
        </div>
      </div>

      <div class="mt-6">
        <div
          class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
          onClick={() => {
            axios
              .put(serverUrl + `/notesFolder/update/${folderId}`, info)
              .then(() => {
                navigate(-1);
              });
          }}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default EditFolder;
