// import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FiSettings, FiBell, FiSearch } from "react-icons/fi";
import AvatarImage from "../assets/images/Avatar.png";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <Navbar
      fluid
      rounded
      className="bg-inherit border-b-[1px] border-[#F0F0F4]"
    >
      <div className="flex items-center gap-10 md:gap-16">
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "50px", width: "160px" }}
          />
        </Navbar.Brand>
        <Navbar.Collapse className="md:flex hidden">
          <Navbar.Link
            href="/"
            active={isActive('/')}
          >
            Main Dashboard
          </Navbar.Link>

          <Navbar.Link
            href="/articles"
            active={isActive('/articles')}
          >
            Articles
          </Navbar.Link>

          <Navbar.Link
            href="/map"
            active={isActive('/map')}
          >
            Geographical View
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
      <div className="flex md:order-2 items-center md:gap-5 gap-3">
        <span className="cursor-pointer lg:inline-block hidden">
          <FiSearch />
        </span>
        <span className="cursor-pointer lg:inline-block hidden">
          <FiSettings />
        </span>
        <Dropdown
          arrowIcon={false}
          inline
          label={<FiBell />}
          className="md:inline-block hidden"
        >
          <Dropdown.Item>Notification 1</Dropdown.Item>
          <Dropdown.Item>Notification 2</Dropdown.Item>
          <Dropdown.Item>Notification 3</Dropdown.Item>
        </Dropdown>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={AvatarImage} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              admin@askaagency.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          {/* <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="md:hidden">
        <Navbar.Link href="#" active>
          Main Dashboard
        </Navbar.Link>
        <Navbar.Link href="#">Articles</Navbar.Link>
        <Navbar.Link href="#">Geographical View</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
