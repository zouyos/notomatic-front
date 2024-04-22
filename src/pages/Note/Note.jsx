import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useEffect, useState } from "react";
import { deleteNote, updateNote } from "store/note/note-slice";
import { NoteAPI } from "api/note-api";

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
<<<<<<< HEAD
    const updatedNote = await NoteAPI.update({ ...formValues, id: note.id });
=======
    const updatedNote = await NoteAPI.update({
      ...formValues,
      id: note.id,
      userId: note.userId,
      created_at: note.created_at,
      modified_at: new Date().toLocaleDateString(),
    });
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  }

  async function removeNote(noteId) {
    if (window.confirm("Supprimer la note ?")) {
      await NoteAPI.deleteById(noteId);
      dispatch(deleteNote(noteId));
      navigate("/");
    }
  }

  useEffect(() => {
    dispatch(updateNote(note));
  }, [isEditable]);

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit Note" : note.title}
          note={note}
          onEditClick={() => setIsEditable(!isEditable)}
          onTrashClick={() => removeNote(note.id)}
          onSubmit={isEditable && submit}
          buttonLabel="Edit"
        />
      )}
    </>
  );
}
