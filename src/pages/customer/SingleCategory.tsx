import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/Product.ts";
import ProductCard from "../../components/ProductCard.tsx";

const SingleCategory: FC = () => {
  const { slug } = useParams();
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const category = (await fetch(`https://www.productservice.somee.com/api/Category/${slug}`)).json();
        const categoryName = (await category).categoryName;
        setCategoryName(categoryName);
        const encodedCategoryName = encodeURIComponent(categoryName || "");
        const products = (await fetch(`https://www.productservice.somee.com/api/Product/user?PageNumber=1&Size=10&Category=${encodedCategoryName}`)).json();
        setProductList(await products);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [slug]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="flex items-center space-x-2 text-lg dark:text-white">
        <span>Categories</span>
        <span> {">"} </span>
        <span className="font-bold">{categoryName}</span>
      </div>
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
        {productList?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
