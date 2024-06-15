import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Froget from "../../Assets/Images/forgetLock.svg";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import BackGround from "../../Assets/Images/light-patten.svg";

export default function ForgetPassword() {
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let [loaderbtn, setLoaderbtn] = useState(false);

    function sign_in(values) {
        axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setLoaderbtn(false);
                if (response.data.statusMsg === "success") {
                    navigate("/VerifyResetCode");
                    toast.success("Password Reset Link Sent Successfully");
                }
            })
            .catch((error) => {
                setLoaderbtn(false);
                setError(error?.response?.data?.message);
                toast.error("There is no user registered with this email address");
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
        });
        return errors;
    }

    let formik = useFormik({
        initialValues: {
            email: "",
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
                <title>Mkanak | Forget Password</title>
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
                <div className="w-3/4  mx-auto my-5 text-center flex flex-col items-center">
                    <img src={Froget} alt="Forget Password" className="mb-4" />
                    <h2 className="mb-5 font-bold text-dark mt-4 text-3xl">Forget Password !</h2>
                    <p className="text-lg mb-3">Don't worry, we'll cover you. Enter the email address associated with this account.</p>
                    <form onSubmit={formik.handleSubmit} className="w-full">

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
                            <p className="text-red-600 mb-2 text-left">
                                {formik.errors.email}
                            </p>
                        ) : (
                            ""
                        )}

                        <div className="text-right">
                            <button
                                type="submit"
                                className="py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"

                            >
                                {loaderbtn ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Submit
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
