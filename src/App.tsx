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

  console.log('APP MOUNT');

  useEffect(() => {
    async function checkAuthentication() {
      console.log('CHECK AUTH START');

      try {
        await NoteAPI.checkAuth();
        console.log('CHECK AUTH SUCCESS');

        dispatch(setLoggedIn(true));

        console.log('FETCH NOTES START');

        const noteList: NoteType[] = await NoteAPI.fetchAll();

        console.log('FETCH NOTES SUCCESS', noteList);

        dispatch(setNoteList(noteList));
      } catch (err) {
        console.error('APP AUTH/FETCH ERROR', err);

        dispatch(setLoggedIn(false));
        dispatch(setNoteList([]));
      } finally {
        console.log('AUTH CHECKED');
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
