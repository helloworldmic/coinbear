import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IDashboardState } from "../redux/store";  //=IRootState

export function PrivateRoute({ component, ...rest }: RouteProps) {
    const isAuthenticated = useSelector(
        (state: IDashboardState) => state.auth.isAuthenticated // =IRootState
    );
    console.log(isAuthenticated);

    const Component = component;
    if (Component == null) {
        return null;
    }

    let render: (props: any) => JSX.Element;
    if (isAuthenticated) {
        render = (props: any) => <Component {...props} />;
    } else {
        render = (props: any) => (
            <Redirect
                to={{
                    pathname: "/login", //wrong--use backend route name：api/users/login
                    state: { from: props.location },
                }}
            />
        );
    }

    return <Route {...rest} render={render} />;
}


