import axios from "axios";
import Exception from "Elements/Exception";
import Spinner from "Elements/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineFileJpg } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { IoReorderTwoSharp } from "react-icons/io5";
import {
  MdDelete,
  MdDriveFileMove,
  MdPhotoLibrary,
  MdPictureAsPdf,
} from "react-icons/md";
import { SiJpeg } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  result.forEach((item, index) => {
    item.forder = index + 1;
  });
  return result;
};
const NotesFiles = ({ folderId }) => {
  let ng = useNavigate();
  const [filesNavbar, setFilesNavbar] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const location = useLocation();
  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const projects = reorder(
      files,
      result.source.index,
      result.destination.index
    );
    //store reordered state.
    console.table(projects);

    setFiles(projects);
  };
  useEffect(() => {
    let queryString = new URLSearchParams(window.location.search);
    queryString.get("reorder") == "true" && setDragging(true);

    userInfo().then((user) => {
      if (folderId == "main") {
        axios
          .get(serverUrl + `/notesPdf/class/${user.class}?main=true`)
          .then((res) => {
            setFiles(res.data);
          })
          .then(() => {
            setLoading(false);
          });
      } else {
        axios
          .get(serverUrl + `/notesPdf/folder/${folderId}`)
          .then((res) => {
            setFiles(res.data);
          })
          .then(() => {
            setLoading(false);
          });
      }
    });
  }, []);
  const SaveReOrderFiles = () => {
    const filesTemp = files.map((item) => {
      return item._id;
    });
    console.log(filesTemp);
    axios
      .post(serverUrl + "/notesPdf/reorder", {
        files: filesTemp,
      })
      .then(() => {
        window.location = window.location.href.split("?")[0];
      });
  };
  let filesNavbarCompo = (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      <motion.div
        className=" h-[0px]  shadow-md overflow-hidden
       "
        animate={{
          height: dragging ? "auto" : 0,
          opacity: dragging ? 1 : 0,

          transition: {
            duration: 1,
          },
        }}
      >
        <div className="flex justify-between cloudinary-bg text-white py-2 items-center">
          <div className="mx-2  monospace font=[12px/1.333 Inter,Times New Roman,Times,Baskerville,Georgia,serif]">
            Re Order
          </div>
          <div className="flex items-center">
            <MdDelete size={22} className="cursor-pointer mx-2" />
            <MdDriveFileMove size={22} className="cursor-pointer mx-2" />
            <HiDownload size={22} className="cursor-pointer mx-2 mr-4" />
            <button
              class="bg-white hover:bg-gray-100 text-black mx-2 text-sm font-semibold py px-2 border border-gray-400 rounded shadow"
              onClick={SaveReOrderFiles}
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
  if (loading) return <Spinner message="Getting Files" />;
  else if (files.length == 0)
    return <Exception message="No Files in directory" />;
  else if (dragging) {
    return (
      <>
        {filesNavbarCompo}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  border: "1px solid #242424",
                  opacity: 0.7,
                  borderRadius: "5px",
                }}
              >
                <div className="overflow-x-auto px-2 relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left  ">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        {dragging && <th></th>}
                        <th scope="col" className="py-3 pl-6">
                          Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                          File Name
                        </th>
                        <th scope="col" className="py-3 px-6 hidden md:flex">
                          Size
                        </th>
                        <th scope="col" className="py-3 px-6  "></th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((item, i) => {
                        return (
                          <Draggable
                            draggableId={item._id}
                            key={item._id}
                            index={i}
                          >
                            {(provided) => (
                              <tr
                                className=" border-b   table-row odd:bg-white even:bg-gray-50 cursor-pointer "
                                onClick={() => {
                                  ng(`/notes/pdf/preview/${item._id}`, {
                                    replace: true,
                                  });
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <NotesFile
                                  file={item}
                                  key={i}
                                  dragging={dragging}
                                />
                              </tr>
                            )}
                          </Draggable>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
  return (
    <div className="overflow-x-auto px-2 relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="py-3 pl-6">
              Type
            </th>
            <th scope="col" className="py-3 px-6">
              File Name
            </th>
            <th scope="col" className="py-3 px-6 hidden md:flex">
              Size
            </th>
            <th scope="col" className="py-3 px-6  "></th>
          </tr>
        </thead>
        <tbody>
          {files.map((item, i) => {
            return (
              <tr
                className=" border-b  table-row odd:bg-white even:bg-gray-50 cursor-pointer "
                onClick={() => {
                  ng(`/notes/pdf/preview/${item._id}`, {
                    replace: true,
                  });
                }}
              >
                <NotesFile file={item} key={i} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const NotesFile = ({ file, dragging }) => {
  return (
    <>
      {dragging && (
        <td>
          <IoReorderTwoSharp size={20} />
        </td>
      )}
      <td className="py-4 opacity-[0.8] pl-6">
        {file.ftype == "pdf" && <MdPictureAsPdf size={20} />}
        {file.ftype == "jpeg" && <SiJpeg size={20} />}
        {file.ftype == "img" && <MdPhotoLibrary size={20} />}
        {file.ftype == "jpg" && <AiOutlineFileJpg size={20} className="mr-2" />}
      </td>
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
      >
        {file.fname}
      </th>
      <td className="py-4 px-6 hidden md:flex ">{file.fsize}</td>

      <td className="py-4 px-6">
        <div className="font-medium text-blue-600 cursor-pointer">Edit</div>
      </td>
    </>
  );
};
export default NotesFiles;
