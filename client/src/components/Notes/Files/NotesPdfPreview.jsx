import axios from "axios";
import Spinner from "Elements/Spinner";
import React, { useEffect, useState } from "react";
import { AiOutlineFileJpg } from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdPhotoLibrary, MdPictureAsPdf } from "react-icons/md";
import { SiJpeg } from "react-icons/si";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { WhatsappShareButton } from "react-share";
import { serverUrl } from "utils";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const NotesPdfPreview = () => {
  let ng = useNavigate();
  let { fileId } = useParams();
  const [file, setFile] = useState({});
  const [edit, setEdit] = useState(false);
  const [pname, setPname] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(serverUrl + `/notesPdf/file/${fileId}`)
      .then((res) => {
        setPname(res.data.fname);
        setFile(res.data);
        console.log(res.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner message="Preview for File" />;

  return (
    <>
      <div className="  rounded-xl w-full h-full   mb-2 bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
        <div className="flex flex-col justify-between h-full bg-white text-white rounded-xl relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-600 z-20 rounded-xl z-[1] bg-opacity-50">
            <div className="w-full flex items-center justify-center mt-16 ">
              <a
                href={`${file.fileUrl}`}
                target="_blank"
                download
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative group overflow-hidden px-8 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600"
              >
                <FaCloudDownloadAlt size={23} />{" "}
                <span className="relative text-sm text-white">Download </span>
              </a>
            </div>
          </div>
          <div className=" rounded overflow-hidden shadow-lg border relative">
            {file.ftype == "pdf" && (
              <Document file={file.fileUrl}>
                <Page
                  pageNumber={1}
                  width={window.innerWidth / 2}
                  height={100}
                />
              </Document>
            )}
            {["jpeg", "img"].includes(file.ftype) && (
              <img src={file.fileUrl} alt="" />
            )}

            <button className="z-[2] absolute bottom-4 flex mx-2 items-center w-[-webkit-fill-available]  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center  mb-2">
              {file.ftype == "pdf" && (
                <MdPictureAsPdf size={20} className="mr-2" />
              )}
              {file.ftype == "jpeg" && <SiJpeg size={20} className="mr-2" />}
              {file.ftype == "jpg" && (
                <AiOutlineFileJpg size={20} className="mr-2" />
              )}
              {file.ftype == "img" && (
                <MdPhotoLibrary size={20} className="mr-2" />
              )}

              <span className="px-2 py-4 text-2xl text-gray-100 border-l-2 border-gray-100 font-mono"></span>
              <div className="text-sm whitespace-normal font-mono font-bold pt-0.5">
                {pname}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div>
        {edit && (
          <div className="px-6 py-4">
            <div className=" w-full z-40 bg-gray-100">
              <input
                type="text"
                value={pname}
                onChange={(e) => {
                  setPname(e.target.value);
                }}
                className="w-2/3 mx-2"
              />
              <button
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          navigator.share({
            files: file?.fileUrl,
            title: "Images",
            text: "",
          });
        }}
      >
        {" "}
        lol hiebrorororororororor
      </div>
    </>
  );
};

export default NotesPdfPreview;
