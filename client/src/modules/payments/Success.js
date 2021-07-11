import React, { useEffect } from 'react';
import check from '../../assets/img/checkmark.svg'
import Navbar from '../../components/pages/Navbar';
import {axios} from '../../utils';
import {Modal} from "semantic-ui-react";
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
            console.log(JSON.parse(window.localStorage.getItem("cart")))
          window.localStorage.removeItem("cart");
        });
    }
  },[]);
    return (
      <>
        <Navbar active="Settings" />
          <Modal open={true}>
              <Modal.Header>Header</Modal.Header>
              <Modal.Content>
                  Content
              </Modal.Content>
              <Modal.Actions>
                  Hello
              </Modal.Actions>
          </Modal>
        <div
          className="container-fluid"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <div className="d-flex align-items-center justify-content-center h-100 flex-column">
            <div className="order-confirmation-dialog d-flex align-items-center justify-content-center flex-column">
              <img alt="success" src={check} />
              <h1>Thank You!</h1>
              <h3>Your order has been confirmed.</h3>
              <div className="font-18">
                Go to <a href={"/account"}>Account</a> or <a href={"/"}>Home</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
