import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { addNote } from "store/note/note-slice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createNote(formValues) {
    dispatch(
      addNote({
        ...formValues,
        id: uuidv4(),
        created_at: new Date().toLocaleDateString(),
      })
    );
    navigate("/");
  }

  return (
    <>
      <NoteForm
        title="Create A Note"
        onSubmit={createNote}
        buttonLabel="Create"
      />
    </>
  );
}
