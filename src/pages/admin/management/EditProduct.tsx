import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
    id: string;
    productName: string;
    price: number;
    productInventoryId: number;
    images: string[];
}

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        id: "",
        productName: "",
        price: 0,
        productInventoryId: 0,
        images: [""]
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://productservice.somee.com/api/Product/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product", err);
                alert("Unable to get product information!");
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === "price" || name === "productInventoryId" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`https://productservice.somee.com/api/Product/${id}`, product);
            alert("Product update successful!");
            navigate("/admin/products");
        } catch (err) {
            console.error("Failed to update product", err);
            alert("Update failed. Please try again!");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://productservice.somee.com/api/Product/${id}`);
            alert("Product deleted successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error("Failed to delete product", err);
            alert("Delete product failed!");
        }
    };

    return (
        <div className="flex px-8 py-6">
            <main className="w-full max-w-3xl mx-auto p-10 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Edit product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product name</label>
                        <input
                            type="text"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="Tên sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="Price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Inventory quantity</label>
                        <input
                            type="number"
                            name="productInventoryId"
                            value={product.productInventoryId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="Inventory"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            type="text"
                            name="images"
                            value={product.images[0] || ""}
                            onChange={(e) =>
                                setProduct(prev => ({ ...prev, images: [e.target.value] }))
                            }
                            className="w-full p-2 border rounded focus:outline-blue-500"
                            placeholder="URL image"
                        />
                    </div>

                    {product.images[0] && (
                        <div className="text-center">
                            <img
                                src={product.images[0]}
                                alt="Preview"
                                className="w-40 h-40 object-contain border rounded mx-auto"
                                onError={(e) => (e.currentTarget.src = "/no-image.png")}
                            />
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default EditProduct;
