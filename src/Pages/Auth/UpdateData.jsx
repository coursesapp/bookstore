import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";
// import jwtDecode from "jwt-decode";

export default function UpdateData() {
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const decode = jwtDecode(localStorage.getItem("token"));
    //     setData(decode);
    // }, []);

    let [error, setError] = useState(null);
    let navigate = useNavigate();
    const [loaderbtn, setLoaderbtn] = useState(false);

    function update(values) {
        axios
            .put("https://ecommerce.routemisr.com/api/v1/users/UpdateMe/", values, {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setLoaderbtn(false);
                if (response?.data?.message === 'success') {
                    toast.success("Your Data has been updated successfully");
                    localStorage.setItem('email', response?.data?.user?.email);
                    localStorage.setItem('phone', response?.data?.user?.phone);
                    navigate("/profile");
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
            name: Yup.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").required("Name is a required field"),
            email: Yup.string()
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email address"
                )
                .required("Email is a required field"),
            phone: Yup.string()
                .matches(
                    /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
                    "Please enter a valid phone number"
                )
                .required("Phone is a required field"),
        });
        return errors;
    }

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setLoaderbtn(true);
            update(JSON.stringify(values));
        },
    });

    return (
        <div dir="ltr">
            <h2 className="mb-3 font-bold text-dark text-xl">Your info </h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 p-2">
                        <div className="flex items-center border border-gray-300 rounded mb-4">
                            <span className="p-2 bg-gray-100 border-r border-gray-300">
                                <FiUser className="text-[#e8b914] text-lg" />
                            </span>
                            <input
                                type="text"
                                className="flex-1 p-2"
                                placeholder="e.g. John Doe"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="name"
                                id="name"
                                defaultValue={data?.name}
                            />
                        </div>
                        {formik.errors.name && formik.touched.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 p-2">
                        <div className="flex items-center border border-gray-300 rounded mb-4">
                            <span className="p-2 bg-gray-100 border-r border-gray-300">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-[#e8b914] text-lg"
                                />
                            </span>
                            <input
                                className="flex-1 p-2"
                                placeholder="e.g. user@example.com"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={localStorage.getItem("email")}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 p-2">
                        <div className="flex items-center border border-gray-300 rounded mb-4">
                            <span className="p-2 bg-gray-100 border-r border-gray-300">
                                <FiPhone className="text-[#e8b914] text-lg" />
                            </span>
                            <input
                                className="flex-1 p-2"
                                placeholder="e.g. 01001449752"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="tel"
                                name="phone"
                                id="phone"
                            />
                        </div>
                        {formik.errors.phone && formik.touched.phone && (
                            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                        )}
                    </div>
                </div>

                <div className="text-right mt-3">
                    <button
                        type="submit"
                        className="py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]"
                    >
                        {loaderbtn ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Save Changes
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
