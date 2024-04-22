import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { deleteNote, updateNote } from "store/note/note-slice";

export function Note() {
  const { noteId } = useParams();
  // example usage of usSearchParams
  // const [searchParams] = useSearchParams();
  // const foo = searchParams.get("foo"); // output "bar"

  const dispatch = useDispatch();
  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );

  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);

  async function submit(formValues) {
    dispatch(
      updateNote({
        ...formValues,
        id: note.id,
        created_at: note.created_at,
        modified_at: new Date().toLocaleDateString(),
      })
    );
    setIsEditable(false);
  }

  async function removeNote(noteId) {
    if (window.confirm("Supprimer la note ?")) {
      dispatch(deleteNote(noteId));
      navigate("/");
    }
  }

  return (
    <>
      <NoteForm
        isEditable={isEditable}
        title={isEditable ? "Edit Note" : note.title}
        note={note}
        onEditClick={() => setIsEditable(!isEditable)}
        onTrashClick={() => removeNote(note.id)}
        onSubmit={isEditable && submit}
        buttonLabel="Edit"
      />
    </>
  );
}
