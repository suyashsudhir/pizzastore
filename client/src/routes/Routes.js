import React from 'react';


import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthenticatedRoute } from '../components/auth/AuthenticatedRoute';
import Account from '../modules/auth/Account/Account';
import Cart from '../modules/auth/Cart/Cart';
import DashBoard from '../modules/auth/DashBoard';
import SignIn from '../modules/auth/SignIn';
import SignUp from '../modules/auth/SignUp';
import Home from '../modules/Home/Home';
import Success from '../modules/payments/Success';
import LandingPage from "../components/LandingPage";
import Cancel from "../modules/payments/Cancel";

function Routes() {
  
    return (
      <BrowserRouter>
        <Switch>
          <Route component={SignIn} path={"/signin"} exact />
            <Route component={Home} path={"/menu"} exact />
          <AuthenticatedRoute component={Success} path={"/success"} exact />
            <AuthenticatedRoute component={Cancel} path={"/cancel"} exact />
          <Route component={Cart} path={"/cart"} exact />
          <Route component={LandingPage} path={"/"} exact />
          <AuthenticatedRoute
            exact={true}
            component={DashBoard}
            path={"/home"}
          />
          <AuthenticatedRoute
            exact={true}
            component={Account}
            path={"/account"}
          />
          <Route component={SignUp} path="/signup" exact />
          <Route component={() => <div>not found</div>} path="*" />
        </Switch>
      </BrowserRouter>
    );
}

export default Routes
