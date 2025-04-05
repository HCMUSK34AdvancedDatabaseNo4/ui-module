import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

interface Product {
    id: string;
    productName: string;
    price: number;
    productInventoryId: number;
    images: string[];
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const size = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://productservice.somee.com/api/Product/user?pageNumber=${currentPage}&size=${size}`
                );
                setProducts(res.data);
                setHasMore(res.data.length === size);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchData();
    }, [currentPage]);

    const goToNextPage = () => {
        if (hasMore) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="admin_container">
            <Sidebar />
            <main className="p-6 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Products - Page {currentPage}</h2>
                    <Link
                        to="/admin/products/new"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        + Add Product
                    </Link>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Photo</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t">
                                <td className="p-3">
                                    <img
                                        src={product.images[0]}
                                        alt={product.productName}
                                        className="w-16 h-16 object-contain rounded"
                                        onError={(e) => (e.currentTarget.src = "/no-image.png")}
                                    />
                                </td>
                                <td className="p-3">{product.productName}</td>
                                <td className="p-3">{product.price}</td>
                                <td className="p-3">{product.productInventoryId}</td>
                                <td className="p-3">
                                    <Link
                                        to={`/admin/products/${product.id}`}
                                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                                    >
                                        Manage
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-500 py-4">
                                    No products found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-medium">Page {currentPage}</span>
                    <button
                        onClick={goToNextPage}
                        disabled={!hasMore}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Products;
