import { Header } from "components/Header/Header";
import { Outlet } from "react-router-dom";
import style from "./style.module.css";

export function App() {
  return (
    <div className="container-fluid">
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
