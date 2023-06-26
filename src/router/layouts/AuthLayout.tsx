import { Outlet, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

const AuthLayout: Component = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout