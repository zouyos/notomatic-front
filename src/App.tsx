import { NoteAPI } from './api/note-api';
import { Header } from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setNoteList } from './store/note/note-slice';
import style from './style.module.css';
import { setLoggedIn } from './store/auth/auth-slice';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        await NoteAPI.checkAuth();

        dispatch(setLoggedIn(true));

        const noteList = await NoteAPI.fetchAll();
        dispatch(setNoteList(noteList));
      } catch {
        dispatch(setLoggedIn(false));
        dispatch(setNoteList([]));
      }
    }

    checkAuthentication();
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
