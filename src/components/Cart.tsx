import React, {FC, useState} from "react";
import {RxCross1} from "react-icons/rx";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {emptyCart, setCartState, checkOut} from "../redux/features/cartSlice";
import CartRow from "./CartRow";
import {useNavigate} from "react-router-dom";
import {PaymentFormData} from "../models/PaymentFormData.ts";
import toast from "react-hot-toast";

const Cart: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.cartReducer.cartOpen);
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const checkoutState = useAppSelector((state) => state.cartReducer.checkOut);
    const [checkout2, setCheckout] = useState(false);
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
        console.log(checkoutState);
        return (
            <>
            <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-auto">
                    <div
                        className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 font-karla dark:bg-slate-600 dark:text-white"
                        data-test="cart-container"
                    >
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
                                        dispatch(checkOut(true))
                                    }}
                                    className="w-full text-center text-white bg-blue-500 py-2 my-4 rounded font-bold text-xl hover:bg-blue-700"
                                >
                                    CHECKOUT
                                </button>
                            </>
                        )}
                    </div>
            </div>
        if (checkoutState) {
            <div
                className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 font-karla dark:bg-slate-600 dark:text-white">
                <div className="payment-container">
                    {/*<div className="payment-summary">*/}
                    {/*    <h2>Order Summary</h2>*/}
                    {/*    <div className="order-items">*/}
                    {/*        {orderDetails.items.map((item) => (*/}
                    {/*            <div key={item.id} className="order-item">*/}
                    {/*                <span>{item.name}</span>*/}
                    {/*                <span>x{item.quantity}</span>*/}
                    {/*                <span>${item.price}</span>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*    <div className="order-total">*/}
                    {/*        <strong>Total:</strong>*/}
                    {/*        <span>${orderDetails.total}</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <form onSubmit={handleSubmit} className="payment-form">
                        <h2>Payment Details</h2>

                        <div className="form-group">
                            <label htmlFor="cardHolder">Card Holder Name</label>
                            <input
                                type="text"
                                id="cardHolder"
                                name="cardHolder"
                                value={formData.cardHolder}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={16}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    maxLength={5}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="payment-button">
                            {/*Pay ${orderDetails.total}*/100}
                        </button>
                        <button
                            className="w-1/2 border border-gray-500 rounded cursor-pointer text-center py-1"
                            onClick={() => setCheckout(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
            }
            </>
        );
    }
};

export default Cart;
