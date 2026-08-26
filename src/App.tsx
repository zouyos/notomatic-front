import { NoteAPI } from './api/note-api';
import { Header } from './components/Header/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setNoteList } from './store/note/note-slice';
import style from './style.module.css';
import { NoteType } from './types/types';
import { setLoggedIn } from './store/auth/auth-slice';

export function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        await NoteAPI.checkAuth();

        dispatch(setLoggedIn(true));

        const noteList: NoteType[] = await NoteAPI.fetchAll();
        dispatch(setNoteList(noteList));
      } catch (err) {
        dispatch(setLoggedIn(false));
        dispatch(setNoteList([]));
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuthentication();
  }, [dispatch]);

  if (!authChecked) {
    return null;
  }

  return (
    <div className='container-fluid'>
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
