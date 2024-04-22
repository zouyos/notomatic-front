import { NoteAPI } from "api/note-api";
import { UserForm } from "components/UserForm/UserForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function signup(formValues) {
    try {
      await NoteAPI.signup(formValues);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message || err.message);
    }
  }

  return <UserForm signup onSubmit={signup} errMsg={error} />;
}
