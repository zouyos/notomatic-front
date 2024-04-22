import { NoteForm } from "components/NoteForm/NoteForm";
import { NoteAPI } from "api/note-api";
import { useDispatch } from "react-redux";
import { addNote } from "store/note/note-slice";
import { useNavigate } from "react-router-dom";

export function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createNote(formValues) {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
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
