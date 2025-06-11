export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_coaching_sessions: {
        Row: {
          ai_response: string
          context_data: Json | null
          created_at: string
          id: string
          persona_used: string
          prompt_given: string
          session_type: string
          user_feedback: number | null
          user_id: string
        }
        Insert: {
          ai_response: string
          context_data?: Json | null
          created_at?: string
          id?: string
          persona_used: string
          prompt_given: string
          session_type: string
          user_feedback?: number | null
          user_id: string
        }
        Update: {
          ai_response?: string
          context_data?: Json | null
          created_at?: string
          id?: string
          persona_used?: string
          prompt_given?: string
          session_type?: string
          user_feedback?: number | null
          user_id?: string
        }
        Relationships: []
      }
      ai_insights: {
        Row: {
          action_required: boolean | null
          confidence_score: number | null
          created_at: string
          data_sources: string[] | null
          description: string
          expires_at: string | null
          id: string
          insight_type: string
          is_acted_upon: boolean | null
          is_viewed: boolean | null
          metadata: Json | null
          priority: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_required?: boolean | null
          confidence_score?: number | null
          created_at?: string
          data_sources?: string[] | null
          description: string
          expires_at?: string | null
          id?: string
          insight_type: string
          is_acted_upon?: boolean | null
          is_viewed?: boolean | null
          metadata?: Json | null
          priority?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_required?: boolean | null
          confidence_score?: number | null
          created_at?: string
          data_sources?: string[] | null
          description?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          is_acted_upon?: boolean | null
          is_viewed?: boolean | null
          metadata?: Json | null
          priority?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_integrations: {
        Row: {
          access_token: string | null
          calendar_id: string | null
          created_at: string
          id: string
          is_active: boolean
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_syncs: {
        Row: {
          calendar_id: string | null
          created_at: string
          goal_id: string
          id: string
          last_sync: string | null
          sync_data: Json | null
          updated_at: string
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string
          goal_id: string
          id?: string
          last_sync?: string | null
          sync_data?: Json | null
          updated_at?: string
        }
        Update: {
          calendar_id?: string | null
          created_at?: string
          goal_id?: string
          id?: string
          last_sync?: string | null
          sync_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_syncs_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      context_data: {
        Row: {
          data_source: string
          data_type: string
          expires_at: string | null
          id: string
          processed_insights: Json | null
          raw_data: Json
          recorded_at: string
          user_id: string
        }
        Insert: {
          data_source: string
          data_type: string
          expires_at?: string | null
          id?: string
          processed_insights?: Json | null
          raw_data: Json
          recorded_at?: string
          user_id: string
        }
        Update: {
          data_source?: string
          data_type?: string
          expires_at?: string | null
          id?: string
          processed_insights?: Json | null
          raw_data?: Json
          recorded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emotional_checkins: {
        Row: {
          ai_analysis: Json | null
          checkin_date: string
          confidence_level: number | null
          coping_strategies_used: string[] | null
          created_at: string
          emotions_tags: string[] | null
          energy_level: number
          goals_affected: string[] | null
          id: string
          journal_entry: string | null
          mood_score: number
          motivation_level: number | null
          stress_level: number
          trigger_events: string[] | null
          user_id: string
        }
        Insert: {
          ai_analysis?: Json | null
          checkin_date?: string
          confidence_level?: number | null
          coping_strategies_used?: string[] | null
          created_at?: string
          emotions_tags?: string[] | null
          energy_level: number
          goals_affected?: string[] | null
          id?: string
          journal_entry?: string | null
          mood_score: number
          motivation_level?: number | null
          stress_level: number
          trigger_events?: string[] | null
          user_id: string
        }
        Update: {
          ai_analysis?: Json | null
          checkin_date?: string
          confidence_level?: number | null
          coping_strategies_used?: string[] | null
          created_at?: string
          emotions_tags?: string[] | null
          energy_level?: number
          goals_affected?: string[] | null
          id?: string
          journal_entry?: string | null
          mood_score?: number
          motivation_level?: number | null
          stress_level?: number
          trigger_events?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      goal_predictions: {
        Row: {
          calculation_date: string
          completion_probability: number
          confidence_score: number
          created_at: string
          goal_id: string
          id: string
          predicted_completion_date: string | null
          risk_factors: Json | null
        }
        Insert: {
          calculation_date?: string
          completion_probability: number
          confidence_score: number
          created_at?: string
          goal_id: string
          id?: string
          predicted_completion_date?: string | null
          risk_factors?: Json | null
        }
        Update: {
          calculation_date?: string
          completion_probability?: number
          confidence_score?: number
          created_at?: string
          goal_id?: string
          id?: string
          predicted_completion_date?: string | null
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "goal_predictions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          progress: number
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          progress?: number
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          progress?: number
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_completions: {
        Row: {
          completed_at: string
          completion_date: string
          habit_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          completion_date?: string
          habit_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          completion_date?: string
          habit_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habit_stacks: {
        Row: {
          anchor_routine: string
          created_at: string
          id: string
          is_active: boolean
          new_goal_id: string
          success_rate: number | null
          trigger_context: string | null
          trigger_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          anchor_routine: string
          created_at?: string
          id?: string
          is_active?: boolean
          new_goal_id: string
          success_rate?: number | null
          trigger_context?: string | null
          trigger_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          anchor_routine?: string
          created_at?: string
          id?: string
          is_active?: boolean
          new_goal_id?: string
          success_rate?: number | null
          trigger_context?: string | null
          trigger_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_stacks_new_goal_id_fkey"
            columns: ["new_goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty: string
          frequency: string
          frequency_data: Json | null
          goal_id: string | null
          id: string
          is_active: boolean | null
          linked_habit_id: string | null
          name: string
          reminder_enabled: boolean | null
          reminder_time: string | null
          reward_points: number
          scheduled_days: number[] | null
          scheduled_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          difficulty: string
          frequency?: string
          frequency_data?: Json | null
          goal_id?: string | null
          id?: string
          is_active?: boolean | null
          linked_habit_id?: string | null
          name: string
          reminder_enabled?: boolean | null
          reminder_time?: string | null
          reward_points?: number
          scheduled_days?: number[] | null
          scheduled_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          frequency?: string
          frequency_data?: Json | null
          goal_id?: string | null
          id?: string
          is_active?: boolean | null
          linked_habit_id?: string | null
          name?: string
          reminder_enabled?: boolean | null
          reminder_time?: string | null
          reward_points?: number
          scheduled_days?: number[] | null
          scheduled_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habits_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habits_linked_habit_id_fkey"
            columns: ["linked_habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_configs: {
        Row: {
          access_token: string | null
          created_at: string
          error_details: string | null
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync_at: string | null
          last_sync_status: string | null
          refresh_token: string | null
          sync_frequency: string | null
          sync_settings: Json | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          error_details?: string | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync_at?: string | null
          last_sync_status?: string | null
          refresh_token?: string | null
          sync_frequency?: string | null
          sync_settings?: Json | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          error_details?: string | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          last_sync_status?: string | null
          refresh_token?: string | null
          sync_frequency?: string | null
          sync_settings?: Json | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          is_completed: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          is_completed?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          is_completed?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_checkins: {
        Row: {
          checkin_date: string
          created_at: string
          energy_level: number
          goal_id: string | null
          id: string
          mood_score: number
          notes: string | null
          stress_level: number
          updated_at: string
          user_id: string
        }
        Insert: {
          checkin_date?: string
          created_at?: string
          energy_level: number
          goal_id?: string | null
          id?: string
          mood_score: number
          notes?: string | null
          stress_level: number
          updated_at?: string
          user_id: string
        }
        Update: {
          checkin_date?: string
          created_at?: string
          energy_level?: number
          goal_id?: string | null
          id?: string
          mood_score?: number
          notes?: string | null
          stress_level?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_checkins_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_forecasts: {
        Row: {
          actual_outcome: Json | null
          confidence_score: number | null
          created_at: string
          data_points_used: number
          factors_analyzed: string[] | null
          forecast_date: string
          forecast_type: string
          goal_id: string | null
          habit_id: string | null
          id: string
          model_version: string | null
          prediction_value: Json
          user_id: string
          valid_until: string | null
        }
        Insert: {
          actual_outcome?: Json | null
          confidence_score?: number | null
          created_at?: string
          data_points_used: number
          factors_analyzed?: string[] | null
          forecast_date?: string
          forecast_type: string
          goal_id?: string | null
          habit_id?: string | null
          id?: string
          model_version?: string | null
          prediction_value: Json
          user_id: string
          valid_until?: string | null
        }
        Update: {
          actual_outcome?: Json | null
          confidence_score?: number | null
          created_at?: string
          data_points_used?: number
          factors_analyzed?: string[] | null
          forecast_date?: string
          forecast_type?: string
          goal_id?: string | null
          habit_id?: string | null
          id?: string
          model_version?: string | null
          prediction_value?: Json
          user_id?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_forecasts_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_forecasts_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      pod_memberships: {
        Row: {
          engagement_score: number | null
          id: string
          joined_at: string
          last_active: string | null
          pod_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          engagement_score?: number | null
          id?: string
          joined_at?: string
          last_active?: string | null
          pod_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          engagement_score?: number | null
          id?: string
          joined_at?: string
          last_active?: string | null
          pod_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pod_memberships_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "social_pods"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      progress_logs: {
        Row: {
          goal_id: string
          id: string
          logged_at: string
          new_progress: number
          previous_progress: number
        }
        Insert: {
          goal_id: string
          id?: string
          logged_at?: string
          new_progress: number
          previous_progress: number
        }
        Update: {
          goal_id?: string
          id?: string
          logged_at?: string
          new_progress?: number
          previous_progress?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_logs_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      recovery_interventions: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          intervention_data: Json | null
          intervention_type: string
          resolved_at: string | null
          trigger_type: string
          user_id: string
          was_accepted: boolean | null
          was_effective: boolean | null
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          intervention_data?: Json | null
          intervention_type: string
          resolved_at?: string | null
          trigger_type: string
          user_id: string
          was_accepted?: boolean | null
          was_effective?: boolean | null
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          intervention_data?: Json | null
          intervention_type?: string
          resolved_at?: string | null
          trigger_type?: string
          user_id?: string
          was_accepted?: boolean | null
          was_effective?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "recovery_interventions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_goal_templates: {
        Row: {
          category: string
          created_at: string
          dependency_patterns: Json | null
          difficulty_level: string | null
          estimated_duration_weeks: number | null
          id: string
          is_active: boolean | null
          milestone_templates: Json | null
          persona_type: string[] | null
          smart_goal_structure: Json
          success_metrics: Json | null
          success_rate: number | null
          template_name: string
          updated_at: string
          usage_count: number | null
          vague_input_examples: string[]
        }
        Insert: {
          category: string
          created_at?: string
          dependency_patterns?: Json | null
          difficulty_level?: string | null
          estimated_duration_weeks?: number | null
          id?: string
          is_active?: boolean | null
          milestone_templates?: Json | null
          persona_type?: string[] | null
          smart_goal_structure: Json
          success_metrics?: Json | null
          success_rate?: number | null
          template_name: string
          updated_at?: string
          usage_count?: number | null
          vague_input_examples: string[]
        }
        Update: {
          category?: string
          created_at?: string
          dependency_patterns?: Json | null
          difficulty_level?: string | null
          estimated_duration_weeks?: number | null
          id?: string
          is_active?: boolean | null
          milestone_templates?: Json | null
          persona_type?: string[] | null
          smart_goal_structure?: Json
          success_metrics?: Json | null
          success_rate?: number | null
          template_name?: string
          updated_at?: string
          usage_count?: number | null
          vague_input_examples?: string[]
        }
        Relationships: []
      }
      social_pods: {
        Row: {
          ai_moderator_enabled: boolean | null
          created_at: string
          created_by: string
          current_members: number | null
          description: string | null
          id: string
          is_active: boolean | null
          matching_criteria: Json | null
          max_members: number | null
          name: string
          pod_type: string | null
          updated_at: string
        }
        Insert: {
          ai_moderator_enabled?: boolean | null
          created_at?: string
          created_by: string
          current_members?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          matching_criteria?: Json | null
          max_members?: number | null
          name: string
          pod_type?: string | null
          updated_at?: string
        }
        Update: {
          ai_moderator_enabled?: boolean | null
          created_at?: string
          created_by?: string
          current_members?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          matching_criteria?: Json | null
          max_members?: number | null
          name?: string
          pod_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          streak_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          streak_date: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          streak_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          is_completed: boolean
          milestone_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean
          milestone_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean
          milestone_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      user_integrations: {
        Row: {
          access_token: string | null
          created_at: string
          id: string
          last_synced: string | null
          metadata: Json | null
          provider_id: string
          provider_user_id: string | null
          refresh_token: string | null
          status: string
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          provider_id: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          provider_id?: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          ai_coach_persona: string | null
          coaching_style: string | null
          created_at: string
          energy_patterns: Json | null
          id: string
          notification_preferences: Json | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_coach_persona?: string | null
          coaching_style?: string | null
          created_at?: string
          energy_patterns?: Json | null
          id?: string
          notification_preferences?: Json | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_coach_persona?: string | null
          coaching_style?: string | null
          created_at?: string
          energy_patterns?: Json | null
          id?: string
          notification_preferences?: Json | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
