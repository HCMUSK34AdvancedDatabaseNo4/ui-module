import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { emptyCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phoneNumber: "",
        fullName: "",
        address: "",
        district: "",
        paymentMethod: "COD", // ✅ mặc định là COD
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(emptyCart());
        toast.success("Payment successful!");
        navigate("/checkout-success");
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="District"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="space-y-2">
                    <label className="font-medium">Payment Method</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="COD"
                                checked={formData.paymentMethod === "COD"}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            COD (Cash on Delivery)
                        </label>
                    </div>
                </div>

                <div className="text-lg font-medium text-right">
                    Total: <span className="text-blue-600 font-bold">${calculateTotal()}</span>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
