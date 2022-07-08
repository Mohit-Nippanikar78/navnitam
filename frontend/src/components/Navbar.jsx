import React from "react";
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { BiMicrophone } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  let navigate = useNavigate();
  // if (user)
  return (
    <div className="flex flex-col">
      <div className=" w-full capitalize flex items-center m-auto  ">
        <img
          className="w-10 h-10 rounded-full m-2 mb-0"
          src="https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/6/2022_6$largeimg_2071666613.jpg"
          alt=""
        />
        <div className="tracking-4 font-extrabold text-lg aquire text-center w-full ">
          Home
        </div>
        <Link
          to="/create-pin"
          className="mx-2 bg-black text-white rounded-lg w-14 h-10 md:w-14 md:h-12 flex justify-center items-center"
        >
          <BsThreeDotsVertical fontSize={21} />
        </Link>
      </div>
      <div className="flex flex-row items-center  w-full ">
        {" "}
        <div className="flex flex-row justify-start items-center focus-within:shadow-md m-4 w-full bg">
          <IoMdSearch fontSize={20} className="mx-2" />

          <input
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            className="p-2 w-full bg-slate-200 outline-0 rounded-sm"
            onFocus={() => {
              navigate("/search");
            }}
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center">
          {/* <Link to={`/profile/${user._id}`} className=" mx-2 w-14 hidden md:block">
            <img src={user.image} alt="profile"  className="rounded-full"/>
          </Link>
          <Link to="/create-pin" className="mx-2 bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd fontSize={26} />
          </Link> */}
          <Link
            to="/create-pin"
            className="mx-2 bg-black text-white rounded-lg w-10 h-10 md:w-14 md:h-12 flex justify-center items-center"
          >
            <BiMicrophone fontSize={21} />
          </Link>
        </div>
      </div>
    </div>
  );
  return null;
};

export default Navbar;
