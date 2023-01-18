import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineAppstoreAdd, AiOutlineQrcode } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dna } from "react-loader-spinner";
const QrcodeMarking = ({ admin }) => {
  let navigate = useNavigate();
  const [qrcodes, setQrcodes] = useState([]);
  const [page, setPage] = useState(0);
  const [next, setNext] = useState(true);
  useEffect(() => {
    getClassQrs(page);
  }, [page]);
  const getClassQrs = (pageNo) => {
    userInfo().then((user) => {
      axios
        .get(serverUrl + `/qrmark/class/${user.class}?page=${pageNo}`)
        .then((res) => {
          setNext(res.data.next);
          setQrcodes((prevState) => prevState.concat(res.data.qrs));
        });
    });
  };
  useEffect(() => {
    console.log(qrcodes.length);
  }, [qrcodes]);

  if (!admin) {
    navigate("/");
    return;
  }
  return (
    <>
      <div className=" flex justify-between items-center mx-2  ">
        <div className="font-bold text-xl">Recent Lectures</div>

        <button
          type="button"
          class="flex  mr-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            userInfo().then((user) => {
              axios
                .post(serverUrl + "/qrmark/new", {
                  classId: user.class,
                })
                .then((res) => {
                  navigate(`${res.data}`);
                });
            });
          }}
        >
          <AiOutlineAppstoreAdd size={23} className="mr-2" /> Create Lecture
        </button>
      </div>
      <div class="flex flex-col container   mx-auto w-full items-center justify-center bg-white :bg-gray-800 rounded-lg shadow">
        <div class="flex flex-col divide-y w-full">
          <InfiniteScroll
            dataLength={qrcodes.length} //This is important field to render the next data
            next={() => {
              setPage((page) => page + 1);
            }}
            hasMore={next}
            loader={ 
              <div className="w-full flex justify-center h-8">

              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                
                wrapperClass="dna-wrapper"
                />
                </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {qrcodes.map((item, i) => {
              return <QrCodeRow key={i} item={item} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};
const QrCodeRow = ({ item }) => {
  let navigate = useNavigate();
  return (
    <div
      class="flex flex-row cursor-pointer"
      onClick={() => {
        navigate(`${item.qrcodeId}`);
      }}
    >
      <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
        <div
          class={`mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-red-100 ${
            item.activeQr ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <AiOutlineQrcode
            className={`h-6 w-6 ${
              item.activeQr ? "text-green-400" : "text-red-400"
            }`}
          />
        </div>
        <div class="flex-1 pl-1">
          <div class="font-medium :text-white">{item.sessionName}</div>
          <div class="text-gray-600 :text-gray-200 text-sm">
            {moment(item.createdAt).calendar()}
          </div>
        </div>
        <div class="flex flex-row justify-center">
          <div class="text-gray-600 :text-gray-200 text-xs"></div>
          <button class="w-10 text-right flex justify-end">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              class="hover:text-gray-800 :hover:text-white :text-gray-200 text-gray-500"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrcodeMarking;
