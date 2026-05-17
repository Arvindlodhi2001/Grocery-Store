import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Listing.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CottageIcon from "@mui/icons-material/Cottage";
import SideBar from "../SideBar/SideBar";
import { ProductCard } from "../Product/Product";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Toastify from "../../Utils/Toastify/Toastify";
Toastify;
const Listing = () => {
  const [Size, setSize] = useState(50);
  const [products, setProducts] = useState([]);
  const [QuickView, setQuickView] = useState(false);
  const [Config, setConfig] = useState(
    JSON.parse(localStorage.getItem("user")),
  );

  const FetchAllProduct = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/product/All`);
      console.log("Fetched Products:", response.data.data);
      setProducts(response.data.data); // Correcting the data structure
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    console.log("Config -->", Config);

    FetchAllProduct();
  }, []);

  const ShowProductSizeChange = (event) => {
    setSize(event.target.value);
  };

  const [ShowSize, setShowSize] = useState("24%");
  const HandelRowSizeChange = (event) => {
    setShowSize(event.target.value);
  };

  const [sortBy, setSortBy] = useState("featured");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceLowToHigh") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === "priceHighToLow") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortBy === "ratingLowToHigh") {
      return parseFloat(a.rating) - parseFloat(b.rating);
    } else if (sortBy === "ratingHighToLow") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else if (sortBy === "releaseOldToNewDate") {
      return new Date(a.issueDate) - new Date(b.issueDate);
    } else if (sortBy === "releaseNewToOldDate") {
      return new Date(b.issueDate) - new Date(a.issueDate);
    } else {
      return 0;
    }
  });

  const handleFilters = (filterData) => {
    const { price, color, condition } = filterData;
    const filteredProducts = products
      .filter((product) => {
        const productPrice = parseFloat(product.price);
        return productPrice >= price[0] && productPrice <= price[1];
      })
      .filter((product) => {
        return (
          color.length === 0 ||
          color.some((userColor) =>
            product.color?.some(
              (productColor) =>
                productColor.toLowerCase() === userColor.toLowerCase(),
            ),
          )
        );
      })
      .filter((product) => {
        return (
          condition.length === 0 ||
          condition.some(
            (userCondition) =>
              userCondition.toLowerCase() === product.condition.toLowerCase(),
          )
        );
      });

    setProducts(filteredProducts);
  };

  const QuickViewHandel = (value) => {
    setQuickView(value);
    console.log("My Value--", value);
  };

  return (
    <section className="listingPage">
      <ToastContainer />
      <div className="container-fluid">
        <div className="breadcrumb flex-column">
          <h1>Snack</h1>
          <ul className="list list-inline">
            <li className="list-inline-item mb-0">
              <Link to={""}>
                <CottageIcon className="mb-2" /> Home <ChevronRightIcon />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>
                Shop <ChevronRightIcon />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>Snack</Link>
            </li>
          </ul>
        </div>
        <div className="listingData">
          <div className="row">
            <div className="col-md-3 sidebarWrapper">
              <SideBar onFilterApply={handleFilters} />
            </div>
            <div className="col-md-9 rightContent">
              <header className="d-flex justify-content-between">
                <p>We found {sortedProducts.length} items for you!</p>
                <div className="d-flex">
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        style={{ height: "40px" }}
                        value={Size}
                        onChange={ShowProductSizeChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={10}>10 Items</MenuItem>
                        <MenuItem value={20}>20 Items</MenuItem>
                        <MenuItem value={25}>25 Items</MenuItem>
                        <MenuItem value={50}>50 Items</MenuItem>
                        <MenuItem value={75}>75 Items</MenuItem>
                        <MenuItem value={100}>100 Items</MenuItem>
                        <MenuItem value={"All"}>All Items</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        style={{ height: "40px" }}
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"priceLowToHigh"}>
                          Price: Low to High
                        </MenuItem>
                        <MenuItem value={"priceHighToLow"}>
                          Price: High to Low
                        </MenuItem>
                        <MenuItem value={"ratingLowToHigh"}>
                          Rating: Low to High
                        </MenuItem>
                        <MenuItem value={"ratingHighToLow"}>
                          Rating: High to Low
                        </MenuItem>
                        <MenuItem value={"releaseOldToNewDate"}>
                          Release: Old to New
                        </MenuItem>
                        <MenuItem value={"releaseNewToOldDate"}>
                          Release: New to Old
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        style={{ height: "40px" }}
                        value={ShowSize}
                        onChange={HandelRowSizeChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"40%"}>2 Items</MenuItem>
                        <MenuItem value={"30%"}>3 Items</MenuItem>
                        <MenuItem value={"24%"}>4 Items</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </header>
              <div className="ProductRow d-flex flex-wrap">
                {sortedProducts
                  .slice(0, Size || sortedProducts.length)
                  .map((product, index) => (
                    <div
                      className="item"
                      style={{ width: ShowSize }}
                      key={index}
                    >
                      <ProductCard
                        productId={product._id}
                        tag={product.tag}
                        title={product.title}
                        category={product.category}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        image={product.thumbnail}
                        rating={product.rating}
                        brand={product.brand}
                        QuickViewHandel={QuickViewHandel}
                        Config={Config}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
