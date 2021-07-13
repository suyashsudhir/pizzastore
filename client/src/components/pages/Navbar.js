import React, {useEffect, useState, useRef} from "react";
import Darkmode from "darkmode-js";

import {axios} from '../../utils';
import Avatar from "react-avatar";

function Navbar() {
    const [isAuthenticated, setisAuthenticated] = useState(true);
    const [authInfo, setauthInfo] = useState({});
    const [isMenuOpen, setIsMenuOPen] = useState(false)
    const hamburgerRef = useRef(null);
    const navMenuRef = useRef(null);
    const darkmode = new Darkmode();
    useEffect(() => {
        axios
            .get("http://localhost:8080/auth/checkAuth")
            .then(({data}) => {
                if (data.isAuthenticated) {
                    setisAuthenticated(true);
                    setauthInfo(data.information);
                } else {
                    setisAuthenticated(false);
                }

            })
            .catch((err) => setisAuthenticated(false));
    }, [darkmode.isActivated()]);

    const handleLogout = () => {
        axios.get("http://localhost:8080/logout").then(data => {
            window.localStorage.removeItem('token');
            window.location.href = "/";
        });
    }


    return (

        <nav className="navbar">
            <a href="/" className="nav-logo">PizzaPlace</a>
            <ul className="nav-menu" ref={navMenuRef} onClick={() => navMenuRef.current.classList.toggle('active')}>
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/menu" className="nav-link">Menu</a>
                </li>

            </ul>
            <a className="cart-icon-link" href={"/cart"}>

                <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                        d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
            </a>
            {isAuthenticated ? <span className="user-info-nav" onClick={() => setIsMenuOPen(!isMenuOpen)}>
                <Avatar  alt={"user-profile-picture"} src={authInfo.profilePicture} round={true} size={50} name={authInfo.fullname}/>
                    {isMenuOpen && (
                       <div className="dropdown-menu">
                           <p onClick={() => darkmode.toggle()}>Dark Mode</p>
                           <a href={"/account"}>Account</a>
                           <p onClick={handleLogout}>Sign Out</p>
                       </div>
                    )}
            </span> :
                <a href={"/signin"} className="brand-btn">Sign In</a>}

            <div className="hamburger" ref={hamburgerRef} onClick={() => hamburgerRef.current.classList.toggle('active')}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>

    );


}


export default Navbar;
