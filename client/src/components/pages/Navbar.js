import React, {useEffect, useState, useRef} from "react";
import Darkmode from "darkmode-js";
//import hamburgerIcon from '../../assets/img/menu_white_24dp.svg';

import {axios} from '../../utils';
import Avatar from "react-avatar";




function Navbar() {
  
    
    const [isAuthenticated, setisAuthenticated] = useState(true);
    const [authInfo, setauthInfo] = useState({});
    const [isMenuOpen, setIsMenuOPen] = useState(false);
    const [isNavOpen, setisNavOpen] = useState(false);
    const hamburgerRef = useRef(null);
    const navMenuRef = useRef(null);
    const darkmode = new Darkmode();
  //   window.onclick = (event) => {
  //   if(isMenuOpen){
  //     setIsMenuOPen(false)
  //   }
  // }
    useEffect(() => {
        axios
            .get("https://enigmatic-dawn-15291.herokuapp.com/auth/checkAuth")
            .then(({data}) => {
                if (data.isAuthenticated) {
                    setisAuthenticated(true);
                    setauthInfo(data.information);
                } else {
                    setisAuthenticated(false);
                }

            })
            .catch((err) => setisAuthenticated(false));
    }, []);

    const handleLogout = () => {
        axios.get("https://enigmatic-dawn-15291.herokuapp.com/logout").then(data => {
          
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('cart');
            window.location.href = "/";
        }).catch(e => {
          console.log("error in logout")
        });
    }


    return (
      <>
        <nav className="navbar">
          <a href="/" className="nav-logo">
            BestPizzas
          </a>
          <ul
            className="nav-menu"
            ref={navMenuRef}
            onClick={() => navMenuRef.current.classList.toggle("active")}
          >
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/menu" className="nav-link">
                Menu
              </a>
            </li>
          </ul>

          <a className="cart-icon-link" href={"/cart"}>
            <svg
              className="cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 0 24 24"
              width="48px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </a>

          {isAuthenticated ? (
            <span
              className="user-info-nav"
              onClick={() => setIsMenuOPen(!isMenuOpen)}
            >
              <Avatar
                alt={"user-profile-picture"}
                src={authInfo.profilePicture}
                round={true}
                size={50}
                name={authInfo.fullname}
              />
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <p onClick={() => darkmode.toggle()}>Dark Mode</p>
                  <a href={"/account"}>Account</a>
                  <p onClick={handleLogout}>Sign Out</p>
                </div>
              )}
            </span>
          ) : (

            <div className="sign-in-button-container">

            <a href={"/signin"} className="brand-btn">
              Sign In
            </a>
            </div>
          )}

          <span
            className="hamburger-menu-icon"
            onClick={() =>
              {
                setisNavOpen(!isNavOpen)
                hamburgerRef.current.classList.toggle("hamburger-active")}
            }
          >
            {isNavOpen ? (
              
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
              
            ) : (

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
            )}
          </span>
        </nav>

        <div className="nav-menu-resposive-container" ref={hamburgerRef}>
          <ul className="nav-menu-resposive">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/menu" className="nav-link">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="cart-icon-link" href={"/cart"}>
                <svg
                  className="cart-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 0 24 24"
                  width="48px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </>
    );


}


export default Navbar;
