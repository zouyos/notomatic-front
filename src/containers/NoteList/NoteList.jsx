import { useDispatch } from "react-redux";
import style from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "store/note/note-slice";

export function NoteList({ noteList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function removeNote(noteId) {
    if (window.confirm("Supprimer la note ?")) {
      dispatch(deleteNote(noteId));
    }
  }

  return (
    <div className={`${style.container} row justify-content-center`}>
      {noteList.map((note) => {
        return (
          <div className={style.card_container} key={note.id}>
            <TextCard
              title={note.title}
              subtitle={note.modified_at ? note.modified_at : note.created_at}
              content={note.content}
              onCardClick={() => navigate(`/note/${note.id}`)}
              onTrashClick={() => removeNote(note.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
