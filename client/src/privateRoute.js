import React, {useContext} from 'react';
import{Redirect, Route, RouteProps} from 'react-router';
import {UserContext} from './UserContext';

export function PrivateRoute({component:Component, ...rest}){
    const userContext=useContext(UserContext);
    return(
      <Route
          {...rest}
             render={(props)=>
        userContext.id ?(
            <Component {...props}/>
            ) : (
            <Redirect to={{pathname:"/login", state:{from:props.location}}}/>)

    }

      />
    );
}