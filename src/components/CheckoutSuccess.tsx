import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
        <div className="max-w-xl mx-auto mt-16 p-6 text-center bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
            <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>
            <Link
                to="/"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default CheckoutSuccess;