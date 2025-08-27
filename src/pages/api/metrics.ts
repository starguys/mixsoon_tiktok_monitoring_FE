import type { NextApiRequest, NextApiResponse } from "next";

export interface DailyMetricsResponse {
  uploads: number;
  prFree: number;
  prPaid: number;
  viewsAvg: number;
  gte10k: number;
  gte100k: number;
  gte1m: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DailyMetricsResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { days, hours, tier, language } = req.query;

    // 시간 단위가 있으면 hourly API 사용
    const isHourly = hours && ["72", "48", "24"].includes(hours as string);
    const baseUrl = isHourly
      ? "https://www.mixsoon-tiktok-monitoring.site/api/metrics/hourly/total"
      : "https://www.mixsoon-tiktok-monitoring.site/api/metrics/daily/total";

    const searchParams = new URLSearchParams();
    if (isHourly && hours) {
      searchParams.append("hours", hours as string);
    } else if (days) {
      searchParams.append("days", days as string);
    }
    if (tier) searchParams.append("tier", tier as string);
    if (language) searchParams.append("language", language as string);

    const url = `${baseUrl}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API 에러:", error);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
}
