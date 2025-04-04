import {FC} from "react";
import {Product} from "../models/Product";
import {addToCart} from "../redux/features/cartSlice";
import {useAppDispatch} from "../redux/hooks";
import toast from "react-hot-toast";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PriceSection from "./PriceSection";

const ProductCard: FC<Product> = ({
                                      id,
                                      price,
                                      productName,
                                      images,
                                      categories,
                                      supplierCode,
                                  }) => {
    const dispatch = useAppDispatch();
    const {requireAuth} = useAuth();

    const addCart = () => {
        requireAuth(() => {
            dispatch(
                addToCart({
                    id,
                    price,
                    productName,
                    images,
                    categories,
                    supplierCode,
                    thumbnail: images[0],
                })
            );
            toast.success("item added to cart successfully", {
                duration: 3000,
            });
        });
    };

    return (
        <div className="border border-gray-200 font-lato rounded-xl shadow-md hover:shadow-md duration-500 transition-transform hover:scale-105 bg-white"
            data-test="product-card" >
            <div className="text-center border-b border-gray-200">
                <Link to={{pathname: `/products/${id}`}}>
                    <img
                        src={images[0]}
                        alt={productName}
                        className="inline-block h-60 "
                    />
                </Link>
            </div>
            <div className="px-4 pt-4">
                <p className="text-gray-500 text-[14px] font-medium dark:text-white">
                    {categories.join(", ")}
                </p>
                <Link
                    className="font-semibold hover:underline dark:text-white overflow-hidden text-ellipsis whitespace-nowrap block"
                    to={{pathname: `/products/${id}`}}
                    title={productName}
                >
                    {productName}
                </Link>
            </div>
            <div className="flex flex-wrap items-center justify-between px-4 pb-4">
                {(<PriceSection price={price} discountPercentage={0}/>)}
                <button
                    type="button"
                    className="flex items-center space-x-2 hover:bg-blue-500 text-white py-2 px-4 rounded bg-pink-500"
                    onClick={addCart}
                    data-test="add-cart-btn"
                    title="ADD TO CART"
                >
                    <AiOutlineShoppingCart/>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
