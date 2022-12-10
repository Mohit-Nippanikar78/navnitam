import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import base64 from "base-64";
import utf8 from "utf8";
const QrcodeMarkingVerify = () => {
  let { qrencodedId } = useParams();
  const [done, setDone] = useState(true);
  useEffect(() => {
    userInfo().then((user) => {
      var bytes = base64.decode(qrencodedId);
      var decodedByter = utf8.decode(bytes);
      console.log(decodedByter);

      axios
        .put(serverUrl + `/qrmark/update/${decodedByter}`, {
          studentId: user._id,
        })
        .then((res) => {
          console.log(res.data);
        });
    });
  }, []);
  if(done) return <img src="https://gifdb.com/images/high/account-fully-verified-check-mark-r94d8zad5ichwkv3.webp" alt="" />
  return (
    <div className="flex h-1/3 items-center justify-center flex-col m-4">
      <InfinitySpin width="200" color="#4fa94d" />;
      <p className="flex text-lg items-center m-5">Marking Up</p>
    </div>
  );
};

export default QrcodeMarkingVerify;
