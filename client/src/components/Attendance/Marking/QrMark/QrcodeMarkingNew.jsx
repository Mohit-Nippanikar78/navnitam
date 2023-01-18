import axios from "axios";
import Spinner from "Elements/Spinner";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import QRCode from "qrcode.react";
import { serverUrl } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import base64 from "base-64";
import utf8 from "utf8";

const QrcodeMarkingNew = () => {
  let navigate = useNavigate();
  const QrcodeRef = useRef(null);
  let { qrcodeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [qrValue, setQrValue] = useState("");
  const [students, setStudents] = useState([]);
  const [session, setSession] = useState({});
  const [timer, setTimer] = useState(119);
  const [updates, setUpdates] = useState(false);

  let timerInterval;
  useEffect(() => {
    var bytes = utf8.encode(qrcodeId);
    var qqrValue = base64.encode(bytes);
    setQrValue(qqrValue);

    axios
      .get(serverUrl + `/qrmark/get/${qrcodeId}`)
      .then((res) => {
        console.log(res.data);
        let { sessionName, sessionId, createdAt, activeQr } = res.data;
        let limitSecs = new Date(createdAt).getTime() + 120000;
        let nowSecs = new Date().getTime();
        let remainSecs = Math.floor((limitSecs - nowSecs) / 1000) - 1;
        if (remainSecs < 0) {
          setTimer(0);
        } else {
          setTimer(remainSecs);
          setUpdates(true);
          timerInterval = setInterval(() => {
            setTimer((prevstate) => prevstate - 1);
          }, 1000);
        }
        setSession({ sessionName, sessionId, createdAt, activeQr });
        setStudents(res.data.students);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    let updatesInter = setTimeout(() => {
      setUpdates(false);
    }, 5000);
    return () => clearInterval(updatesInter);
  }, [updates]);

  useEffect(() => {
    if (timer != 0 && timer % 20 == 0) {
      setUpdates(true);
      // axios
      //   .get(serverUrl + `/qrmark/get/${qrcodeId}?update=true`)
      //   .then((res) => {

      //   });
    }
    if (timer == 0) {
      clearInterval(timerInterval);
    }
  }, [timer]);

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${session.sessionName + "Qr"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  if (loading) return <Spinner message="Creating QR Lecture" />;
  return (
    <div className="relative">
      <div class="flex items-center justify-center fixed z-20 bottom-4 right-4">
        <div className="relative">
          {updates && (
            <>
              <div className="absolute w-3 opacity-75 h-3 animate-ping top-0 right-0 bg-yellow-700 rounded-full"></div>
              <div className="absolute w-3  h-3 top-0 right-0 bg-yellow-700 rounded-full"></div>
            </>
          )}
          <button class="flex p-2.5 w-full h-full bg-green-700 rounded-xl hover:rounded-3xl  transition-all duration-300 text-white">
            {timer}
          </button>
        </div>
      </div>
      <div className="mx-auto fon    mx-2 border bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Fill details of Period</span>
        </div>

        <div className="mt-6">
          <div className="font-semibold">Folder Name</div>
          <div className="flex ">
            <input
              value={session.sessionName}
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] focus:drop-shadow-md p-2"
              type="text"
              placeholder="..."
              onChange={(e) => {
                setSession({ ...session, sessionName: e.target.value });
              }}
            />
            <div
              className="cursor-pointer mx-3 my-auto rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
              onClick={() => {
                axios
                  .put(
                    serverUrl + `/qrmark/update/${qrcodeId}?sessionName=true`,
                    {
                      sessionName: session.sessionName,
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                  });
              }}
            >
              Update
            </div>
          </div>
        </div>
        <span className="text-[#64748B]">
          Created {moment(session.createdAt).calendar()}{" "}
        </span>
        {session?.activeQr && (
          <>
            <div className="font-semibold mt-6">
              Scan this Qr code for attendance
            </div>
            <div className="h-[50vh] w-full flex items-center justify-center ">
              <QRCode
                id="qr-gen"
                ref={QrcodeRef}
                className="mt-3 "
                size={250}
                // value={`http://localhost:3000/presenty/doubly/verify/${qrValue}`}
                value={`http://navnitam.netlify.app/presenty/doubly/verify/${qrValue}`}
                includeMargin={true}
              />
            </div>
            <div className="flex ">
              <div
                className=" flex items-center cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
                onClick={downloadQRCode}
              >
                <AiOutlineDownload className="text-xl mr-2" size={24} />
                Download
              </div>
              <div
                className="ml-6 flex items-center cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
                onClick={() => {
                  const canvas = document.getElementById("qr-gen");
                  const pngUrl = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
                  let downloadLink = document.createElement("a");
                  downloadLink.href = pngUrl;
                  navigator.share({
                    files: downloadLink.href,
                    title: "Images",
                    text: "",
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-7 h-7 mr-2"
                  style={{ color: "white" }}
                >
                  <path
                    fill="currentColor"
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
                </svg>
                Share
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="flex flex-col mx-2">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full table-fixed text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        Roll No
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        Present
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((item, i) => {
                      return (
                        <MarkingRow
                          sessionId={session.sessionId}
                          stud={item}
                          key={i}
                          i={i}
                        />
                      );
                    })}

                    <tr className="odd:bg-white border-b even:bg-gray-100 tdpresent">
                      <td
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        colSpan={2}
                      >
                        Completed
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            navigate("/presenty/doubly");
                          }}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MarkingRow = ({ stud, sessionId, i }) => {
  const [present, setPresent] = useState(stud.present);

  return (
    <tr className="odd:bg-white border-b even:bg-gray-100 tdpresent">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {stud.rollno}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {stud.name}
      </td>
      <td
        className={`relative  text-gray-900  font-light  whitespace-nowrap `}
        style={{
          background: "linear-gradient(to right, green 50%, red 50%) ",
          backgroundSize: "200% 100%",
          backgroundPosition: `${present ? "left" : "right"}  bottom`,
          transition: " all 1s ease-out",
        }}
      >
        <input
          id={`bordered-checkbox-${i}`}
          type="checkbox"
          name="bordered-checkbox"
          checked={present}
          onChange={(e) => {
            setPresent(e.target.checked);

            axios
              .put(serverUrl + `/qrmark/update/${sessionId}?override=true`, {
                studentId: stud.studentId,
                present: e.target.checked,
              })
              .then((res) => console.log(res));
          }}
          className="absolute top-0 left-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label for={`bordered-checkbox-${i}`} className="w-full">
          <p
            className={`text-2xl font-bold ${
              present ? "text-green-800" : "text-red-800"
            }`}
          >
            {present ? "Present" : "Absent"}
          </p>
        </label>
      </td>
    </tr>
  );
};

export default QrcodeMarkingNew;
