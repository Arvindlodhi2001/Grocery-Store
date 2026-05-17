import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Toastify from "../../Utils/Toastify/Toastify";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const MyAccount = () => {
  const navigate = useNavigate();
  const [ButtonDisplay, setButtonDisplay] = useState("Dashboard");
  const [Products, setProducts] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [ProductsSortMessage, setProductsSortMessage] = useState("");
  const [TableSize, setTableSize] = useState(5);
  const [SearchTerm, setSearchTerm] = useState("");
  const [RemoveData, setRemoveData] = useState({
    userId: "67ba045d58563bf3091cfbd3",
    password: "",
  });

  useEffect(() => {
    console.log("Remove Data -->", RemoveData);
  }, [RemoveData]);

  const [AddressData, setAddressData] = useState({
    StreetNo: "",
    HouseNo: "",
    City: "",
    Tehsil: "",
    District: "",
    State: "",
    Mobile1: "",
    Mobile2: "",
  });

  const [locationData, setLocationData] = useState({});

  const MyCurrentAddress = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        Toastify("warning", "current location fetch in processing");
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );
        setLocationData(response.data.address);

        Toastify("success", "Current Location Found Successfully");
        return await setAddressData({
          StreetNo:
            ` ${locationData.suburb} ,  ${locationData.neighbourhood}` || "",
          HouseNo: locationData.suburb || "",
          City: locationData.city || "",
          Tehsil: locationData.city || "",
          District: locationData.state_district || "",
          State: locationData.state || "",
          Mobile1: "",
          Mobile2: "",
        });
      });
    } catch (error) {
      console.log("Error -->", error);
      Toastify("error", "Error in fetching current location");
    }
  };

  const [PersonalData, setPersonalData] = useState({
    FirstName: "",
    LastName: "",
    DisplayName: "",
    Mobile: "",
    EmailAddress: "",
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const DataProduct = async () => {
    try {
      const DataRequest = await axios.get(`${API_URL}/Products`);
      setProducts(DataRequest.data);
      setFilterData(DataRequest.data);
      console.log("Data Fetch Successfully...");
    } catch (error) {
      console.log("Error -- ", error);
    }
  };

  useEffect(() => {
    DataProduct();
  }, []);

  // Sort products based on ProductsSortMessage
  useEffect(() => {
    let sortedProducts = [...Products];

    if (ProductsSortMessage === "Filter By Price - Low - High") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Ascending
    } else if (ProductsSortMessage === "Filter By Price - High - Low") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); // Descending
    } else if (ProductsSortMessage === "Filter By Date - New - Old") {
      sortedProducts.sort(
        (a, b) => new Date(a.issueDate) - new Date(b.issueDate),
      );
    } else if (ProductsSortMessage === "Filter By Date - Old - New") {
      sortedProducts.sort(
        (a, b) => new Date(b.issueDate) - new Date(a.issueDate),
      );
    }
    // Filter based on the status
    if (ProductsSortMessage === "Filter By Status - Shipped") {
      sortedProducts = sortedProducts.filter(
        (product) => product.status === "Shipped",
      );
    } else if (ProductsSortMessage === "Filter By Status - Processing") {
      sortedProducts = sortedProducts.filter(
        (product) => product.status === "Processing",
      );
    } else if (ProductsSortMessage === "Filter By Status - Delivered") {
      sortedProducts = sortedProducts.filter(
        (product) => product.status === "Delivered",
      );
    }
    // Search Bar Handel Start
    if (setSearchTerm) {
      sortedProducts = sortedProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          product.TypeOf.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          product.tag.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          product.ShortDescribe.toLowerCase().includes(
            SearchTerm.toLowerCase(),
          ) ||
          product.id.toLowerCase().includes(SearchTerm.toLowerCase())
        );
      });
    }
    setFilterData(sortedProducts);
  }, [ProductsSortMessage, Products, SearchTerm]);

  // Address Handel

  const AddressHandel = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...AddressData, [name]: value });
    // console.log("Name -- ", name, "Value -- ", value);
    console.log("AddressData -- ", AddressData);
  };

  // Personal Details Handel

  const PersonalDataHandel = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...PersonalData, [name]: value });
    // console.log("Name -- ", name, "Value -- ", value);
    console.log("AddressData -- ", PersonalData);
  };

  // Remove Account
  const handleRemoveAccount = async () => {
    if (!RemoveData.password || RemoveData.id) {
      alert("Please enter your password to proceed.");
      return;
    }
    const confirm = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (confirm) {
      try {
        const response = await axios.delete(`${API_URL}/account/remove`, {
          data: RemoveData,
          headers: {
            "Content-Type": "application/json", // ✅ Ensure correct headers
          },
          withCredentials: true, // ✅ If using authentication (cookies)
        });

        console.log("user removed successfully --> ", response);
        alert("Account removed successfully");
        setRemoveData({ ...RemoveData, password: "" });
      } catch (error) {
        console.log("Error in user removed ", error);
      }
    }

    // Perform remove account logic here
    console.log("Account removal initiated with password:");
    alert("Your account is being removed...");
  };

  const AccountLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    await Toastify("success", "User Logout Successful");
    navigate("/login");
  };

  return (
    <div className="container-fluid MainContainer">
      <ToastContainer />
      <div className="row">
        <div className="col-md-3">
          <ul>
            <li
              onClick={() => setButtonDisplay("Dashboard")}
              className={`${ButtonDisplay === "Dashboard" && "UlLiChange"}`}
            >
              <DashboardIcon /> &nbsp; Dashboard
            </li>
            <li
              className={`${ButtonDisplay === "Orders" && "UlLiChange"}`}
              onClick={() => setButtonDisplay("Orders")}
            >
              <LocalMallIcon /> &nbsp; Orders
            </li>
            <li
              className={`${
                ButtonDisplay === "Track Your Order" && "UlLiChange"
              }`}
              onClick={() => setButtonDisplay("Track Your Order")}
            >
              {" "}
              <ShoppingCartIcon /> &nbsp; Track Your Order
            </li>
            <li
              className={`${ButtonDisplay === "My Address" && "UlLiChange"}`}
              onClick={() => setButtonDisplay("My Address")}
            >
              {" "}
              <LocationOnIcon /> &nbsp; My Address
            </li>
            <li
              className={`${
                ButtonDisplay === "My Account Details" && "UlLiChange"
              }`}
              onClick={() => setButtonDisplay("My Account Details")}
            >
              {" "}
              <PersonIcon /> &nbsp; My Account Details
            </li>
            <li
              className={`${ButtonDisplay === "Logout" && "UlLiChange"}`}
              onClick={AccountLogout}
            >
              {" "}
              <LogoutIcon />
              &nbsp; Logout
            </li>
            <li
              className={`${
                ButtonDisplay === "Remove Account" && "UlLiChange"
              }`}
              onClick={() => setButtonDisplay("Remove Account")}
            >
              {" "}
              <LogoutIcon />
              &nbsp; Remove Account
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          {ButtonDisplay === "Dashboard" && (
            <div>
              <h1>Hello Rosie!</h1>
              <p>
                From your account dashboard. you can easily check & view your
                recent orders, manage your shipping and billing addresses and
                edit your password and account details.
              </p>
            </div>
          )}

          {ButtonDisplay === "Orders" && (
            <div>
              <div className="OrderTableHeader">
                <h4>Orders Table</h4>
                <div className="d-flex">
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="me-3"
                    type="text"
                    placeholder="Search Product..."
                    name=""
                    id=""
                  />

                  <select
                    name=""
                    id=""
                    className="me-3"
                    onChange={(e) => setProductsSortMessage(e.target.value)}
                  >
                    <option value="Price Filter">Product Filter</option>
                    <option value="Filter By Price - Low - High">
                      Filter By Price - Low - High
                    </option>
                    <option value="Filter By Price - High - Low">
                      Filter By Price - High - Low
                    </option>
                    <option value="Filter By Date - New - Old">
                      Filter By Date - New - Old
                    </option>
                    <option value="Filter By Date - Old - New">
                      Filter By Date - Old - New
                    </option>
                    <option value="Filter By Status - Shipped">
                      Filter By Status - Shipped
                    </option>
                    <option value="Filter By Status - Processing">
                      Filter By Status - Processing
                    </option>
                    <option value="Filter By Status - Delivered">
                      Filter By Status - Delivered
                    </option>
                  </select>
                  <select
                    name=""
                    id=""
                    onClick={(e) => setTableSize(e.target.value)}
                  >
                    <option value="5">Row Show</option>
                    <option value="5">Row 5</option>
                    <option value="10">Row 10</option>
                    <option value="15">Row 15</option>
                    <option value="20">Row 20</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table className="table table-striped table-lg text-center table-bordered">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Product Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FilterData &&
                      FilterData.slice(0, TableSize).map((product, index) => (
                        <tr key={index}>
                          <td>{`#${product.id}`}</td>
                          <td>{product.title}</td>
                          <td>
                            {new Date(product.issueDate).toLocaleDateString()}
                          </td>
                          <td>{product.status || "Processing"}</td>
                          <td>{`$${product.price}`}</td>
                          <td>View</td>
                          <td>Delete</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div>
                  <p>Total {FilterData.length} Items Search</p>
                </div>
              </div>
            </div>
          )}

          {ButtonDisplay === "My Address" && (
            <div>
              <h4>Address</h4>
              <div className="table-responsive mt-2">
                <table className="table table-striped table-lg text-center table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Street No</th>
                      <th>House No</th>
                      <th>City</th>
                      <th>Tehsil</th>
                      <th>District</th>
                      <th>State</th>
                      <th>Mobile 1</th>
                      <th>Mobile 2</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>12</td>
                      <td>221</td>
                      <td>Cityville</td>
                      <td>West Tehsil</td>
                      <td>District A</td>
                      <td>State X</td>
                      <td>+1234567890</td>
                      <td>+0987654321</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>34</td>
                      <td>112</td>
                      <td>Townsville</td>
                      <td>East Tehsil</td>
                      <td>District B</td>
                      <td>State Y</td>
                      <td>+1122334455</td>
                      <td>+5566778899</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>56</td>
                      <td>305</td>
                      <td>Villagetown</td>
                      <td>South Tehsil</td>
                      <td>District C</td>
                      <td>State Z</td>
                      <td>+2233445566</td>
                      <td>+6655443322</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Address Form */}
              <div className="mt-3">
                <div className="">
                  <h4>
                    <u>Address Form</u>
                  </h4>
                </div>
                <div className=" d-flex justify-content-center">
                  <div className="row w-100 border p-3">
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">Street No</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street No"
                          onChange={AddressHandel}
                          name="StreetNo"
                          id=""
                          value={AddressData.StreetNo}
                        />
                      </div>{" "}
                    </div>

                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">House No</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="House No..."
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="HouseNo"
                          id=""
                          value={AddressData.HouseNo}
                        />
                      </div>{" "}
                    </div>
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">City</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="City..."
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="City"
                          id=""
                          value={AddressData.City}
                        />
                      </div>{" "}
                    </div>
                    {/* Tehsil */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">Tehsil</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Tehsil"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="Tehsil"
                          id=""
                          value={AddressData.Tehsil}
                        />
                      </div>{" "}
                    </div>
                    {/* District */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">District</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="District"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="District"
                          id=""
                          value={AddressData.District}
                        />
                      </div>{" "}
                    </div>
                    {/* State */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">State</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="State"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="State"
                          id=""
                          value={AddressData.State}
                        />
                      </div>{" "}
                    </div>
                    {/* Mobile 1 */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">Mobile 1</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Mobile 1"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="Mobile1"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Mobile 2 */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">Mobile 2</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Mobile 2"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="Mobile2"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    <div className="mt-4 d-flex justify-content-between ">
                      <button className="btn btn-success">Submit</button>
                      <button
                        className="btn btn-success"
                        onClick={MyCurrentAddress}
                      >
                        Auto Fill current Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {ButtonDisplay === "My Account Details" && (
            <div>
              <div className="">
                <div className="">
                  <h2>
                    <u>Personal Detail</u>
                  </h2>
                </div>
                <div className=" d-flex justify-content-center">
                  <div className="row w-100 border p-3">
                    {/* First Name */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">First Name*</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          onChange={PersonalDataHandel}
                          name="FirstName"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Last Name */}
                    <div className="col-md-6 mt-3">
                      <label htmlFor="html">Last Name*</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Last Name"
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="LastName"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Display Name */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">Display Name *</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Display Name..."
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="DisplayName"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Mobile */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">Mobile 2</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="+91-9827805086"
                          className={"form-control"}
                          onChange={AddressHandel}
                          name="Mobile2"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Tehsil */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">Email Address *</label>
                      <div>
                        {" "}
                        <input
                          type="text"
                          placeholder="Email Address..."
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="EmailAddress"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Current Password */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">Current Password*</label>
                      <div>
                        {" "}
                        <input
                          type="password"
                          placeholder="Current Password..."
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="CurrentPassword"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* New Password */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">New Password *</label>
                      <div>
                        {" "}
                        <input
                          type="password"
                          placeholder="New Password..."
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="NewPassword"
                          id=""
                        />
                      </div>{" "}
                    </div>
                    {/* Mobile 1 */}
                    <div className="col-md-12 mt-3">
                      <label htmlFor="html">Confirm Password *</label>
                      <div>
                        {" "}
                        <input
                          type="password"
                          placeholder="Confirm Password..."
                          className={"form-control"}
                          onChange={PersonalDataHandel}
                          name="ConfirmPassword"
                          id=""
                        />
                      </div>{" "}
                    </div>

                    <div className="mt-4 ">
                      <button className="btn btn-success">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {ButtonDisplay === "Track Your Order" && (
            <div>
              <div className="mt-0">
                <div className="">
                  <h2>
                    <u>Track Your Order</u>
                  </h2>
                </div>
              </div>
              <div className="mt-3 border container-fluid">
                <div className="row mt-2 mb-3 ms-2 ">
                  <div className="col-md-5">
                    <label htmlFor="html">Order ID</label>
                    <div>
                      {" "}
                      <input
                        type="text"
                        placeholder="Found in your order conformation email"
                        className={"form-control"}
                        onChange={PersonalDataHandel}
                        name="ConfirmPassword"
                        id=""
                      />
                    </div>{" "}
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="html">Billing email</label>
                    <div>
                      {" "}
                      <input
                        type="email"
                        placeholder="Email you used during checkout"
                        className={"form-control"}
                        onChange={PersonalDataHandel}
                        name="ConfirmPassword"
                        id=""
                      />
                    </div>{" "}
                  </div>
                  <div className="col-md-2 text-center">
                    <div className="mt-4 ">
                      <Button className=" FoundButton text-bg">Search</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="">
                  <h3>
                    <u>Order Detail</u>
                  </h3>
                </div>
              </div>
            </div>
          )}
          {ButtonDisplay === "Remove Account" && (
            <div className="container d-flex justify-content-center align-items-center ">
              <div className="card p-4 shadow-lg" style={{ width: "550px" }}>
                <h3 className="text-center mb-3">Remove Account</h3>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setRemoveData({ ...RemoveData, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="btn btn-danger w-100"
                  onClick={handleRemoveAccount}
                >
                  Remove Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
