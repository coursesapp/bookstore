import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import BackGround from "../../Assets/Images/light-patten.svg";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => { setShowPassword((prevState) => !prevState); };
  const toggleConfirmPassword = () => { setShowConfirmPassword((prevState) => !prevState); };

  let [error, setError] = useState("");

  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/login");
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
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirm new password does not match")
        .required("Confirm new password is a required field"),
    });
    return errors;
  }

  let formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mkanak | Reset Password</title>
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
      <div className="pt-24" dir="ltr">
        <div className="w-3/4 mx-auto my-5">
          <h2 className="mb-10 font-bold text-3xl">Reset Password</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="password" className="block text-gray-700 mb-2">New Password:</label>
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


            <label htmlFor="rePassword" className="block text-gray-700 mb-2 mt-6">Confirm New Password:</label>
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

            <div className="text-right">
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Reset Password
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
