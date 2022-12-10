import React, { useState } from "react";
import Axios from "axios";
import { userInfo, serverUrl, setUserInfo } from "../../utils";
import { useNavigate } from "react-router-dom";
const CreateClass = () => {
  const [info, setInfo] = useState({
    department: "",
    year: "",
    div: "",
    password: "",
  });
  let navigate = useNavigate();
  const [wrong, setWrong] = useState(false);
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Department
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="CSE / IT"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setInfo({ ...info, department: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="yearrrrrrrr"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Current Study Year
          </label>
          <input
            onChange={(e) => setInfo({ ...info, year: e.target.value })}
            name="yearrrrrrrr"
            id="yearrrrrrrr"
            placeholder="1/2/3"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="jfjfjfjfjfjffjfjfjjfj"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Division
          </label>
          <input
            onChange={(e) => setInfo({ ...info, div: e.target.value })}
            type="text"
            id="jfjfjfjfjfjffjfjfjjfj"
            placeholder="A / B /C "
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="pasword"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            name="subject"
            id="pasword"
            placeholder="Enter Creation Password"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {wrong && (
            <p className="text-red-500 text-xs italic">
              Meet Mohit CSE2B for password
            </p>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              userInfo().then((user) => {
                if (info.password == "mhtnipp77") {
                  Axios.post(serverUrl + `/admin/add`, {
                    name: info.department + info.year + info.div,
                    crName: user._id,
                    students: user._id,
                  })
                    .then((res) => {
                      user.class = res.data._id;
                      user.administrator = true;
                      Axios.put(
                        serverUrl + `/students/edit/${user._id}`,
                        user
                      ).then((res) => {
                       setUserInfo(res.data)
                      });
                    })
                    .then(() => {
                      navigate("/");
                    });
                } else {
                  setWrong(true);
                }
              });
            }}
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
