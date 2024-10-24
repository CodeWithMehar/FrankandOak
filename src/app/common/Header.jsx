"use client";
import { RiLogoutCircleRLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CiSearch, CiHeart, CiFacebook } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaGoogle } from "react-icons/fa";
import img1 from "../../img/img1.jpg";
import img2 from "../../img/img2.jpg";
import img3 from "../../img/img3.jpg";
import img4 from "../../img/img4.jpg";
import s from "../../img/s.png";
import Link from "next/link";
import "./login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createToken, logOut } from "../slice/loginSlice";
import { store } from "../store/store";
export default function Header() {

  let cartData = useSelector((state) =>state.cartReducer.cart)
  //parentcategory state
  const [parentCategory, setParentCategory] = useState([]);
  const [modal, setModal] = useState("");
  let [otp, setOtp] = useState(false);

  console.log("cartDatainheader",cartData)
  let [loginData, setlogindata] = useState({
    uemail: "",
    upassword: "",
  });
  let [registerData, setRegisterdata] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  }); // "" means no modal, "login" means login modal, "signup" means signup modal

  // Add/remove body class to prevent scrolling
  useEffect(() => {
    if (modal !== "") {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal closes
    }
  }, [modal]);

  const openModal = (modalType) => {
    setModal(modalType);
  };

  const closeModal = () => {
    setModal("");
  };
  //getValue Function
  let getValue = (e) => {
    setRegisterdata({ ...registerData, [e.target.name]: e.target.value });
  };
  //register function
  let register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/website/user/register", registerData)
      .then((res) => {
        console.log("response", res.data);

        if (res.data.status === 0) {
          // Set error message for email already registered
          window.alert("Email Already Registered");
        } else {
          Swal.fire("OTP has been Sent");
          setOtp(true);
          e.target.reset();
        }
      })
      .catch((error) => {
        // Log the actual error response to see what is going wrong
        console.error("Error:", error);

        // Check for network errors, like CORS or server issues
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          window.alert("Server Error: " + error.response.data.message);
        } else if (error.request) {
          // Request was made but no response was received
          window.alert(
            "No response from the server. Please check your network."
          );
        } else {
          // Some other error occurred
          window.alert("Error: " + error.message);
        }
      });
  };
  //otp verify function
  let otpVerify = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/website/user/verify", {
        userpassword: registerData.userpassword,
        username: registerData.username,
        useremail: registerData.useremail,
        otp: e.target.otp.value,
      })
      .then((res) => {
        console.log(res);
        setModal("");

        // Check if the response indicates success
        if (res.data.status === 1) {
          Swal.fire("OTP Verified Successfully");
        } else {
          // This block may not be hit due to the HTTP status code
          Swal.fire("Invalid OTP");
        }
      })
      .catch((error) => {
        // Handle specific error messages from the backend
        if (error.response && error.response.data) {
          // Check if the error response has a status of 0
          if (error.response.data.status === 0) {
            Swal.fire("Invalid OTP"); // Show alert for invalid OTP
          } else {
            Swal.fire("An unexpected error occurred. Please try again."); // General error alert
          }
        } else {
          // Fallback for network errors or other issues
          Swal.fire("An error occurred. Please try again.");
        }
      });
  };
  //getValue Function
  let getloginValue = (e) => {
    setlogindata({ ...loginData, [e.target.name]: e.target.value });
  };

  let login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/website/user/login", loginData)
      .then((res) => {
        console.log("response", res.data);
        if (res.data.status === 1) {
          dispatch(
            createToken({ token: res.data.token, username: res.data.username })
          );
          // If login is successful
          alert(res.data.message); // Show success message
          // Redirect or do something else, e.g., navigate to dashboard
          setModal("");
        } else {
          // If login failed (status 0)
          alert(res.data.message); // Show error message
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Login error:", error);
        alert("Please Enter Correct Password!"); // Generic error message
      });
  };
  let dispatch = useDispatch();
  // Fetch the token from the Redux store
  let token = useSelector((store) => {
    return store.loginReducer.token;
  });
  // Fetch the username from the Redux store
  const username = useSelector((store) => {
    return store.loginReducer.username;
  });
  useEffect(() => {
    if (!token) {
      // setModal(true);
    }
  }, [token]);
  //logout function
  let handleLogout = () => {
    dispatch(logOut());
  };
  let viewCategory = () => {
    axios.get("http://localhost:8000/website/product/parentCategory").then((res) => {
      console.log(res.data);
      // setProducts(res.data.products);
      setParentCategory(res.data.data);
    });
  };
  useEffect(() => {
    viewCategory();
  }, []);
  return (
    <>
      <div className="w-full mt-[20px] flex justify-between border-b-[1px] pb-[15px]">
        <div className="flex">
          <ul className="flex align-middle">
            <li className="font-bold text-[20px] mr-[45px] ml-[20px]">
              <a href="/">Frank And Oak</a>
            </li>
            {/* Other menu items */}
            {parentCategory.map((items, index) => {
              return (
                <li className="ml-[30px] font-bold text-[16px]">
                  <Link href={`/Category/${items.slug}`}>{items.categoryName}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex space-x-5 pr-[25px]">
          <a href="#">
            <CiSearch className="text-[30px]" />
          </a>
          <a href="#">
            <CiHeart className="text-[30px]" />
          </a>
         <div className="flex items-center">
         <a href="/Cart">
            <IoBagOutline className="text-[30px]" />
          </a>
          <h1>{cartData.length}</h1>
         </div>
          {/* Conditional rendering for User Icon / Username and Logout */}
          {token ? (
           <div className="flex items-center">
              <span className="text-black cursor-pointer relative top-0 right-5 ml-5">
                {username ? username : "User"}
              </span>
              <div className="relative right-0 top-0 bg-white border border-gray-300 rounded shadow-md px-5">
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={handleLogout}
                >
                  <RiLogoutCircleRLine className="text-[25px]" />
                </button>
              </div>
            </div>
          ) : (
            <button className="text-black" onClick={() => openModal("login")}>
              <HiOutlineUserCircle className="text-[30px] cursor-pointer hover:text-blue-500 transition duration-200" />
            </button>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {modal !== "" && (
        <div className="modal-overlay">
          <div className="modal-content relative">
            <RxCross1
              className="absolute right-[5px] top-[10px] font-bold cursor-pointer"
              onClick={closeModal}
            />
            {modal === "login" && (
              <>
                <h1 className="text-[30px] font-bold">Welcome Back</h1>
                <p>Log in to get access to your member perks.</p>
                <Image src={s} className="mt-[10px]" />
                <form action="" onSubmit={login}>
                  <input
                    name="uemail"
                    onChange={getloginValue}
                    type="email"
                    placeholder="Email"
                    className="border border-black w-[90%] mt-[15px] p-[10px]"
                  />
                  <input
                    onChange={getloginValue}
                    name="upassword"
                    type="password"
                    placeholder="Password"
                    className="border border-black w-[90%] mt-[15px] p-[10px]"
                  />
                  <ul>
                    <li className="underline mt-[10px]">Forgot Password?</li>
                  </ul>
                  <button
                    className="bg-black text-white p-[15px] mt-[20px] w-[90%]"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <div className="flex justify-around mt-[20px]">
                  <button className="border-2 border-black p-[8px] flex items-center">
                    <CiFacebook className="mr-[10px]" /> Sign In With Facebook
                  </button>
                  <button className="border-2 border-black p-[8px] flex items-center">
                    <FaGoogle className="mr-[10px]" /> Sign In With Google
                  </button>
                </div>
                <h1 className="my-[35px]">
                  Don&apos;t have an account?{" "}
                  <button
                    className="underline font-bold"
                    onClick={() => openModal("signup")}
                  >
                    Sign Up
                  </button>
                </h1>
              </>
            )}
            {/* Add Signup modal content similarly */}
            <>
              {modal === "signup" && (
                <div className="main w-full ">
                  <div className="bg-white w-full mx-auto pt-[50px] pb-[50px] text-center border opacity-1 relative">
                    <h1 className="text-[30px] font-bold">
                      Create your account
                    </h1>
                    <p>Sign up and enjoy member benefits</p>
                    <Image src={s} className="mt-[10px]" />
                    {otp ? (
                      <form action="" onSubmit={otpVerify}>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          name="otp"
                          autoComplete="off"
                          className="border border-black w-[90%] mt-[15px] p-[10px]"
                        />

                        <button
                          className="bg-black text-white p-[15px] mt-[20px] w-[90%]"
                          type="submit"
                        >
                          Verify OTP
                        </button>
                      </form>
                    ) : (
                      <form action="" onSubmit={register}>
                        <input
                          type="text"
                          placeholder="Name"
                          onChange={getValue}
                          name="username"
                          className="border border-black w-[90%] mt-[15px] p-[10px]"
                        />
                        <input
                          type="email"
                          name="useremail"
                          onChange={getValue}
                          placeholder="Email"
                          className="border border-black w-[90%] mt-[15px] p-[10px]"
                        />
                        <input
                          type="password"
                          name="userpassword"
                          onChange={getValue}
                          placeholder="password"
                          className="border border-black w-[90%] mt-[15px] p-[10px]"
                        />
                        <ul>
                          <li className="underline mt-[10px]">
                            Already have an account?{" "}
                            <a href="#">
                              <button onClick={() => openModal("login")}>
                                Login
                              </button>
                            </a>
                          </li>
                        </ul>
                        <button
                          className="bg-black text-white p-[15px] mt-[20px] w-[90%]"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </form>
                    )}

                    <div className="flex justify-around">
                      <button className="border-2 border-black p-[8px] mt-[20px] flex justify-between">
                        <CiFacebook /> Sign In With Facebook
                      </button>
                      <button className="border-2 border-black p-[8px] mt-[20px] flex justify-between">
                        <FaGoogle /> Sign In With Google
                      </button>
                    </div>
                    <p className="my-[35px] text-[10px] text-start">
                      By joining, you agree to Frank And Oak’s Terms &
                      Conditions and Privacy Policy and to receive Frank And
                      Oak’s electronic communications.
                    </p>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
}
