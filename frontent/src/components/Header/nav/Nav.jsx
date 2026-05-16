import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          {/* Categories Tab - Hidden on Mobile */}
          <div className="col-lg-3 col-md-4 part1 d-none d-md-flex justify-content-center">
            <Button className="bg-success text-white catTab">
              <GridViewIcon /> &nbsp; Browse All Categories &nbsp;
              <KeyboardArrowRightIcon />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className={`col-lg-7 col-md-6 part2 ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <nav>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Link to={"/Home"} className="Link" onClick={closeMobileMenu}>
                    <Button>
                      Home &nbsp; <KeyboardArrowRightIcon />{" "}
                    </Button>{" "}
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to={"/About"} className="Link" onClick={closeMobileMenu}>
                    <Button>
                      About <KeyboardArrowRightIcon />{" "}
                    </Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to={"/Listing"} className="Link" onClick={closeMobileMenu}>
                    <Button>
                      Deals &nbsp; <KeyboardArrowRightIcon />{" "}
                    </Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Button>
                    Vendors &nbsp; <KeyboardArrowRightIcon />
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    Mega menu &nbsp; <KeyboardArrowRightIcon />
                  </Button>
                  <div className="">
                    <div className="MegaMenu">
                      <div className="row">
                        <div className="col-sm-3">
                          <h4 className="">Fruit & Vegetables</h4>
                          <ul>
                            <li>Meat & Poultry</li>
                            <li>Fresh Vegetables</li>
                            <li>Herbs & Seasonings</li>
                            <li>Cuts & Sprouts</li>
                            <li>Exotic Fruits & Veggies</li>
                            <li>Packaged Produce</li>
                          </ul>
                        </div>
                        <div className="col-sm-3">
                          <h4 className="">Breakfast & Dairy</h4>
                          <ul>
                            <li>Milk & Flavoured Milk</li>
                            <li>Butter and Margarine</li>
                            <li>Eggs Substitutes</li>
                            <li>Marmalades</li>
                            <li>Sour Cream</li>
                            <li>Cheese</li>
                          </ul>
                        </div>
                        <div className="col-sm-3">
                          <h4 className="">Meat & Seafood</h4>
                          <ul>
                            <li>Breakfast Sausage</li>
                            <li>Dinner Sausage</li>
                            <li>Chicken</li>
                            <li>Sliced Dell Meat</li>
                            <li>Wild Caught Fillets</li>
                            <li>Carb and Shellfish</li>
                          </ul>
                        </div>
                        <div className="col-sm-3 bannerImage">
                          <img
                            src="https://images.pexels.com/photos/235294/pexels-photo-235294.jpeg?cs=srgb&dl=pexels-wdnet-235294.jpg&fm=jpg"
                            alt="fruits Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button>
                    Blog &nbsp; <KeyboardArrowRightIcon />
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    Pages &nbsp; <KeyboardArrowRightIcon />
                  </Button>

                  <div className="dropdownMenu">
                    <ul className="list list-inline mb-0">
                      <li className="list-inline-item">
                        <Link to="/Home" className="Link" onClick={closeMobileMenu}>
                          <Button>Home</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link className="Link" to="/About" onClick={closeMobileMenu}>
                          <Button>About Us</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/Contact" className="Link" onClick={closeMobileMenu}>
                          <Button>Contact</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/Listing" className="Link" onClick={closeMobileMenu}>
                          <Button>Listing</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/MyAccount" className="Link" onClick={closeMobileMenu}>
                          <Button>My Account</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/Login" className="Link" onClick={closeMobileMenu}>
                          <Button>Login</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/Register" className="Link" onClick={closeMobileMenu}>
                          <Button>Register</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/ForgetPassword" className="Link" onClick={closeMobileMenu}>
                          <Button>Forget Password</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/ResetPassword" className="Link" onClick={closeMobileMenu}>
                          <Button>Reset Password</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/PurchaseGuide" className="Link" onClick={closeMobileMenu}>
                          <Button>Purchase Guide</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/PrivacyPolicy" className="Link" onClick={closeMobileMenu}>
                          <Button>Privacy Policy</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="/TermsOfService" className="Link" onClick={closeMobileMenu}>
                          <Button>Terms of Service</Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="*" className="Link" onClick={closeMobileMenu}>
                          <Button>404 Page</Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button onClick={closeMobileMenu}>Contact</Button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Phone Number - Hidden on Small Mobile */}
          <div className="col-lg-2 col-md-2 part3 d-none d-sm-flex align-items-center">
            <div className="phNo d-flex align-items-center">
              <HeadsetMicIcon className="" />
              <span className="text-center phNoText">
                <h4 className="text-g mb-0">+91-9827805086</h4>
                <p className="">24/7 Support Center</p>
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="col-12 d-md-none mobile-menu-btn">
            <button
              className="menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
