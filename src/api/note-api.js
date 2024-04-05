import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notes";

export class NoteAPI {
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
    const { _id, ...rest } = note;
    return { id: _id.toString(), ...rest };
  }
}
