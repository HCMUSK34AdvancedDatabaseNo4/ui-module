import React, {FC} from "react";
import {RxCross1} from "react-icons/rx";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setCartState} from "../redux/features/cartSlice";
import CartRow from "./CartRow";
import {useNavigate} from "react-router-dom";

const Cart: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.cartReducer.cartOpen);
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const navigate = useNavigate();

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            if (item.quantity)
                total += (item.price * item.quantity);
        });
        return total.toFixed(2);
    };

    const handleGoToCheckout = () => {
        dispatch(setCartState(false));
        navigate("/checkout");
    };

    if (!isOpen) return null;

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
                            onClick={handleGoToCheckout}
                            className="w-full text-center text-white bg-blue-500 py-2 my-4 rounded font-bold text-xl hover:bg-blue-700 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;