export interface IApiNotesResponse {
  ok: boolean;
  message: string;
  notes: IApiNotes[];
}

export interface IApiNotes {
  note_id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}
