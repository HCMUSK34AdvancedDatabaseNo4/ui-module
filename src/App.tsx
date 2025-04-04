// Core dependencies
import {Provider} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";

// Styles
import "./App.css";

// Store
import {store} from "./redux/store";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import LoginModal from "./components/LoginModal";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BannerPopup from "./components/BannerPopup";

// Customer Pages
import Home from "./pages/customer/Home";
import AllProducts from "./pages/customer/AllProducts";
import SingleProduct from "./pages/customer/SingleProduct";
import AllCategories from "./pages/customer/AllCategories";
import SingleCategory from "./pages/customer/SingleCategory";
import Wishlist from "./pages/customer/Wishlist";
import Profile from "./pages/customer/Profile";

// Admin Pages
import Landing from "./pages/customer/Landing";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Customer from "./pages/admin/Customer";
import Transaction from "./pages/admin/Transaction";

// Admin Management Pages
import NewProduct from "./pages/admin/management/NewProduct";
import ProductManagement from "./pages/admin/management/ProductManagement";
import TransactionManagement from "./pages/admin/management/TransactionManagement";

// Chart Components
import BarCharts from "./pages/admin/charts/BarCharts";
import LineCharts from "./pages/admin/charts/LineCharts";
import PieCharts from "./pages/admin/charts/PieCharts";

// App Features
import Stopwatch from "./pages/admin/apps/Stopwatch";
import CouponGenerator from "./pages/admin/apps/CouponGenerator";
import Toss from "./pages/admin/apps/Toss";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

// Checkout Pages
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";

// Status
import Forbidden403 from "./pages/default/403";

const customerRoutes = [
    {path: "/", element: <Home/>},
    {path: "/products", element: <AllProducts/>},
    {path: "/categories", element: <AllCategories/>},
    {path: "/products/:productID", element: <SingleProduct/>},
    {path: "/categories/:slug", element: <SingleCategory/>},
    {path: "/checkout", element: <Checkout/>},
    {path: "/checkout-success", element: <CheckoutSuccess/>},
];

const protectedCustomerRoutes = [
    {path: "/wishlist", element: <Wishlist/>},
    {path: "/account", element: <Profile/>},
];

const adminRoutes = [
    {path: "/admin/dashboard", element: <Dashboard/>},
    {path: "/admin/products", element: <Products/>},
    {path: "/admin/customers", element: <Customer/>},
    {path: "/admin/transactions", element: <Transaction/>},
    {path: "/admin/*", element: <Dashboard/>},
];

const adminManagementRoutes = [
    {path: "/admin/products/new", element: <NewProduct/>},
    {path: "/admin/products/manage", element: <ProductManagement/>},
    {path: "/admin/transactions/manage", element: <TransactionManagement/>},
];

const chartRoutes = [
    {path: "/admin/charts/bar", element: <BarCharts/>},
    {path: "/admin/charts/line", element: <LineCharts/>},
    {path: "/admin/charts/pie", element: <PieCharts/>},
];

const appFeatureRoutes = [
    {path: "/admin/apps/stopwatch", element: <Stopwatch/>},
    {path: "/admin/apps/coupon", element: <CouponGenerator/>},
    {path: "/admin/apps/toss", element: <Toss/>},
];

const statusRoutes = [
    {path: "/403", element: <Forbidden403/>},
];

const MainLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen">
                {children}
            </main>
            <Footer/>
            <Cart/>
            <LoginModal/>
            <ScrollToTopButton/>
            <BannerPopup/>
            <Toaster position="bottom-center"/>
        </>
    );
};

function App() {
    return (
        <Provider store={store}>
            <MainLayout>
                <Routes>
                    {/* Customer Routes */}
                    {customerRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}

                    {statusRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}
                    {appFeatureRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}

                    {/* Protected Customer Routes */}
                    <Route element={<ProtectedRoute/>}>
                        {protectedCustomerRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<AdminProtectedRoute/>}>
                        {adminRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                        {adminManagementRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                        {chartRoutes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                    </Route>

                    {/* Landing Page */}
                    <Route path="/" element={<Landing/>}/>
                </Routes>
            </MainLayout>
        </Provider>
    );
}

export default App;
