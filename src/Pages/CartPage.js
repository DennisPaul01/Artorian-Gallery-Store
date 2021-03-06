import React, { useContext, useState } from "react";

import AuthContext from "../store/auth-context";

import CartItem from "../Components/ItemsCart/CartItem";

import Line from "../Assets/line.svg";

import classes from "./CartPage.module.scss";

const CartPage = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [priceModal, setModalPrice] = useState(false);
  const authCtx = useContext(AuthContext);

  const itemsCart = JSON.parse(localStorage.getItem("cartItems"));
  let cartItems;
  let totalPrice = 0;

  // Check if is something in the cart to show in the page
  if (itemsCart === null || itemsCart.length < 1) {
    cartItems = <p>Nothing in the cart</p>;
  } else {
    cartItems = itemsCart.map((item) => {
      totalPrice += item.price;
      return (
        <CartItem
          key={Math.floor(Math.random() * 1000)}
          name={item.name}
          price={item.price}
        ></CartItem>
      );
    });
  }

  const confirmHandler = () => {
    if (totalPrice > 0) {
      setModalPrice(true);
    }
    setConfirmModal(true);
    localStorage.removeItem("cartItems");
  };

  return (
    <section className={classes.cart}>
      <h1>Cart</h1>
      <img src={Line} alt="line"></img>
      <div className={classes.cartDetails}>
        <div className={classes.productCart}>
          <h2>Cart Items</h2>
          {cartItems}

          <h2 className={classes.totalPrice}>Total: {totalPrice} EUR</h2>
          <button onClick={confirmHandler}>Confirm</button>
        </div>
        <div className={classes.accountDetailsCart}>
          <h2>Account details</h2>
          <p>Email: {authCtx.emailUser}</p>
        </div>
      </div>
      {confirmModal && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h3>
              {!priceModal
                ? "You have to buy something"
                : "Your order has been procesed!"}
            </h3>
            <br></br>
            <button
              onClick={() => {
                setConfirmModal(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
