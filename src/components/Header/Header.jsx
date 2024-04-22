import { Logo } from "components/Logo/Logo";
import style from "./style.module.css";
import logo from "assets/images/logo.png";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { BoxArrowInRight, Check } from "react-bootstrap-icons";
import { LogoutButton } from "components/LogoutButton/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "store/auth/auth-slice";
import { setNoteList } from "store/note/note-slice";
=======
>>>>>>> parent of b7de150 (auth part 2)
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7

export function Header() {
  const navigate = useNavigate();

<<<<<<< HEAD
  return (
    <div className={`row ${style.container}`}>
      <div className="col-xs-12 col-sm-4">
=======
  const loggedIn = useSelector((store) => store.AUTH.loggedIn);

  function logout() {
    localStorage.removeItem("token");
    dispatch(setLoggedIn(false));
    dispatch(setNoteList([]));
    navigate("/");
  }

  return (
    <div className={`row ${style.container}`}>
<<<<<<< HEAD
      <div className="col-xs-12 col-sm-4 py-2 px-3">
=======
      <div className="col-xs-12 col-sm-4">
>>>>>>> parent of b7de150 (auth part 2)
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7
        <Logo
          onClick={() => navigate("/")}
          title="Notomatic"
          subtitle="Manage your notes"
          image={logo}
        />
      </div>
<<<<<<< HEAD
      <div className="col-xs-12 col-sm-8 text-end">
        <ButtonPrimary onClick={() => navigate("/note/new")}>
          Add Note +
        </ButtonPrimary>
      </div>
=======
<<<<<<< HEAD
      <div className="col-xs-12 col-sm-4 text-center py-2 px-3">
        {loggedIn && (
          <ButtonPrimary onClick={() => navigate("/note/new")}>
            Add Note +
          </ButtonPrimary>
        )}
      </div>
      {loggedIn ? (
        <div className="d-flex justify-content-end col-xs-12 col-sm-4 py-2 px-3">
          <LogoutButton onClick={logout} />
        </div>
      ) : (
        <div className="d-flex justify-content-end col-xs-12 col-sm-4 flex-wrap py-2 px-3">
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
      )}
=======
      <div className="col-xs-12 col-sm-8 text-end">
        <ButtonPrimary onClick={() => navigate("/note/new")}>
          Add Note +
        </ButtonPrimary>
      </div>
>>>>>>> parent of b7de150 (auth part 2)
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7
    </div>
  );
}
