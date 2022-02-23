import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props extends RouteProps {
    component: any

}

export default function PrivateRoute({component: Component}: Props) {

    const {userStore: {isLoggedIn}} = useStore();

    return(
        isLoggedIn ? <Component/> : <Navigate to='/' />
     
    )
}