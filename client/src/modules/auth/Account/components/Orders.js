
import moment from "moment";
import React, { useEffect, useState } from "react";
import { axios } from "../../../../utils";
import Modal from "../../../../components/Modal/Modal";
import Skeleton from "react-loading-skeleton";
import _ from 'lodash';


function Orders({ user }) {
    const [orders, setorders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [dataLoading, setDataLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://enigmatic-dawn-15291.herokuapp.com/users/orders?email=${user.email}`).then(({data}) => {
        
            setorders(data);
            setDataLoading(false);
        });
    }, [user.email]);


    const handleOpen = (order) => {
        
        setCurrentOrder(order);
        setModalOpen(true)
    }
    const skeletonArr = [1,2,3,4];
    return (
        <div className="orders-container">
            <Modal footer={false} show={modalOpen} onClose={() => setModalOpen(false)} title={currentOrder.id}>
                <div className="order-details-container">
                    <div>

                    {currentOrder.pizzaList &&currentOrder.pizzaList.map(item => (
                        <>
                        <div className="order-item-info">
                            <p className="font-18"><strong>{_.startCase(item.crust)}</strong> x {item.quantity}</p>
                            <p>{_.startCase(item.crust)}</p>
                             <p>{_.startCase(item.size)}</p>
                        </div>
                        
                        
                        </>
                    ))}
                    </div>
                    <p className="font-18"><strong>Total:</strong> ₹{currentOrder.total}</p>
                </div>
            </Modal>
            <h1>Recent Orders</h1>
            <div className="order-item-container">
                {dataLoading ? (
                    <>
                        {skeletonArr.map(i => (
                            <div className="order-card" key={i}>
                                <div>
                                    <h2>
                                        <Skeleton width={200} height={25}/>
                                    </h2>
                                    <p><Skeleton width={250}/>

                                    </p>
                                    <span className="font-18">
                                        <Skeleton width={100}/>
                                    </span>
                                    <p className="font-18 order-created-time">
                                        <Skeleton width={100}/>
                                    </p>
                                </div>

                            </div>
                        ))}
                    </>
                ) : (
                    <>
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
                    </>
                )}

            </div>
        </div>
    );

}


export default Orders;
