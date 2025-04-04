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

const lorem =
  "It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.";

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
          console.log(data);
          const _products: Product[] = data.response.recommendations;
          console.log(_products);
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
      toast.success("item added to cart successfully", {
        duration: 3000,
      });
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
        toast.success("item added to your wishlist", {
          duration: 3000,
        });
      }
    });
  };

  return (
    <div className="container mx-auto pt-8 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        <div className="space-y-2">
          <img src={selectedImg} alt="selected" className="h-80" />
          <div className="flex space-x-1 items-center">
            {imgs &&
              imgs.map((_img) => (
                <img
                  src={_img}
                  key={_img}
                  alt="thumb"
                  className={`w-12 cursor-pointer hover:border-2 hover:border-black ${
                    _img === selectedImg ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setSelectedImg(_img)}
                />
              ))}
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-2xl">{product?.productName}</h2>
          <div className="mt-1">
            {product?.discountPercentage && (
              <PriceSection
                discountPercentage={product?.discountPercentage}
                price={product?.price}
              />
            )}
          </div>
          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Brand</td>
                <td>{product?.supplierCode}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.categories.join(", ")}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Stock</td>
                <td>{999}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">
              {product?.description} {lorem}
            </p>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-2">
            <button
              type="button"
              className="flex space-x-1 items-center mr-2 mb-2 hover:bg-pink-700 text-white py-2 px-4 rounded bg-pink-500"
              onClick={addCart}
              title="ADD TO CART"
            >
              <AiOutlineShoppingCart />
            </button>
            <button
              type="button"
              className="flex space-x-1 items-center mr-2 mb-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={buyNow}
              title="BUY NOW"
            >
              <FaHandHoldingDollar />
            </button>
            <button
              type="button"
              className="flex space-x-1 items-center mb-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
              onClick={addWishlist}
              title="ADD TO WISHLIST"
            >
              <MdFavoriteBorder />
            </button>
          </div>
        </div>
        {product && <Reviews id={product?.id} />}
      </div>
      <hr className="mt-4" />
      <ProductList title="Similar Products" products={similar} />
      <br />
    </div>
  );
};

export default SingleProduct;
