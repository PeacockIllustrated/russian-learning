// Database types for this app's russ_ tables on the shared personal-projects
// Supabase project. Scoped to russ_ on purpose: the live public schema holds many
// other apps' tables that do not belong in this repo. Keep in step with db/schema.sql.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      russ_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          level: string;
          daily_target_minutes: number;
          streak_days: number;
          last_active: string | null;
          show_transliteration: boolean;
          tts_voice: string;
          reminder_time: string | null;
          scoring_enabled: boolean;
          playback_speed: number;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          level?: string;
          daily_target_minutes?: number;
          streak_days?: number;
          last_active?: string | null;
          show_transliteration?: boolean;
          tts_voice?: string;
          reminder_time?: string | null;
          scoring_enabled?: boolean;
          playback_speed?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          level?: string;
          daily_target_minutes?: number;
          streak_days?: number;
          last_active?: string | null;
          show_transliteration?: boolean;
          tts_voice?: string;
          reminder_time?: string | null;
          scoring_enabled?: boolean;
          playback_speed?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      russ_units: {
        Row: { id: string; owner: string; position: number; title: string; domain: string; level: string; summary: string | null; created_at: string };
        Insert: { id?: string; owner: string; position: number; title: string; domain: string; level?: string; summary?: string | null; created_at?: string };
        Update: { id?: string; owner?: string; position?: number; title?: string; domain?: string; level?: string; summary?: string | null; created_at?: string };
        Relationships: [];
      };
      russ_lessons: {
        Row: { id: string; owner: string; unit_id: string; position: number; title: string; scenario: string | null; status: string; grammar_focus: Json | null; score: number | null; created_at: string };
        Insert: { id?: string; owner: string; unit_id: string; position: number; title: string; scenario?: string | null; status?: string; grammar_focus?: Json | null; score?: number | null; created_at?: string };
        Update: { id?: string; owner?: string; unit_id?: string; position?: number; title?: string; scenario?: string | null; status?: string; grammar_focus?: Json | null; score?: number | null; created_at?: string };
        Relationships: [];
      };
      russ_phrases: {
        Row: { id: string; owner: string; lesson_id: string; position: number; cyrillic: string; transliteration: string | null; gloss: string; grammar_note: string | null; target_phonemes: string[] | null; audio_path: string | null };
        Insert: { id?: string; owner: string; lesson_id: string; position: number; cyrillic: string; transliteration?: string | null; gloss: string; grammar_note?: string | null; target_phonemes?: string[] | null; audio_path?: string | null };
        Update: { id?: string; owner?: string; lesson_id?: string; position?: number; cyrillic?: string; transliteration?: string | null; gloss?: string; grammar_note?: string | null; target_phonemes?: string[] | null; audio_path?: string | null };
        Relationships: [];
      };
      russ_vocabulary: {
        Row: { id: string; owner: string; lemma: string; gloss: string; part_of_speech: string | null; gender: string | null; lesson_id: string | null; created_at: string };
        Insert: { id?: string; owner: string; lemma: string; gloss: string; part_of_speech?: string | null; gender?: string | null; lesson_id?: string | null; created_at?: string };
        Update: { id?: string; owner?: string; lemma?: string; gloss?: string; part_of_speech?: string | null; gender?: string | null; lesson_id?: string | null; created_at?: string };
        Relationships: [];
      };
      russ_vocab_cases: {
        Row: { id: string; owner: string; vocab_id: string; grammatical_case: string; form: string };
        Insert: { id?: string; owner: string; vocab_id: string; grammatical_case: string; form: string };
        Update: { id?: string; owner?: string; vocab_id?: string; grammatical_case?: string; form?: string };
        Relationships: [];
      };
      russ_srs_cards: {
        Row: { id: string; owner: string; vocab_id: string | null; phrase_id: string | null; stability: number; difficulty: number; reps: number; lapses: number; due_at: string; last_reviewed: string | null };
        Insert: { id?: string; owner: string; vocab_id?: string | null; phrase_id?: string | null; stability?: number; difficulty?: number; reps?: number; lapses?: number; due_at?: string; last_reviewed?: string | null };
        Update: { id?: string; owner?: string; vocab_id?: string | null; phrase_id?: string | null; stability?: number; difficulty?: number; reps?: number; lapses?: number; due_at?: string; last_reviewed?: string | null };
        Relationships: [];
      };
      russ_recordings: {
        Row: { id: string; owner: string; phrase_id: string; audio_path: string; transcript: string | null; word_match: boolean | null; recorded_at: string };
        Insert: { id?: string; owner: string; phrase_id: string; audio_path: string; transcript?: string | null; word_match?: boolean | null; recorded_at?: string };
        Update: { id?: string; owner?: string; phrase_id?: string; audio_path?: string; transcript?: string | null; word_match?: boolean | null; recorded_at?: string };
        Relationships: [];
      };
      russ_scores: {
        Row: { id: string; owner: string; recording_id: string; overall: number | null; per_phoneme: Json | null; created_at: string };
        Insert: { id?: string; owner: string; recording_id: string; overall?: number | null; per_phoneme?: Json | null; created_at?: string };
        Update: { id?: string; owner?: string; recording_id?: string; overall?: number | null; per_phoneme?: Json | null; created_at?: string };
        Relationships: [];
      };
      russ_comprehension_attempts: {
        Row: { id: string; owner: string; lesson_id: string | null; prompt: string; correct: boolean; attempted_at: string };
        Insert: { id?: string; owner: string; lesson_id?: string | null; prompt: string; correct: boolean; attempted_at?: string };
        Update: { id?: string; owner?: string; lesson_id?: string | null; prompt?: string; correct?: boolean; attempted_at?: string };
        Relationships: [];
      };
      russ_sessions: {
        Row: { id: string; owner: string; lesson_id: string | null; score: number | null; new_words: number | null; avg_sound: number | null; started_at: string; completed_at: string | null };
        Insert: { id?: string; owner: string; lesson_id?: string | null; score?: number | null; new_words?: number | null; avg_sound?: number | null; started_at?: string; completed_at?: string | null };
        Update: { id?: string; owner?: string; lesson_id?: string | null; score?: number | null; new_words?: number | null; avg_sound?: number | null; started_at?: string; completed_at?: string | null };
        Relationships: [];
      };
      russ_letter_progress: {
        Row: { owner: string; glyph: string; reactivated: boolean; reviewed_at: string | null };
        Insert: { owner: string; glyph: string; reactivated?: boolean; reviewed_at?: string | null };
        Update: { owner?: string; glyph?: string; reactivated?: boolean; reviewed_at?: string | null };
        Relationships: [];
      };
      russ_lesson_progress: {
        Row: { owner: string; unit_position: number; lesson_position: number; score: number | null; completed_at: string };
        Insert: { owner: string; unit_position: number; lesson_position: number; score?: number | null; completed_at?: string };
        Update: { owner?: string; unit_position?: number; lesson_position?: number; score?: number | null; completed_at?: string };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Update"];
