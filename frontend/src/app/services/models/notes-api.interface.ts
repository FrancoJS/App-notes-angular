export interface IApiGetNotesResponse {
  ok: boolean;
  message: string;
  notes: IApiNote[];
  totalNotes: number;
}

export interface IApiNote {
  note_id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}

export interface IApiNoteRequest {
  title: string;
  content: string;
}

export interface IApiNoteResponse {
  ok: boolean;
  message: string;
  note: IApiNote;
  totalNotes?: number;
}

// Son los modelos de datos que ocupa todo los relacionado con peticiones Http de las notas
