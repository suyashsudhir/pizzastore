import React, {Component} from "react";

import {v4 as uuid} from 'uuid';

import {axios} from "../../utils";
import _, {parseInt} from "lodash";
import Navbar from "../../components/pages/Navbar";
import noveg from '../../assets/img/noveg.png';
import veg from '../../assets/img/veg.png';
import Modal from "../../components/Modal/Modal";
import Skeleton from "react-loading-skeleton";
import searchIcon from '../../assets/img/search_brand.svg'
import notFound from '../../assets/img/no-pizzas.svg'

const quantityArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const crustArray = [
    {
        name: "New Hand Tossed",
        value: "new_hand_tossed",
        price: 0,
    },
    {
        name: "Thin Wheat",
        value: "thin_wheat",
        price: 50,
    },
    {name: "Cheese Burst", value: "cheese_burst", price: 100},
    {name: "Fresh Pan", value: "fresh_pan", price: 50},
    {name: "Classic Hand Tossed", value: "classic_hand_tossed", price: 50},
];


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzaList: [],
            originalPizzaList: [],
            sizeValue: "Medium",
            currentPizza: {},
            modalShow: false,
            showOverlay: false,
            couroselArray: [],
            currentPizzaSizeValue: "medium",
            currentPizzaCrustValue: "new_hand_tossed",
            currentPizzaPrice: 0,
            currentPizzaPriceSize: 0,
            currentPizzaPriceCrust: 0,
            seaechTerm: "",
            dataLoading: true,
            quantity: 1

        };
    }

    componentDidMount() {
        axios.get("https://enigmatic-dawn-15291.herokuapp.com/common/test").then(({data}) => {
            let l = _.cloneDeep(data.filter((x) => !x.isSides));

            for (var a = 0; a < l.length; a++) {
                var x = l[a];
                var y = Math.floor(Math.random() * (a + 1));
                l[a] = l[y];
                l[y] = x;
            }

            this.setState({

                pizzaList: data,
                couroselArray: l,
                originalPizzaList: data,
                dataLoading: false
            });


        }).catch(e => this.setState({dataLoading: false}));
    }

    handleModalShow = (pizza) => {
        
        this.setState({
            currentPizza: pizza,
            modalShow: true,
            showOverlay: true,

        });
    };


    handleQtyChange(event, item) {
        this.setState({
            quantity: event.target.value,
            currentPizzaPrice: this.state.currentPizzaPrice * event.target.value
        });
        // if (parseInt(item.price) !== this.state.currentPizzaPrice) {
        //     this.setState({quantity: event.target.value, currentPizzaPrice: parseInt(item.price) * event.target.value});
        // } else {
        //     this.setState({
        //         quantity: event.target.value,
        //         currentPizzaPrice: this.state.currentPizzaPrice * event.target.value
        //     });
        // }
    }

    handleSizeChange = (event, item) => {

        // this.setState({currentPizzaPrice: 0})

        let currentPrice = 0;

        if (event.target.value === 'large') {
            currentPrice = parseInt(item.price) + 100
        }
        if (event.target.value === 'small') {
            currentPrice = parseInt(item.price) - 50;
        }


        this.setState({
            currentPizzaSizeValue: event.target.value,
            currentPizzaPriceSize: currentPrice,
            currentPizzaPrice: currentPrice,
        });
    };

    handleCrustChange = (event, item) => {
        let currentPrice = 0

        currentPrice =
            currentPrice +
            crustArray.filter((x) => x.value === event.target.value)[0].price;


        this.setState({
            currentPizzaCrustValue: event.target.value,
            currentPizzaPrice: currentPrice,
            currentPizzaPriceCrust: currentPrice,
        });
    };

    handleSearch = (text) => {
        let searchRes = [];

        searchRes = this.state.originalPizzaList.filter(
            (x) =>
                x.name.toLowerCase().includes(text.toLowerCase()) ||
                x.description.toLowerCase().includes(text.toLowerCase())
        );
        if (text !== "") {
            this.setState({pizzaList: searchRes});
        } else {
            this.setState({pizzaList: this.state.originalPizzaList});
        }
    };


    handleAddToCart = () => {

        let cart = {};
        if (!window.localStorage.getItem('cart')) {

            cart = {
                id: uuid(),
                items: [
                    {
                        ...this.state.currentPizza,
                        price: ((this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize) === 0 ?
                            parseInt(this.state.currentPizza.price) :
                            (this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize)) * this.state.quantity,
                        size: this.state.currentPizzaSizeValue,
                        crust: this.state.currentPizzaCrustValue,
                        quantity: this.state.quantity
                    }
                ]
            }


        } else {
            const q = JSON.parse(window.localStorage.getItem('cart'));
            const index = _.findIndex(q.items,x => (x.id === this.state.currentPizza.id && x.crust === this.state.currentPizzaCrustValue && x.size === this.state.currentPizzaSizeValue))
            

            if (index>=0) {
                const existingItem = _.remove(q.items, x => (x.id === this.state.currentPizza.id && x.crust === this.state.currentPizzaCrustValue && x.size === this.state.currentPizzaSizeValue))
              let updatedItem =  _.update(existingItem[0], 'quantity', value => parseInt(value) + parseInt(this.state.quantity));
                updatedItem = _.update(existingItem[0], 'price', value => value + (((this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize) === 0 ?
                    parseInt(this.state.currentPizza.price) :
                    (this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize)) * this.state.quantity));
                q.items.splice(index, 1, updatedItem);
                
                cart = q;


            }
        else {

                let nextPizza = {
                    ...this.state.currentPizza,
                    price: ((this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize) === 0 ?
                        parseInt(this.state.currentPizza.price) :
                        (this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize)) * this.state.quantity,
                    size: this.state.currentPizzaSizeValue,
                    crust: this.state.currentPizzaCrustValue,
                    quantity: this.state.quantity
                };
                const prevCart = JSON.parse(window.localStorage.getItem("cart"));
                prevCart.items.push(nextPizza);
                cart = prevCart;
            }


        }

        window.localStorage.setItem('cart', JSON.stringify(cart));
        this.handleModalClose();
    }

    render() {
        const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];
        return (
            <>
                <Navbar handleSearch={(e) => this.handleSearch(e.target.value)}/>
                {this.state.pizzaList === 0 && !this.state.dataLoading &&(
                    <div>Not Found</div>
                )}


                {this.state.dataLoading ? (
                        <div className="menu-container">

                            <div className="menu-item-card">
                                {skeletonArr.map(i => (
                                    <div className="pizza-card" key={i}>
                                        <Skeleton height={250} width="100%"/>

                                        <div className="pizza-information">
                                            <div className="pizza-name-desc">

                                                <h2 className="pizza-name-header">
                                                    <Skeleton/>
                                                </h2>
                                                <p>
                                                    <Skeleton height={100}/>
                                                </p></div>
                                            <div className="pizza-price">

                                                <span>
                                                    <Skeleton width={50}/>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ) :

                    (
                        <div className="menu-container">

                            <Modal btnText={"Add to cart"} title={this.state.currentPizza.name}
                                   show={this.state.modalShow}
                                   onClose={() => this.handleModalClose()}
                                   btnAction={this.handleAddToCart}>
                                <div>
                                    <div className="modal-container">
                                        <img src={this.state.currentPizza.image} alt="pizza"/>
                                        <p>{this.state.currentPizza.description}</p>
                                        <div className="select-container">
                                            <select
                                                className="brand-select"
                                                value={this.state.currentPizzaSizeValue}
                                                onChange={(e) =>
                                                    this.handleSizeChange(e, this.state.currentPizza)
                                                }
                                            >
                                                {this.state.currentPizza.sizes &&
                                                this.state.currentPizza.sizes.map((size) => (
                                                    <option key={size} style={{zIndex: 999999}} value={size}>
                                                        {_.capitalize(size)}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="brand-select"
                                                value={this.state.currentPizzaCrustValue}
                                                onChange={(e) =>
                                                    this.handleCrustChange(e, this.state.currentPizza)
                                                }
                                            >
                                                {crustArray.map((item) => (
                                                    <option style={{zIndex: 999999}} value={item.value}
                                                            key={item.value}>
                                                        {_.capitalize(item.name)}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="brand-select"
                                                value={this.state.quantity}
                                                onChange={(e) =>
                                                    this.handleQtyChange(e, this.state.currentPizza)
                                                }
                                            >
                                                {quantityArray.map((item) => (
                                                    <option value={item} key={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="current-price">₹{((this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize) === 0 ?
                                            parseInt(this.state.currentPizza.price)
                                            : (this.state.currentPizzaPriceCrust + this.state.currentPizzaPriceSize)) * this.state.quantity}</p>
                                    </div>
                                </div>
                            </Modal>

                            <div className="search-box-home">
                                <input className="brand-input" placeholder="Search your favorite pizzas!"
                                       onChange={e => this.handleSearch(e.target.value)}/>
                                <img alt="search" src={searchIcon}/>
                            </div>
                            <div className="menu-item-card">
                                {this.state.pizzaList.filter((x) => !x.isSides).length > 0 && this.state.pizzaList.filter((x) => !x.isSides).map(pizza => (
                                    <div className="pizza-card" onClick={() => this.handleModalShow(pizza)} key={pizza.id}>
                                        <img src={pizza.image} alt="pizza"/>

                                        <div className="pizza-information">
                                            <div className="pizza-name-desc">

                                                <h2 className="pizza-name-header">{pizza.name}</h2>
                                                <p>{pizza.description}</p></div>
                                            <div className="pizza-price">
                                                <img src={pizza.isVeg ? veg : noveg} alt="veg-nonveg"/>
                                                <span>₹{pizza.price}</span>
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                {this.state.pizzaList.filter((x) => !x.isSides).length === 0 &&
                <div className="no-pizza-found">
                    <img alt={"no-result"} src={notFound} />
                    <h1>We&apos;re working hard to add that pizza to our menu!</h1>
                </div>
                }
            </>
        );
    }

    handleModalClose() {
        this.setState({modalShow: false})
        setTimeout(() => {
            this.setState({

                showOverlay: false,
                currentPizza: {},
                currentPizzaSizeValue: "medium",
                currentPizzaPrice: 0,
                currentPizzaCrustValue: "new_hand_tossed",
                currentPizzaPriceSize: 0,
                currentPizzaPriceCrust: 0,
                quantity: 1
            });
        }, 400)
    }
}

export default Home;
