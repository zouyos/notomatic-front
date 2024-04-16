import { NoteAPI } from "api/note-api";
import { UserForm } from "components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  async function signup(formValues) {
    console.log("signup");
    // await NoteAPI.signup(formValues);
    navigate("/login");
  }

  return <UserForm signup onSubmit={signup} />;
}
