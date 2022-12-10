import axios from "axios";
import Spinner from "Elements/Spinner";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, serverUrl } from "utils";

const NotesNewFolder = () => {
  let navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [fdesc, setFdesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState([]);
  const [classId, setClassId] = useState("");
  useEffect(() => {
    fetchUser()
      .then((user) => {
        setClassId(user.class);
        axios
          .get(serverUrl + `/subjects/${user.class}?name=true`)
          .then((res) => {
            setSubject(res.data);
            console.log(res.data);
          });
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) <Spinner message="Creating New Folder" />;
  return (
    <div class="mx-auto   mx-2 border bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-[#64748B]">Fill details of Folder</span>
      </div>

      <div class="mt-6">
        <div class="font-semibold">Folder Name</div>
        <div>
          <input
            value={fname}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="..."
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
        </div>
        <div class="flex justify-between">
          {subject.map((item) => {
            return (
              <div
                class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23]"
                onClick={() => {
                  setFname(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div class="mt-6">
        <div class="font-semibold">Folder Description</div>
        <div>
          <input
            value={fdesc}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="..."
            onChange={(e) => {
              setFdesc(e.target.value);
            }}
          />
        </div>
        <div class="flex justify-between">
          {["Assignments", "notes"].map((item) => {
            return (
              <div
                class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23]"
                onClick={() => {
                  setFdesc(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div class="mt-6">
        <div
          class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
          onClick={() => {
            axios
              .post(serverUrl + `/notesFolder/add`, {
                fname,
                fdesc,
                classId,
              })
              .then(() => {
                navigate("/notes");
              });
          }}
        >
          Add Folder
        </div>
      </div>
    </div>
  );
};

export default NotesNewFolder;
