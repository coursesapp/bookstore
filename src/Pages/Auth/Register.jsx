import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone, FiLock } from "react-icons/fi";
import { Helmet } from "react-helmet";
import Shoping from "../../Assets/Images/Key-rafiki.svg";
import BackGround from "../../Assets/Images/light-patten.svg";
import sendData from "../../Api/Data"
import Cookies from 'js-cookie';


export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => { setShowPassword((prevState) => !prevState); };
  const toggleConfirmPassword = () => { setShowConfirmPassword((prevState) => !prevState); };


  let [error, setError] = useState(null);

  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);


  function sign_up(values) {
    values.userNamed="k0k";
    console.log(values);
    sendData("Auth/UserRegister", {...values, userName:values.email}, "POST").then((res) => {
      setLoaderbtn(false);
      if (res.status !== 200) {
        alert("enter coorect data");
      } else {
        Cookies.set('token', res.data.token, { expires: 15 });
        navigate("/");
      }
    })
  }


  function validationSchema() {
    const errors = Yup.object({
      firstName: Yup.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").required("Name is a required field"),
      lasttName: Yup.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").required("Name is a required field"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required("Email is a required field"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirm Password does not match")
        .required("Confirm Password is a required field"),
    });
    return errors;

  }

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lasttName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
        setLoaderbtn(true);
        sign_up(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mkanak | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <img
        src={BackGround}
        alt="backGround"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          top: "0",
          left: "0",
          right: "0",
          objectFit: "cover",
        }}
      />
      <div className="mt-4" dir="ltr">
        <div className="w-3/4 mx-auto">
          <h2 className=" text-gray-800 md:text-left mt-10 font-bold md:text-3xl text-2xl text-center mb-5" >Create your account</h2>
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-1/2 lg:mb-0 hidden lg:block">
              <img src={Shoping} className="w-full mt-8" alt="" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg">
                <label htmlFor="name" className="block text-gray-700 mb-2">First Name:</label>
                <div className="input-group my-2 flex items-center border rounded">
                  <span className="input-group-text p-2 bg-white border-r">
                    <FiUser
                      icon={faEnvelope}
                      className="text-[#e8b914] text-lg"
                    />
                  </span>
                  <input
                    className="form-control w-full p-2 outline-none"
                    placeholder="e.g. John Doe"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="name"
                    name="firstName"
                    id="firstName"
                  />
                </div>


                {formik.errors.name && formik.touched.name && (
                  <p className="text-red-600 mb-2">
                    {formik.errors.name}
                  </p>
                )}


                <label htmlFor="name" className="block text-gray-700 mb-2">Last Name:</label>
                <div className="input-group my-2 flex items-center border rounded">
                  <span className="input-group-text p-2 bg-white border-r">
                    <FiUser
                      icon={faEnvelope}
                      className="text-[#e8b914] text-lg"
                    />
                  </span>
                  <input
                    className="form-control w-full p-2 outline-none"
                    placeholder="e.g. John Doe"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="name"
                    name="lasttName"
                    id="lasttName"
                  />
                </div>


                {formik.errors.name && formik.touched.name && (
                  <p className="text-red-600 mb-2">
                    {formik.errors.name}
                  </p>
                )}


                <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                <div className="input-group my-2 flex items-center border rounded">
                  <span className="input-group-text p-2 bg-white border-r">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[#e8b914] text-lg"
                    />
                  </span>
                  <input
                    className="form-control w-full p-2 outline-none"
                    placeholder="e.g. user@example.com"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-600 mb-2">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}

                <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                <div className="input-group relative my-2 flex items-center border rounded">
                  <span className="input-group-text p-2 bg-white border-r">
                    <FiLock className="text-[#e8b914] text-lg" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-full p-2  outline-none"
                    placeholder="••••••••"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="password"
                    id="password"
                  />
                  <span
                    className="p-2 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-gray-700"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-700"
                      />
                    )}
                  </span>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-600 mb-2">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}


                <label htmlFor="rePassword" className="block text-gray-700 mb-2">Confirm Password:</label>
                <div className="input-group relative my-2 flex items-center border rounded">
                  <span className="input-group-text p-2 bg-white border-r">
                    <FiLock className="text-[#e8b914] text-lg" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control w-full p-2  outline-none"
                    placeholder="••••••••"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="rePassword"
                    id="rePassword"
                  />
                  <span
                    className="p-2 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-gray-700"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-700"
                      />
                    )}
                  </span>
                </div>

                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-red-600 mb-2">
                    {formik.errors.rePassword}
                  </p>
                )}

                <p className="font-bold text-[#696a6b]">By Signup, you agree to our <span className="text-[#e8b914]">Terms of Service</span> & <span className="text-[#e8b914]">Privacy Policy</span></p>

                <div className="text-right mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"

                  >
                    {loaderbtn ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Create Account
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>


                <p className="font-bold mt-3"> Already have account?
                  <Link to="/login" className="text-[#e8b914]  ml-1 ">
                    log in
                  </Link></p>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
