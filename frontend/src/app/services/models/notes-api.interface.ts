export interface IApiGetNotesResponse {
  ok: boolean;
  message: string;
  notes: IApiNote[];
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
}
