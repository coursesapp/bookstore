import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchInput() {
    return (
        <>
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-lg">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-full"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
                    />
                </div>
            </div>

        </>
    )
}
