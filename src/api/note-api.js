import axios from "axios";

const BASE_URL = "http://localhost:3200/api";

export class NoteAPI {
  static async create(note) {
    return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
  }

  static async fetchAll() {
    return (await axios.get(`${BASE_URL}/notes`)).data.map(this.formatId);
  }

  static async fetchById(id) {
    return this.formatId((await axios.get(`${BASE_URL}/notes/${id}`)).data);
  }

  static async update(note) {
    return this.formatId(
      (await axios.patch(`${BASE_URL}/notes/${note.id}`, note)).data
    );
  }

  static async deleteById(id) {
    return (await axios.delete(`${BASE_URL}/notes/${id}`)).data;
  }

  static async signup(user) {
    return (await axios.post(`${BASE_URL}/auth/signup`, user)).data;
  }

  static async login(userId) {
    return (await axios.post(`${BASE_URL}/auth/login`, userId)).data;
  }

  static formatId(note) {
    const { _id, ...rest } = note;
    return { id: _id.toString(), ...rest };
  }
}
