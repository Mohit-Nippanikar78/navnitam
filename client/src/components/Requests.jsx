import React, { useEffect, useState } from "react";
import { fetchUser, serverUrl } from "../utils";
import Axios from "axios";
import Spinner from "../Elements/Spinner";
const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getpending = async () => {
      let obj = await fetchUser();

      Axios.get(serverUrl + `/admin/pendingStudents/${obj.class}`).then(
        (res) => {
          setRequests(res.data.pendingStudents);
          setLoading(false);
        }
      );
    };
    getpending();
  }, []);
  if (loading) return <Spinner message="Getting Requests" />;
  if (requests.length == 0) {
    return (
      <div className="text-xl flex justify-center w-full text-extrabold mb-2 ">
        No Requests
      </div>
    );
  }
  return (
    <>
      <div className="text-xl flex justify-center w-full text-extrabold mb-2 ">
        Admission Requests
      </div>
      {requests?.map((item, i) => {
        return <Request item={item} key={i} />;
      })}
    </>
  );
};
const Request = ({ item }) => {
  const [done, setDone] = useState(false);
  return (
    <div className=" flex m-2 items-center ">
      <div className="flex-1 min-w-0 flex items-center justify-between">
        <h2 className="text-sm font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {item.name}
        </h2>
        <h2 className="text-sm mr-2   text-gray-400 sm:text-3xl sm:truncate">
          Roll:{item.rollNo}
        </h2>
      </div>
      <div className="flex items-center lg:mt-0 lg:ml-4">
        {done ? (
          <div class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              ariaHidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Admitted
          </div>
        ) : (
          <>
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  fetchUser().then((res) => {
                    Axios.put(serverUrl + `/admin/students/add`, {
                      classId: res.class,
                      studentId: item._id,
                    });
                    item.class = res.class;
                    Axios.put(serverUrl + `/students/edit/${item._id}`, item);

                    Axios.put(serverUrl + `/admin/pendingStudents/remove`, {
                      classId: res.class,
                      studentId: item._id,
                    }).then(() => {
                      setDone(true);
                    });
                  });
                }}
              >
                Admit
              </button>
            </span>
            <span className="ml-2">
              <button
                type="button"
                className="inline-flex items-center px-2   py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  fetchUser().then((res) => {
                    Axios.put(serverUrl + `/admin/pendingStudents/remove`, {
                      classId: res.class,
                      studentId: item._id,
                    });
                  });
                }}
              >
                Ignore
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Requests;
