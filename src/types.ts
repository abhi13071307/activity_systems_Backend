export interface EventInput {
  actor_id: number;
  verb: string;
  object_type: string;
  object_id: string;
  target_user_ids: number[];
  created_at?: number;
}

export interface EventRecord extends EventInput {
  event_id: string;
  created_at: number;
}
