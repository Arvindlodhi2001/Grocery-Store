// src/Pages/RegisterPage/RegisterPage.jsx

import React, { useEffect, useState } from "react";
import "./RegisterPage.css";

import Button from "@mui/material/Button";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { signUpUser } from "../../Redux/features/user/userThunk1";

import Toastify from "../../Utils/Toastify/Toastify";

import LoginImage from "../../assets/Images/login.png";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, error, message } = useSelector(
    (state) => state.auth,
  );

  const [openPassword, setOpenPassword] = useState(false);

  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    securityCode: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // REGISTER
  const handleRegister = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      accountType,
      securityCode,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !securityCode
    ) {
      return Toastify("warning", "Please fill all fields");
    }

    if (password !== confirmPassword) {
      return Toastify("error", "Passwords do not match");
    }

    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (user) {
      Toastify("success", "Registration Successful");

      navigate("/");
    }

    if (error) {
      Toastify("error", error);
    }

    if (message) {
      Toastify("success", message);
    }
  }, [user, error, message, navigate]);

  return (
    <div className="MainFirstBox">
      <ToastContainer />

      <div className="container">
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
          <div className="w-75 border MainBox">
            <div className="row g-0">
              <div className="col-md-6 text-center firstCol">
                <div className="textcontainer">
                  <img src={LoginImage} alt="register" />

                  <h1 className="mt-5">Welcome Back!</h1>

                  <p className="fs-5 mb-5">
                    Already have an account? Login now.
                  </p>

                  <Link to="/">
                    <Button className="LogInButton">Sign In</Button>
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE */}

              <div className="col-md-6 p-5 colSecond">
                <div className="text-center">
                  <h1 className="fs-1 fw-bold">
                    <u>Create Account</u>
                  </h1>
                </div>

                {/* USERNAME */}

                <div className="mt-3">
                  <label>Username*</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* EMAIL */}

                <div className="mt-3">
                  <label>Email*</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* PASSWORD */}

                <div className="mt-3">
                  <label>Password*</label>

                  <div className="passwordBox">
                    <input
                      type={openPassword ? "text" : "password"}
                      className="form-control passwordInput"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <div
                      className="passwordIcon"
                      onClick={() => setOpenPassword(!openPassword)}
                    >
                      {openPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="mt-3">
                  <label>Confirm Password*</label>

                  <div className="passwordBox">
                    <input
                      type={openConfirmPassword ? "text" : "password"}
                      className="form-control passwordInput"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <div
                      className="passwordIcon"
                      onClick={() =>
                        setOpenConfirmPassword(!openConfirmPassword)
                      }
                    >
                      {openConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                  </div>
                </div>

                {/* SECURITY CODE */}

                <div className="mt-3">
                  <label>Security Code*</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter security code"
                    name="securityCode"
                    value={formData.securityCode}
                    onChange={handleChange}
                  />
                </div>

                {/* RADIO */}

                <div className="mt-3 d-flex justify-content-between radioBox">
                  <div>
                    <input
                      type="radio"
                      name="accountType"
                      value="customer"
                      checked={formData.accountType === "customer"}
                      onChange={handleChange}
                    />

                    <span className="ms-2">I am customer</span>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="accountType"
                      value="vendor"
                      checked={formData.accountType === "vendor"}
                      onChange={handleChange}
                    />

                    <span className="ms-2">I am vendor</span>
                  </div>
                </div>

                {/* BUTTON */}

                <div className="text-center mt-4">
                  <Button
                    className="LogInButton SignButton"
                    onClick={handleRegister}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Register"}
                  </Button>
                </div>

                <p className="TextAccountLine text-center">
                  Already have account ?
                  <Link to="/" className="AccountCreate ms-2">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
