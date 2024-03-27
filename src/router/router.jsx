import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import App from "../App";
import { routes } from "./routes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: routes
    }
])