import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { emptyCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phoneNumber: "",
        fullName: "",
        address: "",
        district: "",
        paymentMethod: "COD",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () =>
        items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date().toISOString();
        const orderItems = items.map((item) => ({
            Id: uuidv4(),
            OrderItemId: uuidv4(),
            UserId: "123",
            ProductId: item.id,
            Quantity: item.quantity,
            Price: item.price,
            Subtotal: item.quantity * item.price,
            TotalPrice: item.quantity * item.price,
            CreatedDate: now,
            UpdatedDate: now,
            VoucherId: null,
            ShipmentStatus: "Pending",
            PaymentStatus: "Unpaid",
        }));

        if (orderItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/Order/PlaceOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderItems),
            });

            if (!res.ok) throw new Error(await res.text());

            // Save latest order
            localStorage.setItem("lastOrder", JSON.stringify(orderItems));

            // Append to orderHistory
            const prev = JSON.parse(localStorage.getItem("orderHistory") || "[]");
            prev.push(orderItems);
            localStorage.setItem("orderHistory", JSON.stringify(prev));

            toast.success("✅ Order placed successfully!");
            dispatch(emptyCart());
            navigate("/checkout-success");
        } catch (error) {
            console.error("❌ Error:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    name="district"
                    placeholder="District"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border px-4 py-2 rounded"
                />

                <div className="text-right font-semibold">
                    Total: {calculateTotal()} USD
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
