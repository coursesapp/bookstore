import React from "react";
import error from "../../Assets/Images/404 error lost in space-cuate.svg";

export default function NotFound() {
    return (
        <div className="text-center mt-4" dir="ltr">
            <img
                src={error}
                alt="error"
                className="w-full h-[90vh] mt-2"
            />
            <p className="font-bold text-lg">This page you are looking for could not be found.</p>
        </div>
    );
}
