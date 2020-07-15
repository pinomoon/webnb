import React, {useContext} from 'react';
import{Redirect, Route, RouteProps} from 'react-router';
import {UserContext} from './UserContext';

export function PrivateRouteHost({component:Component, ...rest}){
    const userContext=useContext(UserContext);
        return (
            <Route
                {...rest}
                render={(props) =>
                    userContext.id ?
                        (userContext.tipo==0 ? (
                        <Component {...props}/>
                            ): (<Redirect to={{pathname: "/unabled", state: {from: props.location}}}/>)

                        ) : (
                        <Redirect to={{pathname: "/login", state: {from: props.location}}}/>)

                }

            />
        );
}

export function PrivateRouteCliente({component:Component, ...rest}){
    const userContext=useContext(UserContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                userContext.id ?
                    (userContext.tipo==1 ? (
                            <Component {...props}/>
                        ): (<Redirect to={{pathname: "/unabled", state: {from: props.location}}}/>)

                    ) : (
                        <Redirect to={{pathname: "/login", state: {from: props.location}}}/>)

            }

        />
    );
}

export function PrivateRoute({component:Component, ...rest}){
    const userContext=useContext(UserContext);
    return (
        <Route
            {...rest}
            render={(props) =>

                    ((userContext.tipo==1 || !userContext.id) ? (
                            <Component {...props}/>
                        ): (<Redirect to={{pathname: "/unabled", state: {from: props.location}}}/>)

                    )

            }

        />
    );
}

