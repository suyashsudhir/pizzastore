
import moment from "moment";
import React, { useEffect, useState } from "react";
import { axios } from "../../../../utils";
import Modal from "../../../../components/Modal/Modal";


function Orders({ user }) {
    const [orders, setorders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    useEffect(() => {
        axios.get(`/users/orders?email=${user.email}`).then(({data}) => {
            console.log(data);
            setorders(data);
        });
    }, [user.email]);


    const handleOpen = (order) => {
        console.log(order)
        setCurrentOrder(order);
        setModalOpen(true)
    }
    return (
        <div className="orders-container">
            <Modal footer={false} show={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="order-details-container">
                    {currentOrder.pizzaList &&currentOrder.pizzaList.map(item => (
                        <div className="order-item-info">
                            <p>{item.name}</p>
                            <p>{item.id}</p>
                        </div>
                    ))}
                </div>
            </Modal>
            <h1>Recent Orders</h1>
            <div className="order-item-container">
                {orders.map(order => (
                    <div className="order-card">
                        <div>
                            <h2>{order.name || `${user.fullname}'s Pizza Order`}</h2>
                            <p><strong>Order ID: </strong>{order.id}</p>
                            <span className="font-18">{order.pizzaList.length} {order.pizzaList.length > 1?'items':'item'}</span>
                            <p className="font-18 order-created-time">
                                {moment(order.created).local(true).format('ll')}
                            </p>
                        </div>
                        <button className="brand-btn order-details-button" onClick={() => handleOpen(order)}>Details</button>
                    </div>
                ))}
            </div>
        </div>
    );

}


export default Orders;
