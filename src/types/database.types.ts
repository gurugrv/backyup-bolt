export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      backups: {
        Row: {
          id: string
          user_id: string
          name: string
          source_path: string
          destination_path: string
          size_bytes: number | null
          status: string | null
          last_backup: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          source_path: string
          destination_path: string
          size_bytes?: number | null
          status?: string | null
          last_backup?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          source_path?: string
          destination_path?: string
          size_bytes?: number | null
          status?: string | null
          last_backup?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}