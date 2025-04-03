import React, {FC, useState} from "react";
import {RxCross1} from "react-icons/rx";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {emptyCart, setCartState} from "../redux/features/cartSlice";
import CartRow from "./CartRow";
import {useNavigate} from "react-router-dom";
import {PaymentFormData} from "../models/PaymentFormData.ts";
import toast from "react-hot-toast";

const Cart: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.cartReducer.cartOpen);
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const [checkout, setCheckout] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PaymentFormData>({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Add your payment processing logic here
            // Example API call:
            // const response = await processPayment(formData, orderDetails);

            // If payment successful
            navigate('/checkout-success');
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            if (item.quantity)
                total +=
                    (item.price * item.quantity);
        });
        return total.toFixed(2);
    };

    const handleOrder = () => {
        dispatch(setCartState(false));
        dispatch(emptyCart());
        setCheckout(false);
        toast.success("Your order has been confirmed", {duration: 3000});
    };

    if (isOpen) {
        return (
            <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-auto">
                <div
                    className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 font-karla dark:bg-slate-600 dark:text-white"
                    data-test="cart-container">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-2xl">Your Cart</h3>
                        <RxCross1
                            className="text-[24px] cursor-pointer hover:opacity-70"
                            onClick={() => dispatch(setCartState(false))}
                            data-test="cart-close"
                        />
                    </div>
                    <div className="mt-6 space-y-2">
                        {items?.length > 0 ? (
                            items.map((item) => <CartRow key={item.id} {...item} />)
                        ) : (
                            <div className="flex flex-col justify-center items-center p-4">
                                <img src="/emptyCart.jpg" alt="empty" className="w-40"/>
                                <p className="text-center text-xl my-2">Your cart is empty</p>
                            </div>
                        )}
                        {items?.length > 0 && (
                            <div className="payment-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                                <form onSubmit={handleSubmit} className="payment-form">
                                    <div className="form-group">
                                        <label htmlFor="cardHolder"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Holder Name
                                        </label>
                                        <input
                                            type="text"
                                            id="cardHolder"
                                            name="cardHolder"
                                            value={formData.cardHolder}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cardNumber"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            maxLength={16}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label htmlFor="expiryDate"
                                                   className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                maxLength={5}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cvv"
                                                   className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                maxLength={3}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>)}
                    </div>
                    {items?.length > 0 && (
                        <>
                            <div className="flex items-center justify-between p-2">
                                <h2 className="font-bold text-2xl">Total</h2>
                                <h2 className="font-bold text-2xl">${calculateTotal()}</h2>
                            </div>
                            <button
                                type="button"
                                data-test="checkout-btn"
                                onClick={() => {
                                    setCheckout(true);
                                    handleOrder();
                                }}
                                className="w-full text-center text-white bg-blue-500 py-2 my-4 rounded font-bold text-xl hover:bg-blue-700"
                            >
                                CHECKOUT
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }
};

export default Cart;
