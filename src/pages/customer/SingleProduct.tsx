import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks.ts";
import { addToCart, setCartState } from "../../redux/features/cartSlice.ts";
import { Product } from "../../models/Product.ts";
import PriceSection from "../../components/PriceSection.tsx";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import ProductList from "../../components/ProductList.tsx";
import Reviews from "../../components/Reviews.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { MdFavoriteBorder } from "react-icons/md";
import { addToWishlist } from "../../redux/features/productSlice.ts";

const SingleProduct: FC = () => {
    const dispatch = useAppDispatch();
    const { productID } = useParams();
    const [product, setProduct] = useState<Product>();
    const [imgs, setImgs] = useState<string[]>();
    const [selectedImg, setSelectedImg] = useState<string>();
    const [sCategory, setScategory] = useState<string>();
    const [similar, setSimilar] = useState<Product[]>([]);
    const { requireAuth } = useAuth();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [productID]);

    useEffect(() => {
        const fetchProductDetails = () => {
            fetch(`https://www.productservice.somee.com/api/Product/${productID}`)
                .then((res) => res.json())
                .then((data) => {
                    const { images, categories } = data;
                    setProduct(data);
                    setImgs(images);
                    setScategory(categories[0]);
                    setSelectedImg(images[0]);
                });
        };
        fetchProductDetails();
    }, [productID]);

    useEffect(() => {
        const fetchPreferences = (cat: string) => {
            fetch(`http://localhost:3000/api/recommendations/product/${productID}`)
                .then((res) => res.json())
                .then((data) => {
                    const _products: Product[] = data.response.recommendations;
                    setSimilar(_products);
                })
                .catch((_) => {
                    fetch(
                        `https://www.productservice.somee.com/api/Product/user?PageNumber=1&Size=8&Category=${cat}`
                    )
                        .then((res) => res.json())
                        .then((data) => setSimilar(data));
                });
        };
        if (sCategory && sCategory !== "") fetchPreferences(sCategory);
    }, [productID, sCategory]);

    const addCart = () => {
        requireAuth(() => {
            if (product)
                dispatch(
                    addToCart({
                        id: product.id,
                        price: product.price,
                        productName: product.productName,
                        categories: product.categories,
                        images: product.images,
                        supplierCode: product.supplierCode,
                        thumbnail: product.images[0],
                    })
                );
            toast.success("item added to cart successfully", { duration: 3000 });
        });
    };

    const buyNow = () => {
        requireAuth(() => {
            if (product)
                dispatch(
                    addToCart({
                        id: product.id,
                        price: product.price,
                        productName: product.productName,
                        categories: product.categories,
                        thumbnail: product.images[0],
                        images: product.images,
                        supplierCode: product.supplierCode,
                        discountPercentage: product.discountPercentage,
                    })
                );
            dispatch(setCartState(true));
        });
    };

    const addWishlist = () => {
        requireAuth(() => {
            if (product) {
                dispatch(addToWishlist(product));
                toast.success("item added to your wishlist", { duration: 3000 });
            }
        });
    };

    return (
        <div className="container mx-auto pt-8 dark:text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 font-karla">
                {/* Image gallery */}
                <div className="space-y-4">
                    <img src={selectedImg} alt="selected" className="h-80 w-full object-contain rounded-md border" />
                    <div className="flex flex-wrap gap-2">
                        {imgs?.map((_img) => (
                            <img
                                src={_img}
                                key={_img}
                                alt="thumb"
                                className={`w-16 h-16 object-contain rounded cursor-pointer border ${_img === selectedImg ? "border-blue-500" : "hover:border-gray-400"}`}
                                onClick={() => setSelectedImg(_img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product info */}
                <div className="px-2">
                    <h2 className="text-3xl font-bold mb-2">{product?.productName}</h2>
                    <div className="mb-4">
                        {product?.discountPercentage && (
                            <PriceSection discountPercentage={product.discountPercentage} price={product.price} />
                        )}
                    </div>
                    <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
                        <tbody>
                        <tr className="border-b">
                            <td className="px-3 py-2 font-semibold bg-gray-50 w-32">Brand</td>
                            <td className="px-3 py-2">{product?.supplierCode}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-3 py-2 font-semibold bg-gray-50">Category</td>
                            <td className="px-3 py-2">{product?.categories.join(", ")}</td>
                        </tr>
                        <tr>
                            <td className="px-3 py-2 font-semibold bg-gray-50">Stock</td>
                            <td className="px-3 py-2">{product?.productInventoryId}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-1">About the product</h3>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            {product?.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center mt-6 gap-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 hover:bg-pink-700 text-white py-2 px-4 rounded bg-pink-500"
                            onClick={addCart}
                            title="ADD TO CART"
                        >
                            <AiOutlineShoppingCart /> Add to Cart
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            onClick={buyNow}
                            title="BUY NOW"
                        >
                            <FaHandHoldingDollar /> Buy Now
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                            onClick={addWishlist}
                            title="ADD TO WISHLIST"
                        >
                            <MdFavoriteBorder /> Wishlist
                        </button>
                    </div>
                </div>

                {/* Reviews */}
                {product && <Reviews id={product.id} />}
            </div>

            <hr className="mt-6" />
            <ProductList title="Similar Products" products={similar} />
            <br />
        </div>
    );
};

export default SingleProduct;
