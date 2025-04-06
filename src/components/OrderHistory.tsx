import React, { useEffect, useState } from "react";

interface OrderItem {
    ProductId?: string;
    productId?: string;
    Quantity?: number;
    quantity?: number;
    Price?: number;
    price?: number;
}

interface Product {
    id: string;
    productName: string;
    images: string[];
}

const OrderHistory = () => {
    const [history, setHistory] = useState<OrderItem[][]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load all orders from history
        const savedHistory = localStorage.getItem("orderHistory");
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                if (Array.isArray(parsed)) setHistory(parsed.reverse()); // newest first
            } catch (err) {
                console.error("❌ Failed to parse order history:", err);
            }
        }

        // Fetch product info
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://www.productservice.somee.com/api/Product/user?PageNumber=1&Size=1000");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("❌ Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductInfo = (productId: string) =>
        products.find((p) => p.id === productId);

    const formatCurrency = (value: number) =>
        value.toLocaleString("en-US", { style: "currency", currency: "USD" });

    const getTotal = (order: OrderItem[]) =>
        order.reduce((acc, item) => {
            const qty = item.quantity ?? item.Quantity ?? 0;
            const price = item.price ?? item.Price ?? 0;
            return acc + qty * price;
        }, 0);

    if (loading) return <p className="text-center mt-10">Loading order history...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">🧾 Order History</h2>

            {history.length > 0 ? (
                history.map((order, index) => (
                    <div key={index} className="mb-10 border border-gray-300 rounded-md p-4 shadow">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Order #{history.length - index}</h3>
                        <table className="w-full border text-sm">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-3 py-2 text-left">Product</th>
                                <th className="px-3 py-2 text-center">Image</th>
                                <th className="px-3 py-2 text-center">Qty</th>
                                <th className="px-3 py-2 text-right">Price</th>
                                <th className="px-3 py-2 text-right">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.map((item, idx) => {
                                const productId = item.ProductId || item.productId || "";
                                const info = getProductInfo(productId);
                                const qty = item.Quantity ?? item.quantity ?? 0;
                                const price = item.Price ?? item.price ?? 0;

                                return (
                                    <tr key={idx} className="border-t">
                                        <td className="px-3 py-2">{info?.productName || productId}</td>
                                        <td className="px-3 py-2 text-center">
                                            {info?.images?.[0] ? (
                                                <img
                                                    src={info.images[0]}
                                                    alt={info.productName}
                                                    className="h-10 object-cover inline"
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">{qty}</td>
                                        <td className="px-3 py-2 text-right">{formatCurrency(price)}</td>
                                        <td className="px-3 py-2 text-right">{formatCurrency(price * qty)}</td>
                                    </tr>
                                );
                            })}
                            <tr className="border-t font-bold bg-gray-50">
                                <td className="px-3 py-2 text-right" colSpan={4}>
                                    Total:
                                </td>
                                <td className="px-3 py-2 text-right">{formatCurrency(getTotal(order))}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No previous orders found.</p>
            )}

            <div className="text-center mt-8">
                <a
                    href="/"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default OrderHistory;
