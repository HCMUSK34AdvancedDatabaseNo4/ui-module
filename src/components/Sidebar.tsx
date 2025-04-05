import { Location, Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill,} from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch,} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
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
    <aside  style={{}}>
      <DivOne location={location} />
      <DivTwo location={location} />
      <DivThree location={location} />
    </aside>
  );
};

export default Sidebar;
