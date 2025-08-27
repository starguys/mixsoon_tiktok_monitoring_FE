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

export async function fetchHourlyData(
  params?: MetricsParams
): Promise<HourlyData[]> {
  const searchParams = new URLSearchParams();

  if (params?.hours) searchParams.append("hours", params.hours);
  if (params?.tier) searchParams.append("tier", params.tier);
  if (params?.language) searchParams.append("language", params.language);

  const url = `/api/metrics/hourly${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}

export async function fetchDailyChartData(
  params?: MetricsParams
): Promise<ChartData[]> {
  const searchParams = new URLSearchParams();

  if (params?.days) searchParams.append("days", params.days);
  if (params?.tier) searchParams.append("tier", params.tier);
  if (params?.language) searchParams.append("language", params.language);

  const url = `/api/metrics/daily${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}

export async function fetchDailyTierData(
  params?: MetricsParams
): Promise<TierData[]> {
  const searchParams = new URLSearchParams();

  if (params?.days) searchParams.append("days", params.days);
  if (params?.language) searchParams.append("language", params.language);

  const url = `/api/metrics/daily/tier${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}

export async function fetchHourlyTierData(
  params?: MetricsParams
): Promise<TierData[]> {
  const searchParams = new URLSearchParams();

  if (params?.hours) searchParams.append("hours", params.hours);
  if (params?.language) searchParams.append("language", params.language);

  const url = `/api/metrics/hourly/tier${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}

export async function fetchExplodedContents(
  page: number = 0,
  size: number = 9
): Promise<ExplodedContentResponse> {
  const url = `/api/contents?page=${page}&size=${size}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  return response.json();
}
