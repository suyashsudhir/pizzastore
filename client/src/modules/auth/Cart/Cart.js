/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import Navbar from '../../../components/pages/Navbar';
import {axios} from '../../../utils';
import { useForm } from "react-hook-form";
import _ from 'lodash';

function Cart() { 
  let quantityArray = [0,1,2,3,4,5,6,7,8,9,10,11]
  const { handleSubmit, register } = useForm();
    const [cartEmpty, setCartEmpty] = useState(
      window.localStorage.getItem("cart")? false: true
    );
    const [cart, setCart] = useState( JSON.parse(window.localStorage.getItem('cart')));
    const [user, setuser] = useState({});
    const [cartUpdated, setCartUpdated] = useState(false)
    const [finalPrice, setfinalPrice] = useState({
      tax: 0,
      total: 0,
      totalBeforeTax: 0
    })

    useEffect(() => {
        axios.get("http://localhost:8080/auth/checkAuth").then(({data}) => {
          console.log(data)
            setuser(data.information);
        }).catch(e => {});
      let final = 0 
      if (window.localStorage.getItem("cart")){

        cart.items.forEach((item) => {
          final = final + (item.price );
        });
      console.log(final);
      const tax = final * 0.18;
       
      setfinalPrice({
        tax: tax.toFixed(2),
        total: (tax + final),
        totalBeforeTax: final.toFixed(2)
      })
      }
    }, [cartUpdated, cart, cartEmpty]);

   const  handleCheckout = (values) => {
     console.log(values)
     const body = {
       total: finalPrice.total,
       email: values.email,
       address: values.address,
       pizzaList: cart.items,
       phone: values.phone
     };
     console.log(body)
       axios
         .post("/common/create-stripe-checkout", body)
         .then((data) => {
           window.location.href = data.data;
         });

         const currentCart = JSON.parse(window.localStorage.getItem('cart'));
         let cartInfo = {
           ...currentCart,
           total: finalPrice.total,
           email: values.email,
           address: values.address,
           phone: values.phone,
         };

         window.localStorage.setItem("cart", JSON.stringify(cartInfo));
     };
   const updateCart = (item) => {
    if(cart.items.length<=1){
        window.localStorage.removeItem('cart');
        setCartEmpty(true)
    }
    else {
        let currentItems =  _.cloneDeep(cart.items).filter(x=> item.id !== x.id);
        console.log(currentItems);
        let updatedCart = {
            ...cart,
            items: currentItems
        }
        window.localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
        setCartUpdated(true);
    }

   }
    return (
      <>

        <Navbar active="Cart" showSearch={false} />
        {!cartEmpty && (
          <div className="cart-container">
            <div className={"cart-form-container"}>
                <h1>Payment & Shipping Information</h1>
                <form onSubmit={handleSubmit(handleCheckout)}>
                    <div className="form-container">

                        <input
                            className="brand-input mt-4"
                            placeholder="Email"
                            {...register("email")}
                            defaultValue={user.email}
                        />


                        <input
                            className="brand-input"
                            placeholder="Address"
                            {...register("address")}
                            defaultValue={user.address}
                        />


                        <input
                            className="brand-input"
                            placeholder="Phone"
                            {...register("phone")}
                            defaultValue={user.phone}
                        />

                    <div className="price-info">
                        <div
                            className="price-info-row"

                        >
                            <div >
                                <strong>Sub Total</strong>
                            </div>

                            <div>
                                ₹{finalPrice.totalBeforeTax}
                            </div>
                        </div>
                        <div
                            className="price-info-row"

                        >
                            <div className="col">
                                <strong>Tax</strong>
                            </div>

                            <div className="col ">₹{finalPrice.tax}</div>
                        </div>
                        <div
                            className="price-info-row"

                        >
                            <div className="col">
                                <strong>Total</strong>
                            </div>

                            <div className="col ">₹{finalPrice.total}</div>
                        </div>
                    </div>


                        <button className="brand-btn" type="submit">
                            Pay ₹{finalPrice.total.toFixed(2)}
                        </button>

                    </div>
                </form>
            </div>
            <div className="cart-item-container">
                <h1>Cart Summary</h1>
              {!cartEmpty &&
              cart.items.map((item) => (
                  <div className="cart-item">
                    <div className="item-image">
                      <img src={item.image} />
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p className="item-desc">{item.description}</p>
                        <p>
                              <span>
                                <strong>Size: </strong>
                                {_.capitalize(item.size)}
                              </span>
                          <span>
                                <strong>Crust: </strong>
                            {_.startCase(item.crust)}
                              </span>
                        </p>
                      </div>
                    </div>
                    <div className="item-price">
                      <p className="font-18">₹{item.price}</p>
                      <p className="font-18">
                        <strong>Quantity: </strong>{item.quantity}
                      </p>
                      <span className="text-red" onClick={() => updateCart(item)}>Remove</span>
                    </div>
                  </div>
              ))}
            </div>

          </div>
        )}
        {cartEmpty && (
          <div
            className="empty-cart-container"

          >
            <div className="d-flex align-items-center justify-content-center h-100 flex-column">
              <p className="font-36">
                <strong>There's nothing in your cart</strong>
              </p>
              <p className="font-18">
                Browse our{" "}
                <a href="/menu">Menu</a>.
              </p>
            </div>
          </div>
        )}
      </>
    );
}

export default Cart
