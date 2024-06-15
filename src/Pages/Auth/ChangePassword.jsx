import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BackGround from "../../Assets/Images/light-patten.svg";

export default function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleCurrentPassword = () => {
        setShowCurrentPassword((prevState) => !prevState);
    };
    const toggleNewPassword = () => {
        setShowNewPassword((prevState) => !prevState);
    };
    const toggleConfirmPassword = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    let [error, setError] = useState(null);
    const [loaderbtn, setLoaderbtn] = useState(false);
    let navigate = useNavigate();

    function sign_up(values) {
        axios
            .put(
                "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                setLoaderbtn(false);
                if (response?.data?.message === 'success') {
                    toast.success("Your Password has been updated successfully");
                    localStorage.clear();
                    navigate('/login');
                }
            })
            .catch((error) => {
                setLoaderbtn(false);
                toast.error(error?.response?.data?.errors?.msg);
            });
    }

    function validationSchema() {
        const errors = Yup.object({
            currentPassword: Yup.string()
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Minimum eight characters, at least one letter, one number and one special character"
                )
                .required("Current Password is a required field"),
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
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setLoaderbtn(true);
            sign_up(JSON.stringify(values));
        },
    });

    return (

        <div className="mx-auto" dir="ltr">
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
            <h4 className="mb-4 font-bold text-dark text-xl">Change password</h4>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="currentPassword">Current Password:</label>
                <div className="flex items-center border border-gray-300 rounded mb-4">
                    <span className="p-2 bg-gray-100 border-r border-gray-300">
                        <FiLock className="text-[#e8b914] text-lg" />
                    </span>
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="flex-1 p-2"
                        placeholder="••••••••"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="currentPassword"
                        id="currentPassword"
                    />
                    <span
                        className="p-2 cursor-pointer"
                        onClick={toggleCurrentPassword}
                    >
                        {showCurrentPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" />
                        )}
                    </span>
                </div>
                {formik.errors.currentPassword && formik.touched.currentPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
                )}

                <label htmlFor="Password">New Password:</label>
                <div className="flex items-center border border-gray-300 rounded mb-4">
                    <span className="p-2 bg-gray-100 border-r border-gray-300">
                        <FiLock className="text-[#e8b914] text-lg" />
                    </span>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        className="flex-1 p-2"
                        placeholder="••••••••"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="password"
                        id="password"
                    />
                    <span
                        className="p-2 cursor-pointer"
                        onClick={toggleNewPassword}
                    >
                        {showNewPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" />
                        )}
                    </span>
                </div>
                {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}

                <label htmlFor="rePassword">Confirm New Password:</label>
                <div className="flex items-center border border-gray-300 rounded mb-4">
                    <span className="p-2 bg-gray-100 border-r border-gray-300">
                        <FiLock className="text-[#e8b914] text-lg" />
                    </span>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="flex-1 p-2"
                        placeholder="••••••••"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="rePassword"
                        id="rePassword"
                    />
                    <span
                        className="p-2 cursor-pointer"
                        onClick={toggleConfirmPassword}
                    >
                        {showConfirmPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className="text-lg" />
                        )}
                    </span>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword && (
                    <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
                )}

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="text-right">
                    <button
                        type="submit"
                        className="py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"
                    >
                        {loaderbtn ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Change Password
                            </>
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
