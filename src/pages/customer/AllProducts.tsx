import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";
import { addProducts } from "../../redux/features/productSlice.ts";
import ProductCard from "../../components/ProductCard.tsx";
import { Product } from "../../models/Product.ts";
import { useLocation } from "react-router-dom";

const AllProducts: FC = () => {
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLSelectElement>(null);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const allProducts = useAppSelector((state) => state.productReducer.allProducts);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("KeyWord") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const url = keyword
          ? `https://productservice.somee.com/api/Product/user?PageNumber=1&Size=20&KeyWord=${encodeURIComponent(keyword)}`
          : `https://productservice.somee.com/api/Product/user?PageNumber=1&Size=20`;

      console.log("✅ Fetching from:", url);

      try {
        const res = await fetch(url);
        const products = await res.json();
        console.log("✅ API response:", products);
        dispatch(addProducts(products));
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchProducts();
  }, [keyword, dispatch]);

  useEffect(() => {
    setCurrentProducts(allProducts);
  }, [allProducts]);

  const sortProducts = (sortValue: string) => {
    if (sortValue === "asc") {
      setCurrentProducts([...currentProducts].sort((a, b) => {
        const aPrice = a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
        const bPrice = b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
        return aPrice - bPrice;
      }));
    } else if (sortValue === "desc") {
      setCurrentProducts([...currentProducts].sort((a, b) => {
        const aPrice = a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
        const bPrice = b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
        return bPrice - aPrice;
      }));
    } else {
      setCurrentProducts([...currentProducts].sort((a, b) => a.id - b.id));
    }
  };

  return (
      <div className="container mx-auto min-h-[83vh] p-4 font-karla">
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-4 space-y-4">
            <div className="flex items-center justify-between">
            <span className="text-lg dark:text-white">
              {keyword ? `Search results for "${keyword}"` : "Products"}
            </span>
              <select
                  ref={sortRef}
                  className="border border-black dark:border-white rounded p-1 dark:text-white dark:bg-slate-600"
                  onChange={(e) => sortProducts(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="asc">Price (low to high)</option>
                <option value="desc">Price (high to low)</option>
              </select>
            </div>

            <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {currentProducts.length === 0 ? (
                  <p className="col-span-4 text-center text-gray-500 dark:text-gray-300">
                    No products found.
                  </p>
              ) : (
                  currentProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default AllProducts;
