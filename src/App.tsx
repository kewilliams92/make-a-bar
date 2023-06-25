import { Component } from "solid-js";
import AppRoutes from "./router";
import Navbar from "./component/navbar/Navbar";


const App: Component = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
