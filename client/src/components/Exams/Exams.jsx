import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl, userInfo } from "utils";
import AddMarks from "./AddMarks";

const Exams = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className=" flex justify-end mx-2  ">
        <button
          type="button"
          class="flex  mr-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            navigate("/exams/create");
          }}
        >
          <AiOutlineAppstoreAdd size={23} className="mr-2" /> Create Exam Period
        </button>
      </div>
      <div className="MainDiv">
        <div class="">
          <div class="bg-light-blue-500 px-3 md:px-8 h-40"></div>
          <div class="px-3 md:px-8 -mt-24">
            <div class="container mx-auto max-w-full">
              <div class="grid grid-cols-1 xl:grid-cols-5">
                <AddMarks />
                <div class="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="bg-gradient-to-tr from-pink-500 to-pink-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8 justify-start shadow-lg-pink undefined">
                      <h6 class="uppercase text-gray-200 text-xs font-medium">
                        Overview
                      </h6>
                      <h2 class="text-white text-2xl">Sales value</h2>
                    </div>
                    <div class="p-4 undefined">
                      <div class="relative h-96">hi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 md:px-8">
            <div class="container mx-auto max-w-full">
              <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                <div class="px-4 mb-10">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="flex flex-wrap border-b border-gray-200 undefined">
                      <div class="bg-gradient-to-tr from-pink-500 to-pink-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-pink mb-0">
                        <span class="material-icons text-white text-3xl leading-none">
                          trending_up
                        </span>
                      </div>
                      <div class="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                        <h5 class="text-gray-500 font-light tracking-wide text-base mb-1">
                          Traffic
                        </h5>
                        <span class="text-3xl text-gray-900">350,897</span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 pt-4 flex items-center undefined">
                      <span class="material-icons text-green-500 text-base leading-none">
                        arrow_upward
                      </span>
                      <span class="text-green-500 ml-1 mr-2">3.48</span>
                      <span class="font-light whitespace-nowrap">
                        Since last month
                      </span>
                    </div>
                  </div>
                </div>
                <div class="px-4 mb-10">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="flex flex-wrap border-b border-gray-200 undefined">
                      <div class="bg-gradient-to-tr from-orange-500 to-orange-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-orange mb-0">
                        <span class="material-icons text-white text-3xl leading-none">
                          groups
                        </span>
                      </div>
                      <div class="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                        <h5 class="text-gray-500 font-light tracking-wide text-base mb-1">
                          New Users
                        </h5>
                        <span class="text-3xl text-gray-900">2,356</span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 pt-4 flex items-center undefined">
                      <span class="material-icons text-red-500 text-base leading-none">
                        arrow_downward
                      </span>
                      <span class="text-red-500 ml-1 mr-2">3.48</span>
                      <span class="font-light whitespace-nowrap">
                        Since last week
                      </span>
                    </div>
                  </div>
                </div>
                <div class="px-4 mb-10">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="flex flex-wrap border-b border-gray-200 undefined">
                      <div class="bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-purple mb-0">
                        <span class="material-icons text-white text-3xl leading-none">
                          paid
                        </span>
                      </div>
                      <div class="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                        <h5 class="text-gray-500 font-light tracking-wide text-base mb-1">
                          Sales
                        </h5>
                        <span class="text-3xl text-gray-900">924</span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 pt-4 flex items-center undefined">
                      <span class="material-icons text-orange-500 text-base leading-none">
                        arrow_downward
                      </span>
                      <span class="text-orange-500 ml-1 mr-2">1.10</span>
                      <span class="font-light whitespace-nowrap">
                        Since yesterday
                      </span>
                    </div>
                  </div>
                </div>
                <div class="px-4 mb-10">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="flex flex-wrap border-b border-gray-200 undefined">
                      <div class="bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-blue mb-0">
                        <span class="material-icons text-white text-3xl leading-none">
                          poll
                        </span>
                      </div>
                      <div class="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                        <h5 class="text-gray-500 font-light tracking-wide text-base mb-1">
                          Performance
                        </h5>
                        <span class="text-3xl text-gray-900">49,65%</span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 pt-4 flex items-center undefined">
                      <span class="material-icons text-green-500 text-base leading-none">
                        arrow_upward
                      </span>
                      <span class="text-green-500 ml-1 mr-2">12</span>
                      <span class="font-light whitespace-nowrap">
                        Since last month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 md:px-8 h-auto">
            <div class="container mx-auto max-w-full">
              <div class="grid grid-cols-1 xl:grid-cols-5">
                <div class="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8  shadow-lg-blue undefined">
                      <div class="w-full flex items-center justify-between">
                        <h2 class="text-white text-2xl">Page Visits</h2>
                        <button
                          class="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-lg py-3 px-7 text-sm leading-relaxed bg-transparent      undefined"
                          style={{ padding: "0px" }}
                        >
                          See More
                        </button>
                      </div>
                    </div>
                    <div class="p-4 undefined">
                      <div class="overflow-x-auto">
                        <table class="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th class="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                ID
                              </th>
                              <th class="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                Name
                              </th>
                              <th class="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                Salary
                              </th>
                              <th class="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                Country
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                1
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Dakota Rice
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                $36,738
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <span class="font-extrabold   capitalize bg-yellow-100 text-yellow-800 text-sm mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                                  Master
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                2
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Minerva Hooper
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                $23,789
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <span class="font-extrabold bg-blue-100 text-blue-800 text-sm  mr-2 px-2.5 py-0.5 rounded ">
                                  Diamond
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                3
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Sage Rodriguez
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                $56,142
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <span class="font-extrabold bg-indigo-100 text-indigo-800 text-sm  mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
                                  Platinum
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                4
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Philip Chaney
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                $38,735
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <span class="font-extrabold bg-stone-200 text-stone-800 text-sm  mr-2 px-2.5 py-0.5 rounded ">
                                  Silver
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                5
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Philip Chaney
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                $38,735
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <span class="font-extrabold bg-orange-200 text-orange-800 text-sm  mr-2 px-2.5 py-0.5 rounded ">
                                  Bronze
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                  <div class="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                    <div class="bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8  shadow-lg-purple undefined">
                      <div class="w-full flex items-center justify-between">
                        <h2 class="text-white text-2xl">Social Media</h2>
                        <button
                          class="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-lg py-3 px-7 text-sm leading-relaxed bg-transparent      undefined"
                          style={{ padding: "0px" }}
                        >
                          See More
                        </button>
                      </div>
                    </div>
                    <div class="p-4 undefined">
                      <div class="overflow-x-auto">
                        <table class="items-center w-full bg-transparent border-collapse">
                          <thead class="thead-light">
                            <tr>
                              <th class="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                Referral
                              </th>
                              <th class="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                Visitors
                              </th>
                              <th class="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Facebook
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                1,480
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <div class="overflow-hidden h-2 flex rounded bg-blue-200">
                                  <div
                                    class="flex justify-center items-center rounded text-xs font-medium bg-blue-500 text-white"
                                    style={{ width: "60%" }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Google
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                4,807
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <div class="overflow-hidden h-2 flex rounded bg-red-200">
                                  <div
                                    class="flex justify-center items-center rounded text-xs font-medium bg-red-500 text-white"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Instagram
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                3,678
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <div class="overflow-hidden h-2 flex rounded bg-indigo-200">
                                  <div
                                    class="flex justify-center items-center rounded text-xs font-medium bg-indigo-500 text-white"
                                    style={{ width: "75%" }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                Twitter
                              </th>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                2,645
                              </td>
                              <td class="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                <div class="overflow-hidden h-2 flex rounded bg-light-blue-200">
                                  <div
                                    class="flex justify-center items-center rounded text-xs font-medium bg-light-blue-500 text-white"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
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
          </div>
        </div>
      </div>
      <footer class="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center"></footer>
    </div>
  );
};

export default Exams;
