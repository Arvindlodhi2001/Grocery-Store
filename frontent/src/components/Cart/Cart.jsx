import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import Toastify from "../../Utils/Toastify/Toastify";
import {
  deleteToCart,
  getAllCart,
  updateCartQuantity,
} from "../../Redux/features/cart/cartThunks";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    cartItems = [],
    isLoading,
    error,
    message,
  } = useSelector((state) => state.cart);
  const [userConfig, setUserConfig] = useState(
    JSON.parse(localStorage.getItem("user")),
  );

  const API_URL = import.meta.env.VITE_API_URL;
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    if (userConfig) {
      dispatch(getAllCart({ userId: userConfig._id, API_URL: API_URL }));
    }
  }, [dispatch, userConfig]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCartQuantity({
        productId: id,
        quantity: newQuantity,
        userId: userConfig._id,
        API_URL: API_URL,
      }),
    );
  };

  const removeItem = async (productId) => {
    try {
      await dispatch(
        deleteToCart({
          productId,
          userId: userConfig._id,
          API_URL: API_URL,
        }),
      ).unwrap();
      Toastify("success", "Product removed from cart successfully!");
    } catch (error) {
      Toastify("error", error || "Failed to remove product");
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0,
    );
  }, [cartItems]);

  const shipping = cartItems.length ? 5 : 0;
  const totalCost = subtotal + shipping;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      Toastify("warning", "Please enter a promo code");
      return;
    }
    Toastify("info", `Promo code ${promoCode} applied!`);
  };

  return (
    <div className="cart-container my-5">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 col-12 cart-items-section">
            <h3 className="mb-4">Shopping Cart</h3>
            {cartItems.length > 0 ? (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
              </div>
            )}
            <div className="continue-shopping mt-4">
              <a
                href="/Home"
                className="text-decoration-none btn btn-outline-secondary"
              >
                Continue Shopping
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-12 order-summary-section">
            <div className="order-summary border p-4 rounded sticky-top">
              <h4 className="mb-3">Order Summary</h4>
              <div className="summary-row mb-2">
                <span>Items:</span>
                <span className="fw-bold">{cartItems.length}</span>
              </div>
              <div className="summary-row mb-2">
                <span>Subtotal:</span>
                <span className="fw-bold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row mb-3">
                <span>Shipping:</span>
                <span className="fw-bold">₹{shipping.toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-row mb-3 total-row">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold text-success fs-5">
                  ₹{totalCost.toFixed(2)}
                </span>
              </div>

              <div className="promo-section mb-3">
                <label className="form-label fw-bold">Promo Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button className="btn btn-success w-100 fw-bold py-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item border-bottom py-3 mb-2">
      <div className="row align-items-center">
        <div className="col-sm-2 col-4 text-center mb-3 mb-sm-0">
          <img
            src={item.thumbnail}
            alt={item.productName}
            className="img-fluid rounded"
            style={{
              width: "100%",
              maxWidth: "120px",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-sm-4 col-8 mb-3 mb-sm-0">
          <h6 className="mb-1 product-name">{item.productName}</h6>
          <p className="text-muted mb-2 small brand-name">{item.brand}</p>
          <button
            className="btn btn-link text-danger p-0 btn-sm"
            onClick={() => removeItem(item._id)}
          >
            Remove
          </button>
        </div>

        <div className="col-sm-3 col-6 mb-3 mb-sm-0">
          <div className="quantity-control d-flex align-items-center justify-content-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
            >
              −
            </button>
            <span className="mx-2 fw-bold">{item.quantity || 1}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="col-sm-3 col-6 text-end text-sm-center">
          <p className="mb-1 price">₹{item.price}</p>
          <p className="text-muted mb-0 small">
            Total: ₹{(item.price * (item.quantity || 1)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
