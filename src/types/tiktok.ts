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

export interface DailyMetricsResponse {
  uploads: number;
  uploadsPercentageChange: number;
  prFree: number;
  prFreePercentageChange: number;
  prPaid: number;
  prPaidPercentageChange: number;
  viewsAvg: number;
  viewsAvgPercentageChange: number;
  gte10k: number;
  gte100k: number;
  gte1m: number;
}

// 차트에서 사용하는 변환된 타입들
export interface ChartData {
  date: string;
  uploads: number;
  averageViews: number;
}

export interface HourlyData {
  hour: string;
  hourlyUploads: number;
  hourlyViewsAvg: number;
}

export interface TierData {
  tier: string;
  uploads: number;
  averageViews: number;
}

// API 응답 타입들
export interface DailyChartResponse {
  day: string;
  dailyUploads: number;
  dailyViewsAvg: number;
}

export interface HourlyChartResponse {
  hour: string;
  hourlyUploads: number;
  hourlyViewsAvg: number;
}

export interface TierResponse {
  tier: string;
  uploads: number;
  viewsAvg: number;
}

export interface ExplodedContent {
  contentId: string;
  thumbnailUrl: string;
  url: string;
  caption: string;
  views: number;
  likes: number;
  createdAt: string;
}

export interface ExplodedContentResponse {
  content: ExplodedContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type TimeFilter = "ALL" | "1" | "7" | "30" | "365" | "72" | "48" | "24";
export type LanguageFilter = "ALL" | "en" | "es" | "ko";
export type TierFilter = "ALL" | "NANO" | "MICRO" | "MID" | "MEGA";
