import { FC, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector((state) => state.cartReducer.cartItems.length);
  const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const { requireAuth } = useAuth();

  const [search, setSearch] = useState("");

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  const handleSearch = () => {
    const query = search.trim();
    if (query !== "") {
      navigate(`/products?KeyWord=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
      <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-4xl font-bold dark:text-white">Shopify</Link>

            {/* Search bar */}
            <div className="lg:flex hidden w-full max-w-[500px]">
              <input
                  type="text"
                  placeholder="Search for a product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800 rounded-l-lg"
              />
              <div
                  className="bg-blue-500 text-white text-[26px] grid place-items-center px-4 cursor-pointer rounded-r-lg"
                  onClick={handleSearch}
              >
                <BsSearch />
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex gap-4 md:gap-8 items-center dark:text-white">
              <Link to="/products" className="text-xl font-bold">Products</Link>
              <Link to="/categories" className="text-xl font-bold">Categories</Link>

              <div className="flex items-center gap-2">
                {username !== "" ? (
                    <img
                        src="https://robohash.org/Terry.png?set=set4"
                        alt="avatar"
                        className="w-6"
                    />
                ) : (
                    <FaUser className="text-gray-500 text-2xl dark:text-white" />
                )}
                <div className="text-gray-500 text-2xl">
                  {username !== "" ? (
                      <CustomPopup />
                  ) : (
                      <span
                          className="cursor-pointer hover:opacity-85 dark:text-white"
                          onClick={() => dispatch(updateModal(true))}
                      >
                    Login
                  </span>
                  )}
                </div>
              </div>

              <div
                  className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
                  onClick={showCart}
              >
                <AiOutlineShoppingCart className="dark:text-white" />
                <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                  {cartCount}
                </div>
              </div>

              <div
                  onClick={() => {
                    dispatch(updateDarkMode(!isDarkMode));
                    document.body.classList.toggle("dark");
                  }}
              >
                {isDarkMode ? (
                    <MdOutlineLightMode className="cursor-pointer" size={30} />
                ) : (
                    <MdOutlineDarkMode className="cursor-pointer" size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
