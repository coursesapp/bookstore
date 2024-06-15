import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Shoping from "../../Assets/Images/Mkanak-Logo.png";
import BackGround from "../../Assets/Images/light-patten.svg";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => { setShowPassword((prevState) => !prevState); };

  let [error, setError] = useState(null);

  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        localStorage.setItem("token", response.data.token);

        if (response.data.message === "success") {

          localStorage.setItem("email", JSON.parse(values).email)
          navigate("/home");
        }
      })
      .catch((error) => {
        setLoaderbtn(false);
        setError(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

      });
  }

  function validationSchema() {
    const errors = Yup.object({
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
    });
    return errors;
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mkanak | Login</title>
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
          <h2 className="mb-5  text-gray-800 text-left mt-5 font-bold text-3xl">Login</h2>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-1/2 mb-0">
              <img src={Shoping} className="w-full" alt="" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center form-login">
              <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg">
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
                <Link to="/forgetPassword" className="text-[#4949fc] block mt-2 mb-4 text-[16px] font-bold hover:underline">
                  Forgot Password?
                </Link>
                <div className="text-right mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"

                  >
                    {loaderbtn ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Login
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <p className="font-bold mt-3">
                  Don't have an account?
                  <Link to="/register" className="text-[#e8b914]  ml-1">
                    Signup now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
