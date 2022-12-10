import React, { useEffect, useState } from "react";
import { fetchUser, serverUrl, userInfo, testNames } from "utils";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const [subjects, setSubjects] = useState([]);
  const [testName, setTestName] = useState("");
  const [totalM, setTotalM] = useState(70);
  let navigate = useNavigate();
  useEffect(() => {
    userInfo().then((user) => {
      Axios.get(serverUrl + `/subjects/${user.class}`).then((res) =>
        res.data.map((item) => {
          setSubjects((subjects) => [
            ...subjects,
            { subName: item.subjectName, subId: item._id },
          ]);
        })
      );
    });
  }, []);
  const ChooseSubject = (e) => {
    const { name, checked } = e.target;
    if (name == "allSelect") {
      let tempsub = subjects.map((sub) => {
        return { ...sub, isChecked: checked };
      });
      setSubjects(tempsub);
    } else {
      let tempsub = subjects.map((sub) => {
        if (sub.subName == name) {
          return { ...sub, isChecked: checked };
        } else {
          return sub;
        }
      });

      setSubjects(tempsub);
    }
  };
  return (
    <div class="mx-auto   mx-2 border bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-[#64748B]">Fill details of Exam</span>
      </div>

      <div class="mt-6">
        <div class="font-semibold">Exam Name</div>
        <div>
          <input
            value={testName}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="100.00"
            onChange={(e) => {
              setTestName(e.target.value);
            }}
          />
        </div>
        <div class="flex justify-between">
          {testNames.map((item) => {
            return (
              <div
                class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23]"
                onClick={() => {
                  setTestName(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div class="mt-6">
        <div class="font-semibold">Exam Total Marks</div>
        <div>
          <input
            value={totalM}
            class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
            type="text"
            placeholder="100.00"
            onChange={(e) => {
              setTotalM(e.target.value);
            }}
          />
        </div>
        <div class="flex justify-between">
          {[20, 70, 100].map((item) => {
            return (
              <div
                class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23]"
                onClick={() => {
                  setTotalM(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div class="mt-6">
        <h3 class="mb-4 font-semibold ">Subjects Exam</h3>
        <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
          <li class="w-full rounded-t-lg border-b border-gray-200 cursor-pointer">
            <div class="flex items-center pl-3 ">
              <input
                type="checkbox"
                className="form-check-input"
                name="allSelect"
                checked={!subjects.some((user) => user?.isChecked !== true)}
                onChange={ChooseSubject}
              />
              <div class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">
                SelectAll
              </div>
            </div>
          </li>
          {subjects?.map((item) => {
            return (
              <li class="w-full rounded-t-lg border-b border-gray-200 cursor-pointer">
                <div class="flex items-center pl-3 ">
                  <input
                    type="checkbox"
                    checked={item?.isChecked || false}
                    name={item.subName}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                    onChange={ChooseSubject}
                  />
                  <div class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">
                    {item.subName}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div class="mt-6">
        <div
          class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
          onClick={() => {
            userInfo().then((user) => {
              let tempSub = subjects.map((item) => {
                return item.isChecked && item.subId;
              });
              Axios.post(serverUrl + "/exam/create", {
                testName,
                tempSub,
                classId: user.class,
                totalM,
              }).then(() => {
                navigate("/exams");
              });
            });
          }}
        >
          Create Exam Period
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
