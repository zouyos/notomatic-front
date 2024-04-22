import axios from "axios";
<<<<<<< HEAD

const BASE_URL = "http://localhost:3200/notes";
=======
import { jwtDecode } from "jwt-decode";
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7

const BASE_URL = "http://localhost:3200/api/notes";

export class NoteAPI {
<<<<<<< HEAD
  static async create(note) {
    return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
  }

  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }

  static async fetchById(id) {
    return this.formatId((await axios.get(`${BASE_URL}/${id}`)).data);
  }

  static async update(note) {
    return this.formatId(
      (await axios.patch(`${BASE_URL}/${note.id}`, note)).data
    );
  }

  static async deleteById(id) {
    return (await axios.delete(`${BASE_URL}/${id}`)).data;
  }

  static formatId(note) {
    return { ...note, id: note.id.toString() };
=======
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
<<<<<<< HEAD
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
=======
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }

  static async fetchById(id) {
    return this.formatId((await axios.get(`${BASE_URL}/${id}`)).data);
  }

  static async update(note) {
    return this.formatId(
      (await axios.patch(`${BASE_URL}/${note.id}`, note)).data
    );
  }

  static async deleteById(id) {
    return (await axios.delete(`${BASE_URL}/${id}`)).data;
  }

  static formatId(note) {
    const { _id, ...rest } = note;
    return { id: _id.toString(), ...rest };
>>>>>>> parent of b7de150 (auth part 2)
>>>>>>> baa62e322f011a6a75546ce528a7eba1a63222f7
  }
}
