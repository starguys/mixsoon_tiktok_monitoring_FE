export interface TikTokContent {
  content_id: string;
  influencer_handle: string;
  followers: number;
  tier: "나노" | "마이크로" | "미드" | "메가";
  url: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  sponsorship_type: "organic" | "pr_free" | "pr_paid";
  exploded_bucket: "10k" | "100k" | "500k" | "1M" | null;
  language: "ko" | "en" | "es" | "other";
  country: string;
  createdAt: string;
  crawledAt: string;
  thumbnail?: string;
  description?: string;
}

export interface KPIData {
  totalUploads: number;
  freeSponsorships: number;
  paidSponsorships: number;
  averageViews: number;
  explodedContent: number;
}

export interface ChartData {
  date: string;
  uploads: number;
  averageViews: number;
}

export interface TierData {
  tier: string;
  uploads: number;
  averageViews: number;
}

export type TimeFilter = "all" | "today" | "week" | "month";
export type LanguageFilter = "all" | "ko" | "en" | "es";
