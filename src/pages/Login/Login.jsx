import { NoteAPI } from "api/note-api";
import { UserForm } from "components/UserForm/UserForm";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "store/auth/auth-slice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function login(formValues) {
    const { repeatPassword, ...rest } = formValues;
    try {
      await NoteAPI.login(rest);
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (errs) {
      console.log(errs);
      setServerErrors(errs.response.data || errs);
    }
  }

  return <UserForm onSubmit={login} serverErrors={serverErrors} />;
}
