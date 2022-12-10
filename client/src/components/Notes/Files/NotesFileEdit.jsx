import axios, { Axios } from "axios";
import Spinner from "Elements/Spinner";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "utils";

const NotesFileEdit = () => {
  let { fileId } = useParams();
  const [info, setInfo] = useState({});
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(serverUrl + `/notesPdf/file/${fileId}`)
      .then((res) => {
        setInfo(res.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner message="Getting File Info" />;

  return (
    <div class="mx-auto   mx-2 border bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-[#64748B]">Fill details Properly</span>
      </div>

      <div class="mt-6">
        <div class="font-semibold">File Name</div>
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
        <div
          class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
          onClick={() => {
            axios.put(serverUrl + `/notesPdf/edit/${fileId}`, info).then(() => {
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

export default NotesFileEdit;
