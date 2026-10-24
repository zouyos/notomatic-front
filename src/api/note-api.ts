import axios from 'axios';
import { type User, type NoteType } from '../types/types';

export class NoteAPI {
  static formatId(note: NoteType) {
    if (note._id) {
      const { _id, ...rest } = note;
      return { id: _id.toString(), ...rest };
    } else if (note.id) {
      return { ...note, id: note.id.toString() };
    }
  }

  static async create(note: NoteType) {
    try {
      const response = await axios.post(
        '/api/note/',
        note,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }


  static async fetchAll() {
    try {
      const response = await axios.get('/api/note/', {
        withCredentials: true,
      });

      console.log('[fetchAll] URL :', response.config.url);
      console.log('[fetchAll] Status :', response.status);
      console.log('[fetchAll] Content-Type :', response.headers['content-type']);
      console.log('[fetchAll] Data :', response.data);

      if (!Array.isArray(response.data)) {
        throw new Error(
          `Réponse inattendue de fetchAll : status=${response.status}, ` +
          `content-type=${response.headers['content-type']}, ` +
          `data=${String(response.data).slice(0, 200)}`
        );
      }

      return response.data.map(this.formatId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('[fetchAll] Erreur HTTP :', {
          message: err.message,
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          status: err.response?.status,
          contentType: err.response?.headers['content-type'],
          data: err.response?.data,
        });
      } else {
        console.error('[fetchAll] Erreur :', err);
      }

      throw err;
    }
  }

  static async fetchById(id: string) {
    try {
      const response = await axios.get(
        `/api/note/${id}`,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async update(note: NoteType) {
    try {
      const response = await axios.patch(
        `/api/note/${note.id}`,
        note,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id: string) {
    try {
      const response = await axios.delete(
        `/api/note/${id}`,
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async signup(user: User) {
    try {
      return (
        await axios.post(
          '/api/auth/signup',
          user,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async login(user: User) {
    try {
      const res = await axios.post('/api/auth/login', user, {
        withCredentials: true,
      })
      console.log('LOGIN RESPONSE:', res.status, res.data);
      return res.data;
    } catch (err) {
      console.error('[Login] Erreur complète :', err);
      throw err;
    }
  }

  static async checkAuth() {
    const response = await axios.get(
      '/api/auth/check',
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  static async logout() {
    const response = await axios.post(
      '/api/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  static async requestPasswordReset(email: string) {
    try {
      return (
        await axios.post(
          '/api/auth/request-password-reset',
          email,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(data: User) {
    try {
      return (
        await axios.post(
          `/api/auth/reset/${data.token}`,
          data,
          {
            withCredentials: true,
          }
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }
}