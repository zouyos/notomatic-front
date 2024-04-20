import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:3200/api";

export class NoteAPI {
  static formatId(note) {
    if (note._id) {
      const { _id, ...rest } = note;
      return { id: _id.toString(), ...rest };
    } else if (note.id) {
      return { ...note, id: note.id.toString() };
    }
  }

  static getUserIdFromToken() {
    let token = Cookies.get("token");
    // token.reduce((acc, value) => {
    //   return acc + value;
    // });
    console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    return null;
  }

  static async create(note) {
    try {
      const response = await axios.post(
        `${BASE_URL}/note/`,
        { ...note, userId: this.getUserIdFromToken() },
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
      const response = await axios.get(`${BASE_URL}/note/`, {
        withCredentials: true,
      });
      return response.data.map(this.formatId);
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/note/${id}`, {
        withCredentials: true,
      });
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async update(note) {
    try {
      const response = await axios.patch(
        `${BASE_URL}/note/${note.id}`,
        { ...note, userId: this.getUserIdFromToken() },
        {
          withCredentials: true,
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/note/${id}`, {
        withCredentials: true,
      });
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async signup(user) {
    try {
      return (
        await axios.post(`${BASE_URL}/auth/signup`, user, {
          withCredentials: true,
        })
      ).data;
    } catch (err) {
      throw err;
    }
  }

  static async login(user) {
    try {
      return (
        await axios.post(`${BASE_URL}/auth/login`, user, {
          withCredentials: true,
        })
      ).data;
    } catch (err) {
      throw err;
    }
  }
}
