export type VehicleClass = "genki1" | "genki2" | "normal";
export type SegmentStatus = "pending" | "verified" | "rejected";
export type SegmentSource = "jmpsa" | "mlit" | "osm" | "user";
export type VoteType = "confirm" | "dispute";

type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export interface Database {
  public: {
    Tables: {
      restricted_segments: {
        Row: {
          id: string;
          source: SegmentSource;
          source_ref: string | null;
          license: string | null;
          applies_to: VehicleClass[];
          road_name: string | null;
          prefecture: string | null;
          start_point: string;
          end_point: string;
          geometry: string | null;
          description: string | null;
          status: SegmentStatus;
          verification_count: number;
          created_by: string | null;
          created_at: string;
          verified_at: string | null;
        };
        Insert: {
          id?: string;
          source: SegmentSource;
          source_ref?: string | null;
          license?: string | null;
          applies_to: VehicleClass[];
          road_name?: string | null;
          prefecture?: string | null;
          start_point: string;
          end_point: string;
          geometry?: string | null;
          description?: string | null;
          status?: SegmentStatus;
          verification_count?: number;
          created_by?: string | null;
          verified_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["restricted_segments"]["Insert"]>;
        Relationships: Relationship[];
      };
      segment_photos: {
        Row: {
          id: string;
          segment_id: string;
          storage_path: string;
          caption: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          segment_id: string;
          storage_path: string;
          caption?: string | null;
          uploaded_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["segment_photos"]["Insert"]>;
        Relationships: Relationship[];
      };
      verifications: {
        Row: {
          id: string;
          segment_id: string;
          user_id: string;
          vote: VoteType;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          segment_id: string;
          user_id: string;
          vote: VoteType;
          comment?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["verifications"]["Insert"]>;
        Relationships: Relationship[];
      };
    };
    Views: Record<string, never>;
    Functions: {
      check_route_restrictions: {
        Args: { route_wkt: string; vehicle: VehicleClass };
        Returns: {
          id: string;
          road_name: string | null;
          prefecture: string | null;
          description: string | null;
          applies_to: VehicleClass[];
          source: SegmentSource;
          coordinate_accuracy: "exact" | "municipality";
          start_lat: number;
          start_lng: number;
          end_lat: number;
          end_lng: number;
        }[];
      };
      list_restricted_segments: {
        Args: {
          p_vehicle?: string | null;
          p_status?: string;
          p_limit?: number;
          p_sources?: string[] | null;
          p_prefecture?: string | null;
          p_applies_to_exact?: string[] | null;
          p_restriction_tags?: string[] | null;
        };
        Returns: {
          id: string;
          source: SegmentSource;
          applies_to: VehicleClass[];
          road_name: string | null;
          prefecture: string | null;
          description: string | null;
          status: SegmentStatus;
          verification_count: number;
          created_at: string;
          coordinate_accuracy: "exact" | "municipality";
          start_lat: number | null;
          start_lng: number | null;
          end_lat: number | null;
          end_lng: number | null;
        }[];
      };
    };
    Enums: {
      vehicle_class: VehicleClass;
      segment_status: SegmentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

// APIレスポンス用フラット型
export interface SegmentRow {
  id: string;
  source: SegmentSource;
  applies_to: VehicleClass[];
  road_name: string | null;
  prefecture: string | null;
  description: string | null;
  status: SegmentStatus;
  verification_count: number;
  created_at: string;
  coordinate_accuracy: "exact" | "municipality";
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
}

// 地図表示用 — migration 0003 (list_restricted_segments) 適用後に lat/lng が入る
export type SegmentListItem = Omit<SegmentRow, "start_lat" | "start_lng" | "end_lat" | "end_lng"> & {
  start_lat?: number | null;
  start_lng?: number | null;
  end_lat?: number | null;
  end_lng?: number | null;
  restriction_tag?: string | null;
};
