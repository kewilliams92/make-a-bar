import { lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

const RegisterScreen = lazy(() => import("../screens/register/Register"));
const LoginScreen = lazy(() => import("../screens/login/Login"));
const HomeScreen = lazy(() => import("../screens/homePage/Home"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" component={MainLayout}>
        <Route path="" component={HomeScreen} />
      </Route>

      <Route path="/auth" component={AuthLayout}>
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
