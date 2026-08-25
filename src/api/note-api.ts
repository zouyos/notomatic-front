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
        `${process.env.REACT_APP_BACKEND_DOMAIN}/note/`,
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
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/note/`,
        {
          withCredentials: true,
        }
      );
      return response.data.map(this.formatId)
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/note/${id}`,
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
        `${process.env.REACT_APP_BACKEND_DOMAIN}/note/${note.id}`,
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
        `${process.env.REACT_APP_BACKEND_DOMAIN}/note/${id}`,
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
          `${process.env.REACT_APP_BACKEND_DOMAIN}/auth/signup`,
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
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/login`, user, {
        withCredentials: true,
      })
      console.log('LOGIN RESPONSE:', res.status, res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  static async checkAuth() {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/auth/check`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  static async logout() {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/auth/logout`,
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
          `${process.env.REACT_APP_BACKEND_DOMAIN}/auth/request-password-reset`,
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
          `${process.env.REACT_APP_BACKEND_DOMAIN}/auth/reset/${data.token}`,
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