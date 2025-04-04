import { Location, Link, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';
import { IconType } from "react-icons";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill,} from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch,} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";

const Sidebar = () => {
  const location = useLocation();

  const[showModal, setShowModal]=useState<boolean>(false);
  const[phoneActive, setPhoneActive]=useState<boolean>(window.innerWidth<1100);

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  
  interface LiProps {
    url: string;
    text: string;
    location: Location;
    Icon: IconType;
  }

  const Li = ({ url, text, location, Icon }: LiProps) => (
    <li
      style={{
        backgroundColor: location.pathname.includes(url)
          ? "rgba(0,115,255,0.1)"
          : "white",
      }}
    >
      <Link
        to={url}
        style={{
          color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
        }}
      >
        <Icon /> {text}
      </Link>
    </li>
  );

  const DivOne = ({ location }: { location: Location }) => (
    <div>
      <h5>Dashboard</h5>
      <ul>
        <Li
          url="/admin/dashboard"
          text="Dashboard"
          Icon={RiDashboardFill}
          location={location}
        />
        <Li
          url="/admin/products"
          text="Product"
          Icon={RiShoppingBag3Fill}
          location={location}
        />
        <Li
          url="/admin/customers"
          text="Customer"
          Icon={IoIosPeople}
          location={location}
        />
        <Li
          url="/admin/transactions"
          text="Transaction"
          Icon={AiFillFileText}
          location={location}
        />
      </ul>
    </div>
  );

  const DivTwo = ({ location }: { location: Location }) => (
    <div>
      <h5>Charts</h5>
      <ul>
        <Li
          url="/admin/charts/bar"
          text="Bar"
          Icon={FaChartBar}
          location={location}
        />
        <Li
          url="/admin/charts/pie"
          text="Pie"
          Icon={FaChartPie}
          location={location}
        />
        <Li
          url="/admin/charts/line"
          text="Line"
          Icon={FaChartLine}
          location={location}
        />
      </ul>
    </div>
  );

  const DivThree = ({ location }: { location: Location }) => (
    <div>
      <h5>Apps</h5>
      <ul>
        <Li
          url="/admin/apps/stopwatch"
          text="Stopwatch"
          Icon={FaStopwatch}
          location={location}
        />
        <Li
          url="/admin/apps/coupon"
          text="Coupon"
          Icon={RiCoupon3Fill}
          location={location}
        />
        <Li
          url="/admin/apps/toss"
          text="Toss"
          Icon={FaGamepad}
          location={location}
        />
      </ul>
    </div>
  );

  return (
 <>
 
 {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

    <aside  style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }>
      <DivOne location={location} />
      <DivTwo location={location} />
      <DivThree location={location} />
      {phoneActive && (
          <button id="close_sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
    </aside>
 </>
  );
};

export default Sidebar;
