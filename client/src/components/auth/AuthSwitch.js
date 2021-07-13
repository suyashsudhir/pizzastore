import React,{useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import {axios} from '../../utils';

const AuthSwitch = ({
  path,
  exact = false,
  truthyComponent: TruthyComponent,
  falsyComponent: FalsyComponent,
  ...rest
}) => {
    const [isAuthenticated, setisAuthenticated] = useState(true);
    const [authInfo, setauthInfo] = useState({})
    useEffect(() => {
        axios.get("/auth/checkAuth").then(({data}) => {
            if(data.isAuthenticated){
                setisAuthenticated(true);
                setauthInfo(data.information);
            }
            else{
                setisAuthenticated(false);
            }
        }).catch(err => setisAuthenticated(false));
    },[]);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated ? (
          <TruthyComponent authUser={authInfo} {...rest} />
        ) : (
          <FalsyComponent authUser={authInfo} {...rest} />
        )
      }
    />
  );
};

export  {AuthSwitch}
