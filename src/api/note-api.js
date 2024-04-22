import axios from "axios";
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
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    return null;
  }

  static async create(note) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/note/`,
        { ...note, userId: this.getUserIdFromToken() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/note/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.map(this.formatId);
    } catch (err) {
      throw err;
    }
  }

  static async fetchById(id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async update(note) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `${BASE_URL}/note/${note.id}`,
        { ...note, userId: this.getUserIdFromToken() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${BASE_URL}/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return this.formatId(response.data);
    } catch (err) {
      throw err;
    }
  }

  static async signup(user) {
    try {
      return (await axios.post(`${BASE_URL}/auth/signup`, user)).data;
    } catch (err) {
      throw err;
    }
  }

  static async login(user) {
    try {
      return (await axios.post(`${BASE_URL}/auth/login`, user)).data;
    } catch (err) {
      throw err;
    }
  }
}
