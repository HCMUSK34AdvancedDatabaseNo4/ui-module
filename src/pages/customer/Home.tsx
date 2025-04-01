import { FC, useEffect } from "react";
import HeroSection from "../../components/HeroSection.tsx";
import Features from "../../components/Features.tsx";
import TrendingProducts from "../../components/TrendingProducts.tsx";
import { useAppDispatch } from "../../redux/hooks.ts";
import {
  updateNewList,
  updateFeaturedList,
} from "../../redux/features/productSlice.ts";
import { Product } from "../../models/Product.ts";
import LatestProducts from "../../components/LatestProducts.tsx";
import Banner from "../../components/Banner.tsx";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://dummyjson.com/products?limit=24")
        .then((res) => res.json())
        .then(({ products }) => {
          const productList: Product[] = [];
          products.forEach((product: Product) => {
            productList.push({
              id: product.id,
              title: product.title,
              images: product.images,
              price: product.price,
              rating: product.rating,
              thumbnail: product.thumbnail,
              description: product.description,
              category: product.category,
              discountPercentage: product.discountPercentage,
            });
          });
          dispatch(updateFeaturedList(productList.slice(0, 8)));
          dispatch(updateNewList(productList.slice(8, 16)));
        });
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="dark:bg-slate-800">
      <HeroSection />
      <Features />
      <TrendingProducts />
      <Banner />
      <LatestProducts />
      <br />
    </div>
  );
};

export default Home;
