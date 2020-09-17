import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { Context } from "./Context"

function PrivateRoute({ component: RouteComponent, ...rest }) {
    const {currentUser} = useContext(Context)
    return (
        <Route
        {...rest}
        render={routeProps =>
            !!currentUser ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to={"/login"} />
            )
        }
        />
    )
}

export default PrivateRoute