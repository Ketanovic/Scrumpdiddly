import "./CSS/App.css";
import Nav from "./Nav.js";
import { Outlet } from "react-router-dom";

const App = () => (
    <div>
        <Nav />
        <div>
            <Outlet />
        </div>
    </div>
);

export default App;
