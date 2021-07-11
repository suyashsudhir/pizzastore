import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthSwitch } from './AuthSwitch';


const AuthenticatedRoute = ({component, ...rest}) => {
    return (
        <AuthSwitch {...rest}
        truthyComponent={component}
        falsyComponent={() => <Redirect to="/signin"/>}
        />
        
    )
}

export  {AuthenticatedRoute}
