import React, { useEffect } from 'react';
import check from '../../assets/img/checkmark.svg'
import Navbar from '../../components/pages/Navbar';
import {axios} from '../../utils';

export default function Success() {
  useEffect(() => {
    if (window.localStorage.getItem("cart")) {
      let cart = JSON.parse(window.localStorage.getItem("cart"));

      axios
        .post("/common/neworder", {
          total: cart.total,
          email: cart.email,
          address: cart.address,
          pizzaList: cart.items,
          phone: cart.phone,
        })
        .then((data) => {
            
          window.localStorage.removeItem("cart");
        });
    }
  },[]);
    return (
      <>
        <Navbar />

        <div
          className="order-confirmation-dialog"

        >

            <div className="order-confirmation-dialog-container">
              <img alt="success" src={check} />
              <h1>Thank You!</h1>
              <h3>Your order has been confirmed.</h3>
              <div className="font-18">
                Go to <a href={"/account"}>Account</a> or <a href={"/menu"}>Menu</a>.
              </div>
            </div>
          </div>

      </>
    );
}
