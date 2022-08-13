import React, { useState, useEffect } from "react";
import "../../assets/css/Login.css";
import SigninImg from "../../assets/images/signup.jfif";
import LoginImg from "../../assets/images/login.jfif";
import { AiOutlineGoogle } from "react-icons/ai";
import socialMediaAuth from "../../authentication/auth";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { userInfo, serverUrl } from "../../utils";

const Login = () => {
  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    setScreenWidth(window.innerWidth > 768);
  }, []);
  const [Login, setLogin] = useState(false);
  let navigate = useNavigate();
  const signInParent = async (params) => {
    let data = await socialMediaAuth(params);
    let { fullName, email, localId } = data;
    const doc = {
      name: fullName,
      email: email,
      verified: false,
    };

    Axios.post(serverUrl + `/students/add`, doc).then(async (res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      if (res.data.class == null || res.data.rollNo == null) {
        navigate("/start", { replace: true });
      } else {
        navigate("/");
      }
    });
  };
  return (
    <div>
      <section className={Login ? "cover cover-active" : "cover"}>
        <div
          className={Login ? "containerl con-active" : "containerl"}
          style={{ height: screenWidth ? "500px" : "300px" }}
        >
          <div className="user signup">
            <div
              className="formBx rounded-md md:rounded-none m-auto"
              style={{ width: screenWidth ? "50%" : "90% " }}
            >
              <form>
                <h2>Create and Account </h2>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email Address" />

                <input type="password" placeholder="Enter password" />
                <input type="password" placeholder="Confirm password" />
                <input type="submit" value="Login" />
                <p className="signup">
                  Already have an account ?
                  <div
                    onClick={() => {
                      setLogin(!Login);
                    }}
                  >
                    {" "}
                    Sign In
                  </div>
                </p>
              </form>
            </div>
            {screenWidth && (
              <div className="imgBx">
                <img src={SigninImg} alt="" />
              </div>
            )}
          </div>
          <div className="user signin">
            {screenWidth && (
              <div className="imgBx">
                <img
                  src="https://i.pinimg.com/originals/24/56/1d/24561d3de2fbf8a4431b37aaf5ec0c15.jpg"
                  alt=""
                />
              </div>
            )}

            <div
              className="formBx flex flex-col m-auto rounded-md md:rounded-none "
              style={{ width: screenWidth ? "50%" : "90% " }}
            >
              <div className="flex flex-col">
                <div className="aquire mb-4 text-xl">Sign In</div>
                <button
                  className=" flex items-center py-2 text-sm font-bold text-white bg-blue-500 rounded-md px-4 md:px-14 hover:bg-opacity-90"
                  onClick={() => {
                    signInParent("Google");
                  }}
                >
                  <AiOutlineGoogle size={24} />
                  <span className="ml-2 align-middle">Sign in with Google</span>
                </button>
              </div>
              <p className="signup flex mx-2">
                Visitor or Teacher ?
                <div
                  onClick={() => {
                    setLogin(!Login);
                  }}
                  className="cursor-pointer"
                >
                  {" "}
                  Sign In
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>
      <button
        title="Contact Sale"
        className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
      >
        &#9993;
      </button>
    </div>
  );
};

export default Login;
