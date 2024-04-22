import { Logo } from "components/Logo/Logo";
import style from "./style.module.css";
import logo from "assets/images/logo.png";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { BoxArrowInRight, Check } from "react-bootstrap-icons";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className={`row ${style.container}`}>
      <div className="col-xs-12 col-sm-4 py-2">
        <Logo
          onClick={() => navigate("/")}
          title="Notomatic"
          subtitle="Manage your notes"
          image={logo}
        />
      </div>
      <div className="col-xs-12 col-sm-4 text-center py-2">
        <ButtonPrimary onClick={() => navigate("/note/new")}>
          Add Note +
        </ButtonPrimary>
      </div>
      <div className="d-flex justify-content-end col-xs-12 col-sm-4 flex-wrap py-2">
        <span
          className={`me-2 ${style.auth}`}
          onClick={() => navigate("/signup")}
        >
          <Check className="mb-1" size={20} color="#b8b8b8" /> Sign Up
        </span>
        <span className={`${style.auth}`} onClick={() => navigate("/login")}>
          <BoxArrowInRight className="mb-1" size={20} color="#b8b8b8" /> Login
        </span>
      </div>
    </div>
  );
}
