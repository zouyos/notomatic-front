import { type NoteType } from "../../types/types";
import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "noteSlice",
  initialState: {
    noteList: [] as NoteType[],
  },
  reducers: {
    setNoteList: (currentSlice, action) => {
      currentSlice.noteList = action.payload;
    },
    addNote: (currentSlice, action) => {
      currentSlice.noteList.push(action.payload as NoteType);
    },
    updateNote: (currentSlice, action) => {
      const indexToUpdate = currentSlice.noteList.findIndex(
        (note: NoteType) => note.id === action.payload.id
      );

      if (indexToUpdate !== -1) {
        currentSlice.noteList[indexToUpdate] = action.payload;

        currentSlice.noteList.sort(
          (a: NoteType, b: NoteType) =>
            new Date(b.modified_at || b.created_at).getTime() -
            new Date(a.modified_at || a.created_at).getTime()
        );
      }
    },
    deleteNote: (currentSlice, action) => {
      const filteredNoteList = currentSlice.noteList.filter(
        (note) => note.id !== action.payload
      );
      currentSlice.noteList = filteredNoteList;
    },
  },
});

export const { setNoteList, addNote, updateNote, deleteNote } =
  noteSlice.actions;
