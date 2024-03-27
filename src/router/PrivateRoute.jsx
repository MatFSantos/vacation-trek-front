import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const { children } = props
    const user = true; // lógica de login.

    return user ? children : <Navigate to="/home" />;
}

export default PrivateRoute;