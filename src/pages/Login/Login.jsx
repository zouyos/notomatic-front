import { NoteAPI } from "api/note-api";
import { UserForm } from "components/UserForm/UserForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "store/auth/auth-slice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function login(formValues) {
    const { repeatPassword, ...rest } = formValues;
    try {
      const { token } = await NoteAPI.login(rest);
      localStorage.setItem("token", token);
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return <UserForm onSubmit={login} errMsg={error} />;
}
