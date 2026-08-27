import { NoteAPI } from '../../api/note-api';
import { UserForm } from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../store/auth/auth-slice';
import { User } from '../../types/types';
import { setNoteList } from '../../store/note/note-slice';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  async function login(formValues: User) {
    const { repeatPassword, ...rest } = formValues;

    try {
      await NoteAPI.login(rest);

      console.log('LOGIN SUCCESS');

      const noteList = await NoteAPI.fetchAll();

      console.log('NOTES FETCH SUCCESS', noteList);

      dispatch(setNoteList(noteList));
      dispatch(setLoggedIn(true));

      navigate('/');
    } catch (errs: any) {
      console.error('LOGIN/FETCH ERROR', errs);
      setServerErrors(errs.response?.data?.errors || [errs.message]);
    }
  }

  return (
    <>
      <UserForm onSubmit={login} serverErrors={serverErrors} />
      <div>
        <div className='d-flex justify-content-center text-center'>
          <Link to='/reset-password'>Forgot password?</Link>
        </div>
      </div>
    </>
  );
}
