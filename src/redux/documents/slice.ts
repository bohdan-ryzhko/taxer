import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/dist/createAction.d';
import { createSlice } from "@reduxjs/toolkit";
import { DocumentType } from "../../utils";

type DocumentsInitialState = {
  documents: DocumentType[],
  currentDocument: number,
}

const initialState: DocumentsInitialState = {
  documents: [],
  currentDocument: 0,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument(state, action: PayloadAction<DocumentType>) {
      state.documents.push(action.payload);
    },

    removeDocument(state, action: PayloadAction<number>) {
      state.currentDocument = state.currentDocument === 0 ? 0 : state.currentDocument - 1;
      state.documents.splice(action.payload, 1);
    },

    setCurrenDocument(state, action: PayloadAction<number>) {
      state.currentDocument = action.payload;
    }
  },
});

export const {
  addDocument,
  removeDocument,
  setCurrenDocument,
} = documentsSlice.actions;

export default documentsSlice.reducer;
