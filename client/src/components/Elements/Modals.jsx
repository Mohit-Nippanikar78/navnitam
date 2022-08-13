import React from "react";
import { serverUrl, userInfo } from "../../utils";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
const Modals = ({
  setModal,
  title,
  content,
  confirmBox,
  operation,
  studentId,
}) => {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (
          operation == "makeAdministrator" ||
          operation == "dropAdministrator"
        ) {
          setModal("");
        } else {
          setModal(false);
        }
      }}
      class=" bg-slate-500 z-30 bg-opacity-50 modal fade fixed flex items-center justify-center top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    >
      <div class=" modal-dialog relative pointer-events-none w-4/5 md:w-1/3">
        <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 class="flex items-center font-extrabold   text-red-900 text-xl  leading-normal text-gray-800">
              <FiAlertTriangle size={24} className="mr-2" /> {title}
            </h5>
            <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
              onClick={() => {
                if (
                  operation == "makeAdministrator" ||
                  operation == "dropAdministrator"
                ) {
                  setModal("");
                } else {
                  setModal(false);
                }
              }}
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div class="modal-body relative p-4">{content}</div>
          <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            {confirmBox && (
              <>
                <button
                  type="button"
                  class="text-white text-base bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg  px-3 py-1.5 mr-2 text-center inline-flex items-center "
                  onClick={() => {
                    if (
                      operation == "makeAdministrator" ||
                      operation == "dropAdministrator"
                    ) {
                      Axios.put(serverUrl + `/students/edit/${studentId}`, {
                        administrator:
                          operation == "dropAdministrator" ? false : true,
                      }).then(() => {
                        window.location.reload();
                      });
                    } else if (operation == "removeStudent") {
                      userInfo().then((user) => {
                        Axios.put(serverUrl + `/admin/students/remove`, {
                          studentId,
                          classId: user.class,
                          administrator: false,
                        }).then(() => {
                          navigate("/students", { replace: true });
                        });
                      });
                    }
                  }}
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
