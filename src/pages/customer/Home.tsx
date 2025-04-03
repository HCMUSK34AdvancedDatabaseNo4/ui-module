import {FC, useEffect} from "react";
import HeroSection from "../../components/HeroSection.tsx";
import Features from "../../components/Features.tsx";
import TrendingProducts from "../../components/TrendingProducts.tsx";
import {useAppDispatch} from "../../redux/hooks.ts";
import {
    updateNewList,
    updateFeaturedList,
} from "../../redux/features/productSlice.ts";
import {Product} from "../../models/Product.ts";
import LatestProducts from "../../components/LatestProducts.tsx";
import Banner from "../../components/Banner.tsx";

const Home: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProducts = () => {
            fetch("https://www.productservice.somee.com/api/Product/user?PageNumber=1&Size=24")
                .then((res) => res.json())
                .then((products) => {
                    const productList: Product[] = [];
                    products.forEach((product: Product) => {
                        productList.push({
                            id: product.id,
                            productName: product.productName,
                            images: product.images,
                            price: product.price,
                            description: product.description,
                            categories: product.categories,
                            discountPercentage: product.discountPercentage,
                            supplierCode: product.supplierCode,
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
            <HeroSection/>
            <Features/>
            <TrendingProducts/>
            <Banner/>
            <LatestProducts/>
            <br/>
        </div>
    );
};

export default Home;
