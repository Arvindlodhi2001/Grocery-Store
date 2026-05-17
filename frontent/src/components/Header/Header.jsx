import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import Logo from "../../assets/Images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Select from "../SelectDropDown/Select";
import axios from "axios";
import Compare from "../../assets/Images/icon-compare.svg";
import Wishlist from "../../assets/Images/icon-heart.svg";
import User from "../../assets/Images/icon-user.svg";
import Cart from "../../assets/Images/icon-cart.svg";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Nav from "./nav/Nav";
import { useNavigate } from "react-router";
import { logoutUser } from "../../Redux/features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [searchIconStyle, setSearchIconStyle] = useState("searchIcon");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const SearchBarHandel = (e) => {
    if (e.target.value.length > 0) {
      setSearchIconStyle("searchIconAfter");
    } else {
      setSearchIconStyle("searchIcon");
    }
  };

  const [categories, setCategories] = useState([
    {
      name: "Mobiles",
      img: "path/to/mobiles-image.jpg",
      link: "/category/mobiles",
    },
    {
      name: "Electronics",
      img: "path/to/electronics-image.jpg",
      link: "/category/electronics",
    },
    {
      name: "TVs & Appliances",
      img: "path/to/tvs-appliances-image.jpg",
      link: "/category/tvs-appliances",
    },
    {
      name: "Fashion",
      img: "path/to/fashion-image.jpg",
      link: "/category/fashion",
    },
    {
      name: "Beauty, Toys & More",
      img: "path/to/beauty-toys-image.jpg",
      link: "/category/beauty-toys",
    },
    {
      name: "Home & Furniture",
      img: "path/to/home-furniture-image.jpg",
      link: "/category/home-furniture",
    },
    {
      name: "Sports, Books & More",
      img: "path/to/sports-books-image.jpg",
      link: "/category/sports-books",
    },
    {
      name: "Grocery",
      img: "path/to/grocery-image.jpg",
      link: "/category/grocery",
    },
    {
      name: "Travel",
      img: "path/to/travel-image.jpg",
      link: "/category/travel",
    },
    {
      name: "Top Offers",
      img: "path/to/top-offers-image.jpg",
      link: "/category/top-offers",
    },
    {
      name: "Two Wheelers",
      img: "path/to/two-wheelers-image.jpg",
      link: "/category/two-wheelers",
    },
    {
      name: "Insurance",
      img: "path/to/insurance-image.jpg",
      link: "/category/insurance",
    },
    {
      name: "Flights",
      img: "path/to/flights-image.jpg",
      link: "/category/flights",
    },
    {
      name: "Gift Cards",
      img: "path/to/gift-cards-image.jpg",
      link: "/category/gift-cards",
    },
    {
      name: "Flipkart Plus",
      img: "path/to/flipkart-plus-image.jpg",
      link: "/category/flipkart-plus",
    },
  ]);

  const [CountryList, setCountryList] = useState([]); // Initialize as an array
  const [IsLoading, setIsLoading] = useState(false);
  const countryListData = [];

  const CountryListHandel = async (URI) => {
    if (URI) {
      try {
        setIsLoading(true);
        const response = await axios.get(URI);
        const data = response?.data?.data;
        if (data) {
          data?.map((item) => {
            countryListData.push(item.country);
          });
          console.log("Data Fetch successful from the API");
        } else {
          console.log("Data is empty");
        }
      } catch (error) {
        console.log("Error in Axios:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("URI is not present");
    }
  };

  useEffect(() => {
    CountryListHandel("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  return (
    <div>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <img src={Logo} alt="Brand Logo" />
            </div>

            <div className="col-sm-5 d-flex align-items-center">
              <div className="HeaderSearch d-flex align-items-center">
                <Select
                  data={categories}
                  placeholder={"All Category"}
                  icon={false}
                />

                <div className="search">
                  <input
                    type="text"
                    placeholder="Search for item..."
                    onChange={(e) => SearchBarHandel(e)}
                  />
                  <SearchIcon className={searchIconStyle} />
                  <KeyboardVoiceIcon className="VoiceIcon" />
                </div>
              </div>
            </div>

            <div className="col-sm-5 d-flex align-items-center justify-content-between">
              <div className="countryWrapper">
                <Select
                  data={countryListData}
                  placeholder={"Your Location"}
                  icon={<LocationOnIcon style={{ opacity: "0.9" }} />}
                />
              </div>
              <ul className="list list-inline mb-0 headerTabs">
                <li className="list-inline-item text-center">
                  <span className="position-relative">
                    <img src={Compare} alt="Compare Icon" />
                    <span className="bage">3</span>
                    <div>
                      <span className="listTag  ">Compare</span>
                    </div>
                  </span>
                </li>
                <li
                  className="list-inline-item text-center"
                  onClick={() => navigate("/Wishlist")}
                >
                  <span className="position-relative">
                    <img src={Wishlist} alt="Wishlist Icon" />
                    <span className="bage">15</span>
                    <div>
                      <span>Wishlist</span>
                    </div>
                  </span>
                </li>
                <li
                  className="list-inline-item text-center"
                  onClick={() => navigate("/cart")}
                >
                  <span className="position-relative">
                    <img src={Cart} alt="Cart Icon" />
                    <span className="bage">3</span>
                    <div>
                      <span>Cart</span>
                    </div>
                  </span>
                </li>
                <li
                  className="list-inline-item text-center  "
                  onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                >
                  <span className="position-relative">
                    <img src={User} alt="User Icon" />
                    <div>
                      <span>Account</span>
                    </div>
                  </span>

                  {isOpenDropDown && (
                    <ClickAwayListener
                      onClickAway={() => setIsOpenDropDown(false)}
                    >
                      <ul className="dropDownMenu">
                        <li className="UserDropDownList">
                          <Button>
                            {" "}
                            <PersonIcon /> &nbsp;{" "}
                            <Link to={"/MyAccount"}>My Account</Link>
                          </Button>
                        </li>
                        <li className="UserDropDownList">
                          <Button>
                            {" "}
                            <LocationOnIcon /> &nbsp; Over Tracking
                          </Button>
                        </li>

                        <li className="UserDropDownList">
                          <Button>
                            {" "}
                            <FavoriteIcon /> &nbsp; My Wishlist
                          </Button>
                        </li>
                        <li className="UserDropDownList">
                          <Button>
                            {" "}
                            <SettingsIcon /> &nbsp; Setting
                          </Button>
                        </li>
                        <li className="UserDropDownList" onClick={handleLogout}>
                          <Button>
                            {" "}
                            <LogoutIcon /> &nbsp; Sign Out
                          </Button>
                        </li>
                      </ul>
                    </ClickAwayListener>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
