import { Outlet, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

const MainLayout: Component = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default MainLayout