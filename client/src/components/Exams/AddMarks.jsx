import axios from "axios";
import Spinner from "Elements/Spinner";
import React, { useEffect, useState } from "react";
import { serverUrl, userInfo } from "utils";

const AddMarks = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userInfo().then((user) => {
      axios
        .get(serverUrl + `/test/recent/unfilled/${user._id}`)
        .then((res) => {
          setTests(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    });
  }, []);
  if (loading) return <Spinner message="Getting Unfilled Marks" />;
  if (tests?.length == 0 || tests == undefined) return <></>;
  return (
    <div class="xl:col-start-1 xl:col-end-4 px-4 mb-14">
      <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
        <div class="bg-gradient-to-tr from-orange-500 to-orange-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8 justify-start shadow-lg-orange undefined">
          <h6 class="uppercase text-gray-200 text-xs font-medium">
            Recent Exam
          </h6>
          <h2 class="text-white text-2xl">Fill Periodical Exam</h2>
        </div>
        <div class="p-4 undefined">
          <div class="relative h-96">
            {tests?.map((item, i) => {
              return (
                <AddMarksInput
                  test={item}
                  key={i}
                  tests={tests}
                  setTests={setTests}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const AddMarksInput = ({ test, tests, setTests }) => {
  const [earnM, setEarnM] = useState(0);
  return (
    <div class="flex items-center w-full mb-6">
      <div>
        <label
          class=" whitespace-nowrap block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          {test.subjectName}
        </label>
      </div>
      <div class="w-full flex rounded">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200  w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          value={earnM}
          onChange={(e) => {
            setEarnM(e.target.value);
          }}
        />
        <div className=" bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
          / {test.totalM}
        </div>
        <button
          onClick={() => {
            axios
              .put(serverUrl + `/test/recent/unfilled/test/${test._id}`, {
                earnM,
              })
              .then(async () => {
                let tempTests = await tests.filter((ff) => {
                  return ff._id !== test._id;
                });
                setTests(tempTests);
              });
          }}
          className="cursor-pointer mx-4 bg-green-200 appearance-none border-2 border-green-200  w-full py-2 px-4 text-green-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        >
          Done
        </button>
      </div>
    </div>
  );
};
export default AddMarks;
