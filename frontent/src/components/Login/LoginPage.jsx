import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import Button from "@mui/material/Button";
import LoginImage from "../../assets/Images/login.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer } from "react-toastify";
import Toastify from "../../Utils/Toastify/Toastify";
import { Link, useNavigate } from "react-router";
import { signInUser } from "../../Redux/features/user/userThunk1";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error, message } = useSelector(
    (state) => state.auth,
  );

  const [openPassword, setOpenPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return Toastify("warning", "Please fill all fields");
    }

    dispatch(signInUser(formData));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      Toastify("success", "Login Successful");

      navigate("/Home");
    }

    if (error) {
      Toastify("error", error);
    }

    if (message) {
      Toastify("success", message);
    }
  }, [user, error, message]);

  return (
    <div className="MainFirstBox">
      <ToastContainer />

      <div className="container">
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
          <div className="w-75 border MainBox">
            <div className="row">
              {/* LEFT SIDE */}
              <div className="col-md-6 text-center firstCol">
                <div className="textcontainer">
                  <img src={LoginImage} alt="" />

                  <h1 className="mt-5">Hello, Friend!</h1>

                  <p className="fs-6 mb-5">
                    Enter your personal details and start your journey with us
                  </p>

                  <Link to="/register">
                    <Button className="LogInButton">Sign Up</Button>
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-md-6 p-5 colSecond">
                <div className="text-center">
                  <h1 className="fs-3 fw-bold">
                    <u>Sign In</u>
                  </h1>
                </div>

                <div className="mt-2">
                  <label className={"fs-6"}>Email*</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-2">
                  <label className={"fs-6"}>Password*</label>

                  <div className="passwordField">
                    <input
                      type={openPassword ? "text" : "password"}
                      className="form-control passwordInput "
                      name="password"
                      placeholder="Enter password"
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

                <div className="text-center mt-5">
                  <Button
                    className="LogInButton SignButton"
                    onClick={handleSignIn}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
