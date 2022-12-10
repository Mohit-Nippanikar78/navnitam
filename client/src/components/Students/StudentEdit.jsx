import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "utils";

const StudentEdit = () => {
  let { studentId } = useParams();
  const [info, setInfo] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(serverUrl + `/students/${studentId}?info=true`).then((res) => {
      setInfo(res.data);
    });
  }, []);

  return (
    <div class="mx-auto   mx-2 border bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-[#64748B]">Fill details Properly</span>
      </div>

      <div class="mt-6">
        <div class="font-semibold">Student Name</div>
        <div>
          <input
            value={info.name}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="100.00"
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div class="mt-6">
        <div class="font-semibold">Student Roll No</div>
        <div>
          <input
            value={info.rollNo}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="number"
            placeholder="100.00"
            onChange={(e) => {
              setInfo({ ...info, rollNo: e.target.value });
            }}
          />
        </div>
      </div>

      <div class="mt-6">
        <div
          class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
          onClick={() => {
            axios
              .put(serverUrl + `/students/edit/${studentId}`, info)
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

export default StudentEdit;
