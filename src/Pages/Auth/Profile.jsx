import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import MyPhoto from '../../Assets/Images/its me.jpg';
import { toast } from "react-toastify";
import ChangePassword from './ChangePassword';
import UpdateData from './UpdateData';
import { FiSettings } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { GoQuestion } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import Navbar from '../Details/Navbar';

export default function Profile() {
    const [data, setData] = useState(null);
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
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart | Profile</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className="container mx-auto my-5 pt-10 pb-24" dir="ltr">
                <div className="p-8">
                    <div className="flex flex-col lg:flex-row mt-4">
                        <div className="lg:w-1/3 w-full">
                            <div className="text-center mb-5">
                                <img src={MyPhoto} alt="" className="w-32 h-32 mx-auto rounded-full     border-2 border-[#e8b914]" />
                                <p className="font-bold text-xl mt-2">{data?.name} Mahrous Gamal</p>
                            </div>
                            <ul className="list-none text-left">
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <FiSettings className="text-2xl mr-2" /> Account settings
                                </li>
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <MdOutlineShoppingCart className="text-2xl mr-2" /> Purchase History
                                </li>
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <AiOutlineMessage className="text-2xl mr-2" /> Feedback
                                </li>
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <GoQuestion className="text-2xl mr-2" /> Help & Support
                                </li>
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <LuUsers className="text-2xl mr-2" /> About us
                                </li>
                                <li className="font-bold py-3 px-2 border-b border-dark pb-3 flex items-center hover:bg-[#e8b914] hover:text-white cursor-pointer">
                                    <LuLogIn className="text-2xl mr-2" /> Sign Out
                                </li>
                            </ul>

                        </div>

                        <div className="lg:w-2/3 w-full border pb-3">
                            <div className="p-4">
                                <UpdateData />
                                <hr className="my-4" />
                                <ChangePassword />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Navigation */}
            <Navbar selectLink="1" />
        </>
    );
}
