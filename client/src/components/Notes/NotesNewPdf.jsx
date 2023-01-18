import { upload } from "@testing-library/user-event/dist/upload";
import axios from "axios";
import fileSize from "file-size";
import React, { useEffect, useState } from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { fetchUser, serverUrl } from "utils";

const NotesNewPdf = ({ admin }) => {
  let ng = useNavigate();
  const location = useLocation();

  const [pdf, setPdf] = useState([]);

  const [saved, setSaved] = useState(false);
  const [classId, setClassId] = useState("");
  const [status, setStatus] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folderId, setFolderId] = useState("main");
  const navigate = useNavigate();
  useEffect(() => {
    setFolderId(location.state.folderId);
    console.log(location.state.folderId);
    fetchUser().then((user) => {
      axios.get(serverUrl + `/notesFolder/class/${user.class}`).then((res) => {
        setFolders(res.data);
      });

      setClassId(user.class);
    });
  }, []);
  useEffect(() => {
    console.log(pdf);
  }, [pdf]);

  useEffect(() => {
    var statusss = 0;
    status.map((item) => [item && statusss++]);
    console.log(statusss, pdf.length);
    if (saved && statusss == pdf.length) {
      ng("/notes");
    }
  }, [status]);
  if (!admin) {
    navigate("/");
    return;
  }
  return (
    <div>
      <div className="mx-auto fon    mx-2 border bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Fill details of File</span>
        </div>

        <label
          for="countries"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Folder
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) => {
            setFolderId(e.target.value);
            console.log(e.target.value);
          }}
          value={folderId}
        >
          <option value="main">main</option>
          {folders.map((item, i) => {
            return (
              <option value={item._id} key={i}>
                {item.fname}
              </option>
            );
          })}
        </select>

        <div className="mt-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            for="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none "
            id="file_input"
            multiple
            onChange={(e) => {
              setPdf(e.target.files);
            }}
            type="file"
          />

          <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
            PDF or IMG
          </p>
        </div>
        {pdf.length !== 0 && (
          <div className="overflow-x-auto p-2 relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 pl-6">
                    Type
                  </th>
                  <th scope="col" className="py-3 px-6">
                    File Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {saved ? "Status" : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...pdf].map((item, i) => {
                  return (
                    <NotesUploadFile
                      item={item}
                      key={i}
                      saved={saved}
                      classId={classId}
                      setStatus={setStatus}
                      folderId={folderId}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <div
            className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
            onClick={() => {
              setSaved(true);
            }}
          >
            Upload Files
          </div>
        </div>
      </div>
    </div>
  );
};

const NotesUploadFile = ({ item, saved, classId, setStatus, folderId }) => {
  const [pname, setPname] = useState(item.name);
  const [edit, setEdit] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  useEffect(() => {
    if (saved) {
      let psize = fileSize(item.size, {
        fixed: 2,
        spacer: " ",
      }).human("si");
      let form = new FormData();

      form.append("file", item);
      form.append("upload_preset", "tzhnmdgj");
      form.append("folder", "navnitam");
      axios
        .post("https://api.cloudinary.com/v1_1/dk5acaaxg/auto/upload", form, {
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));
          },
        })
        .then((res) => {
         
          axios
            .post(
              serverUrl + `/notesPdf/new`,
              {
                fname: pname,
                fsize: psize,
                ftype: item.type.split("/")[1],
                fileUrl: res.data.secure_url,
                classId,
                folderId,
                public_id: res.data.public_id,
              },
              { headers: { "Access-Control-Allow-Origin": "*" } }
            )
            .then((res) => {
              if(res.data == "success")
              setStatus((array) => [...array, true]);
            });
        });
    }
  }, [saved]);

  return (
    <tr className=" border-b odd:bg-white even:bg-gray-50 relative ">
      <td className="py-4 pl-6">
        {item.type.split("/")[1] == "pdf" && <MdPictureAsPdf size={20} />}
      </td>
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
      >
        {pname}
      </th>
      <td className="py-4 px-6">
        <div
          className="font-medium text-blue-600 cursor-pointer"
          onClick={() => {
            uploaded == 0 && setEdit(true);
          }}
        >
          {uploaded == 0 ? "Edit" : `${uploaded}%`}
        </div>
      </td>
      {edit && (
        <div className="absolute w-full left-0 top-10 z-40 bg-gray-100">
          <input
            type="text"
            value={pname}
            onChange={(e) => {
              setPname(e.target.value);
            }}
            className="w-2/3 mx-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setEdit(false);
            }}
          >
            Save
          </button>
        </div>
      )}
    </tr>
  );
};
export default NotesNewPdf;
