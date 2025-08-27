export interface DailyMetricsResponse {
  uploads: number;
  prFree: number;
  prPaid: number;
  viewsAvg: number;
  gte10k: number;
  gte100k: number;
  gte1m: number;
}

interface MetricsParams {
  days?: string;
  hours?: string;
  tier?: string;
  language?: string;
}

export async function fetchDailyMetrics(
  params?: MetricsParams
): Promise<DailyMetricsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.days) searchParams.append("days", params.days);
  if (params?.hours) searchParams.append("hours", params.hours);
  if (params?.tier) searchParams.append("tier", params.tier);
  if (params?.language) searchParams.append("language", params.language);

  const url = `/api/metrics${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}
