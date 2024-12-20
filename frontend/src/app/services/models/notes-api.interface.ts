export interface IApiNotesResponse {
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
