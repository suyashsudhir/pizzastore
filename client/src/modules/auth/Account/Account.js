import React, { useState } from "react";
import Navbar from "../../../components/pages/Navbar";
import Orders from "./components/Orders";
import Security from "./components/Security";
import Settings from "./components/Settings";

import Sidebar from "../../../components/auth/Sidebar";


function Account(props) {
  const [activetab, setactivetab] = useState("orders");
  const activeVal = value => {
      setactivetab(value)

  }
  
  return (
    <>
      <Navbar />

        <div className="account-component-container">
            <Sidebar activeValue={activeVal}/>
            <div>
                <select className="brand-select" defaultValue={activetab} onChange={(e) => setactivetab(e.target.value)}>
                    <option value="orders">Your Orders</option>
                    <option value="general">General</option>
                    <option value="security">Security</option>

                </select>
                {activetab === 'orders' ? (
                    <Orders user={props.authUser}/>
                ):activetab === 'security' ? (
                        <Security user={props.authUser}/>
                    )
                    : (
                        <Settings user={props.authUser}/>
                    )}
            </div>
        </div>
      {/*<div*/}
      {/*  className="container-fluid"*/}
      {/*  style={{ height: "calc(100vh - 100px)" }}*/}
      {/*>*/}
      {/*  <div className="d-flex align-items-center justify-content-center">*/}
      {/*    <div className="d-flex align-items-center justify-content-start mt-5 flex-column account-card">*/}
      {/*      <nav className="nav nav-pills nav-fill">*/}
      {/*        <div*/}
      {/*          onClick={() => setactivetab("account")}*/}
      {/*          style={{ cursor: "pointer", margin: "0 10px" }}*/}
      {/*          className={`nav-link ${*/}
      {/*            activetab === "account" ? "active" : ""*/}
      {/*          }`}*/}
      {/*          aria-current="page"*/}
      {/*        >*/}
      {/*          Account*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*          onClick={() => setactivetab("orders")}*/}
      {/*          style={{ cursor: "pointer" }}*/}
      {/*          className={`nav-link ${activetab === "orders" ? "active" : ""}`}*/}
      {/*        >*/}
      {/*          Your Orders*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*          onClick={() => setactivetab("security")}*/}
      {/*          style={{ cursor: "pointer" }}*/}
      {/*          className={`nav-link ${*/}
      {/*            activetab === "security" ? "active" : ""*/}
      {/*          }`}*/}
      {/*        >*/}
      {/*          Security*/}
      {/*        </div>*/}
      {/*      </nav>*/}

      {/*      <div*/}
      {/*        className={activetab === "orders" ? "mt-5 overflow-auto" : "mt-5"}*/}
      {/*      >*/}
      {/*        {activetab === "account" ? (*/}
      {/*          <Settings user={props.authUser} />*/}
      {/*        ) : activetab === "orders" ? (*/}
      {/*          <Orders user={props.authUser} />*/}
      {/*        ) : (*/}
      {/*          <Security user={props.authUser} />*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}

export default Account;
