import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import BackGround from "../../Assets/Images/light-patten.svg";

export default function ForgetPass() {
    let [error, setError] = useState(null);

    const navigate = useNavigate();
    const [loaderbtn, setLoaderbtn] = useState(false);

    const sign_in = (values) => {
        axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setLoaderbtn(false);
                response.status === 200 ? navigate("/resetPassword") : setError(response?.data?.message);
            })
            .catch((error) => {
                setLoaderbtn(false);
                setError(error?.response?.data?.message);
                toast.error("Reset code is invalid or has expired");
                console.log(error?.response?.data?.message);
            });
    };

    const validationSchema = () => {
        return Yup.object({
            resetCode: Yup.string()
                .min(5, "Reset code must be at least 5 digits")
                .max(8, "Reset code must be at most 8 digits")
                .required("Reset code is a required field"),
        });
    };

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            setLoaderbtn(true);
            sign_in(values);
        },
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mkanak | Reset Code</title>
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
            <div className="pt-20" dir="ltr">
                <div className="w-3/4  mx-auto my-5">
                    <h2 className="mb-10 font-bold  text-3xl">Verify Reset Code</h2>
                    <p className="font-bold my-3">Enter the 6-digit code</p>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="resetCode" className="block text-left">Reset Code:</label>
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            name="resetCode"
                            className="form-control my-2 border p-2 rounded w-full outline-none"
                            id="resetCode"
                            placeholder="6-digit code"
                        />
                        {formik.errors.resetCode && formik.touched.resetCode ? (
                            <p className="text-red-500 text-left">
                                {formik.errors.resetCode}
                            </p>
                        ) : null}

                        <div className="text-right">
                            <button
                                type="submit"
                                className="py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"
                            >
                                {loaderbtn ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Verify
                                    </>
                                ) : (
                                    "Verify"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
