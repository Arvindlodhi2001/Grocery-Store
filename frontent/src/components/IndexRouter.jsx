import { lazy } from "react";
import { useLocation } from "react-router-dom";
const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Listing = lazy(() => import("./Listing/Listing"));
const PageNotFound404 = lazy(() => import("./PageNotFound404/PageNotFound404"));
const DetailsProduct = lazy(() => import("./DetailsProduct/DetailsProduct"));
const MyAccount = lazy(() => import("./MyAccount/MyAccount"));

const ForgetPassword = lazy(() => import("./ForgetPassword/ForgetPassword"));
const ResetPassword = lazy(() => import("./ResetPassword/ResetPassword"));
const Contact = lazy(() => import("./Contact/Contact"));
const PurchaseGuide = lazy(() => import("./PurchaseGuide/PurchaseGuide"));
const Cart = lazy(() => import("./Cart/Cart"));
const ProductPage = lazy(() => import("./ProductPage/ProductPage"));

// Admin Panel
const Dashboard = lazy(() => import("./AdminPannel/Dashboard"));
const Product = lazy(() => import("./AdminPannel/Product/Product"));
const CategoryUpload = lazy(
  () => import("./AdminPannel/Category/CategoryUpload"),
);

const Wishlist = lazy(() => import("./Wishlist/Wishlist"));
const ProductDetails = lazy(() => import("./ProductDetails/ProductDetails"));

const LoginPage = lazy(() => import("./Login/LoginPage"));
const RegisterPage = lazy(() => import("./RegisterPage/RegisterPage"));

const Header = lazy(() => import("./Header/Header"));
const Footer = lazy(() => import("./Footer/Footer"));

const IndexRouter = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/", "/login", "/register"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Listing" element={<Listing />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/DetailsProduct" element={<DetailsProduct />} />
        <Route path="/MyAccount" element={<MyAccount />} />

        <Route path="/Login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/PurchaseGuide" element={<PurchaseGuide />} />

        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Product/Details" element={<ProductDetails />} />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/Product/View/:ProductID" element={<ProductPage />} />

        {/* Admin Routes */}
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        <Route path="/Admin/Product" element={<Product />} />
        <Route path="/Admin/Category/Upload" element={<CategoryUpload />} />

        <Route path="*" element={<PageNotFound404 />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default IndexRouter;

