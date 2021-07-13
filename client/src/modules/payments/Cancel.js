import React from "react";
import Navbar from "../../components/pages/Navbar";
import cancelIcon from '../../assets/img/close.png'
const Cancel = () => (
    <>
        <Navbar />

        <div
            className="order-cancel-dialog"

        >

            <div className="order-cancel-dialog-container">
                <img alt="cancel" src={cancelIcon} />
                <h1>Oh No!</h1>
                <h3>You&apos;ve cancelled your payment.</h3>
                <div className="font-18">
                    Don&apos; worry. Your items are still in your <a href={"/cart"}>cart</a>.
                </div>
            </div>
        </div>

    </>
);

export default Cancel;