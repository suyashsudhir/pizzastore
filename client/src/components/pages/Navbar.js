import React,{useEffect, useState} from "react";

import {axios} from '../../utils';
import cartIcon from '../../assets/img/shopping_cart_black_48dp.svg'

function Navbar({active, handleSearch, showSearch}) {
const [isAuthenticated, setisAuthenticated] = useState(true);
const [authInfo, setauthInfo] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/checkAuth")
      .then(({ data }) => {
        if (data.isAuthenticated) {
          setisAuthenticated(true);
          setauthInfo(data.information);
        } else {
          setisAuthenticated(false);
        }
      })
      .catch((err) => setisAuthenticated(false));
  },[]);

const handleLogout = () => {
  axios.get("http://localhost:8080/logout").then(data=> {
    window.localStorage.removeItem('token');
    window.location.href = "/";
  });
}

  
  return (

      <nav className="navbar">
          <a href="/" className="nav-logo">PizzaPlace</a>
          <ul className="nav-menu">
              <li className="nav-item">
                  <a href="/" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                  <a href="/menu" className="nav-link">Menu</a>
              </li>

          </ul>
          <a className="cart-icon-link" href={"/cart"}>
              <img className="cart-icon" src={cartIcon} alt={"cart-icon"}/>
          </a>
          {isAuthenticated? <span className="user-info-nav">Hello, {authInfo.fullname}</span>:<a href={"/signin"} className="brand-btn">Sign In</a> }

          <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </div>
      </nav>
  //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //     <div className="container-fluid">
  //       <a className="navbar-brand" href="/">
  //         Pizza Place
  //       </a>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarNav"
  //         aria-controls="navbarNav"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarNav">
  //         <ul className="navbar-nav">
  //           <li className="nav-item">
  //             <a
  //               className={active === "Cart" ? "nav-link active" : "nav-link"}
  //               aria-current="page"
  //               href="/cart"
  //             >
  //               Cart
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className={
  //                 active === "Settings" ? "nav-link active" : "nav-link"
  //               }
  //               href="/account"
  //             >
  //               Settings
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //
  //       {showSearch && (
  //         <input
  //           className="form-control me-2 w-25"
  //           type="search"
  //           placeholder="Search"
  //           aria-label="Search"
  //           onChange={handleSearch}
  //         />
  //       )}
  //       <span className="navbar-text" style={{ marginRight: "20px" }}>
  //         {!isAuthenticated ? (
  //           <a href="/signin">Sign In</a>
  //         ) : (
  //           <Dropdown text={`Hello ${authInfo.fullname} `}>
  //             <Dropdown.Menu>
  //
  //             <Dropdown.Item text="Sign Out" onClick={handleLogout}/>
  //             </Dropdown.Menu>
  //           </Dropdown>
  //
  //         )}
  //       </span>
  //     </div>
  //   </nav>
   );


}

export default Navbar;
