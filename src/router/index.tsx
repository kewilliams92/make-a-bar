import { lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";

const RegisterScreen = lazy(() => import("../screens/register/Register"));
const LoginScreen = lazy(() => import("../screens/login/Login"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
        </Routes>
    )
}

export default AppRoutes