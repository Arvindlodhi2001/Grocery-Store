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

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import "./Login.css";
// import Button from "@mui/material/Button";
// import LoginImage from "../../assets/Images/login.png";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { ToastContainer } from "react-toastify";
// import Toastify from "../../Utils/Toastify/Toastify";
// import { useNavigate } from "react-router";
// import { signInUser, signUpUser } from "../../Redux/features/user/userThunk1";

// const API_URL = "http://localhost:5000/api/v1/users";

// const LoginPage = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [openPassword, setOpenPassword] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const {
//     isLoading,
//     user,
//     error: reduxError,
//     message: reduxMessage,
//   } = useSelector((state) => state.auth);

//   useEffect(() => {
//     console.log("user---->", user);
//   }, [user]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const dispatch = useDispatch();

//   const handleSignIn = async () => {
//     if (!formData.email || !formData.password) {
//       await Toastify("warning", "Please fill in all fields");
//       return setError("Please fill in all fields.");
//     }

//     dispatch(
//       signInUser({ email: formData.email, password: formData.password })
//     );
//   };

//   const handleSignUp = async () => {
//     if (formData.password !== formData.confirmPassword) {
//       await Toastify("error", "Passwords do not match");
//       return setError("Passwords do not match");
//     }

//     if (
//       [
//         formData.name,
//         formData.email,
//         formData.password,
//         formData.confirmPassword,
//         formData.accountType,
//         formData.securityCode,
//       ].some((field) => !field || field.trim() === "")
//     ) {
//       await Toastify("warning", "Please fill in all fields");
//       return setError("Please fill in all fields.");
//     }

//     dispatch(signUpUser(formData));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/Home");
//     }
//     if (reduxError) {
//       Toastify("error", reduxError);
//     }
//     if (reduxMessage) {
//       Toastify("success", reduxMessage);
//     }
//   }, [user, reduxError, reduxMessage]);

//   useEffect(() => {
//     if (reduxMessage) {
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         accountType: "",
//         securityCode: "",
//       });
//     }
//   }, [reduxMessage]);

//   // // Sign Up Functionality
//   // const handleSignUp = async () => {
//   //   if (formData.password !== formData.confirmPassword) {
//   //     await Toastify("error", "Do not match Password and conform Password");
//   //     return setError("Do not match Password and conform Password");
//   //   }

//   //   if (
//   //     [
//   //       formData.name,
//   //       formData.email,
//   //       formData.password,
//   //       formData.confirmPassword,
//   //     ].some((field) => !field || field == " ")
//   //   ) {
//   //     setError("Please fill in all fields.");
//   //     return await Toastify("warning", "Please fill in all fields");
//   //   }

//   //   try {
//   //     const response = await axios.post(`${API_URL}/signUp`, formData);
//   //     setMessage(response.data.message);
//   //     console.log("response.data.message", response.data);
//   //     await Toastify("success", "User Registration Successful");
//   //     setMessage("User Registration Successful");
//   //     navigate("/");
//   //   } catch (error) {
//   //     setError(error.response?.data?.message || "Sign-up failed.");
//   //     await Toastify("error", "User Registration Failed");
//   //     setMessage("User Registration Failed");
//   //   }
//   // };

//   // // Sign In Functionality
//   // const handleSignIn = async () => {
//   //   if (
//   //     [formData.email, formData.password].some(
//   //       (field) => !field || field == " "
//   //     )
//   //   ) {
//   //     await Toastify("warning", "Please fill in all fields");
//   //     return setError("Please fill in all fields.");
//   //   }
//   //   try {
//   //     const response = await axios.post(`${API_URL}/signIn`, {
//   //       email: formData.email,
//   //       password: formData.password,
//   //     });
//   //     const { _id, username, email, token } = response.data.data;
//   //     await localStorage.setItem("user", JSON.stringify(response.data.data));
//   //     // console.log("User Config --- ", localStorage.getItem("user"));
//   //     await localStorage.setItem("userId", _id);
//   //     await localStorage.setItem("username", username);
//   //     await localStorage.setItem("email", email);
//   //     await localStorage.setItem("token", token);

//   //     navigate("/Home");
//   //     await Toastify("success", "Operation Successful!");
//   //     return setMessage("Login successful!");
//   //   } catch (error) {
//   //     setError(error.response?.data?.message || "Sign-in failed.");
//   //     await Toastify("error", "InCorrect UserID and Password");
//   //   }
//   // };

//   return (
//     <div className="MainFirstBox">
//       <ToastContainer />
//       <div className="container">
//         <div className="container-fluid d-flex justify-content-center">
//           <div className="w-75 border MainBox mt-5 mb-5">
//             <div className="row">
//               <div className="col-md-6 text-center firstCol">
//                 <div className="textcontainer">
//                   <img src={LoginImage} alt="Login Illustration" />
//                   <h1 className="mt-5">
//                     {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
//                   </h1>
//                   <p className="fs-5 mb-5">
//                     {isSignUp
//                       ? "Already have an account? Sign in."
//                       : "Create an account to get started."}
//                   </p>
//                   <Button
//                     className="LogInButton"
//                     onClick={() => setIsSignUp(!isSignUp)}
//                   >
//                     {isSignUp ? "Sign In" : "Sign Up"}
//                   </Button>
//                 </div>
//               </div>

//               <div className="col-md-6 p-5 colSecond">
//                 <div className="text-center">
//                   <h1 className="fs-1 fw-5">
//                     <u className="fw-bold">
//                       {isSignUp ? "Sign In" : "Create Account"}
//                     </u>
//                   </h1>
//                 </div>

//                 {error && <p className="text-danger">{error}</p>}
//                 {message && <p className="text-success">{message}</p>}

//                 {isSignUp ? (
//                   // Sign In Form
//                   <div>
//                     <div className="mt-3">
//                       <label>Email*</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         placeholder="Enter email"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mt-4">
//                       <label>Password</label>
//                       <div className="d-flex">
//                         <input
//                           type={openPassword ? "text" : "password"}
//                           className="form-control"
//                           name="password"
//                           placeholder="Enter password"
//                           onChange={handleChange}
//                         />
//                         <div
//                           className="mt-1"
//                           onClick={() => setOpenPassword(!openPassword)}
//                         >
//                           {openPassword ? (
//                             <VisibilityIcon />
//                           ) : (
//                             <VisibilityOffIcon />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center mt-5">
//                       <Button
//                         className="LogInButton SignButton"
//                         onClick={handleSignIn}
//                       >
//                         Sign In
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   // Sign Up Form
//                   <div>
//                     <div className="mt-2">
//                       <label>Username*</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="name"
//                         placeholder="Enter username"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mt-2">
//                       <label>Email *</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         placeholder="Enter email"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mt-2">
//                       <label>Password *</label>
//                       <div className="d-flex">
//                         <input
//                           type={openPassword ? "text" : "password"}
//                           className="form-control"
//                           name="password"
//                           placeholder="Create password"
//                           onChange={handleChange}
//                         />
//                         <div
//                           className="mt-1"
//                           onClick={() => setOpenPassword(!openPassword)}
//                         >
//                           {openPassword ? (
//                             <VisibilityIcon />
//                           ) : (
//                             <VisibilityOffIcon />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <label>Confirm Password *</label>
//                       <div className="d-flex">
//                         <input
//                           type={confirmPasswordVisible ? "text" : "password"}
//                           className="form-control"
//                           name="confirmPassword"
//                           placeholder="Confirm password"
//                           onChange={handleChange}
//                         />
//                         <div
//                           className="mt-1"
//                           onClick={() =>
//                             setConfirmPasswordVisible(!confirmPasswordVisible)
//                           }
//                         >
//                           {confirmPasswordVisible ? (
//                             <VisibilityIcon />
//                           ) : (
//                             <VisibilityOffIcon />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <label>Security Code *</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="securityCode"
//                         placeholder="Enter security code"
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mt-3 d-flex justify-content-between">
//                       <div>
//                         <input
//                           type="radio"
//                           name="accountType"
//                           value="customer"
//                           checked={formData.accountType === "customer"}
//                           onChange={handleChange}
//                         />
//                         <span> I am a customer</span>
//                       </div>
//                       <div>
//                         <input
//                           type="radio"
//                           name="accountType"
//                           value="vendor"
//                           checked={formData.accountType === "vendor"}
//                           onChange={handleChange}
//                         />
//                         <span> I am a vendor</span>
//                       </div>
//                     </div>
//                     {/* <div className="d-flex justify-content-between">
//                       <div>
//                         <input type="checkbox" />
//                         <span> I agree to terms & Policy.</span>
//                       </div>
//                       <div>
//                         <span>Learn more</span>
//                       </div>
//                     </div> */}
//                     <div className="text-center mt-3">
//                       <Button
//                         className="LogInButton SignButton"
//                         onClick={handleSignUp}
//                       >
//                         Submit & Register
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
